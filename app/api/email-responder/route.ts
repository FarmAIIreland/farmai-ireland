import { NextResponse }       from 'next/server';
import fs                    from 'fs';
import path                  from 'path';
import { Resend }            from 'resend';
import { getGoogleAccessToken } from '@/lib/google-auth';
import {
  getLabelId,
  listUnreadMessageIds,
  getMessage,
  createDraft,
  markAsRead,
} from '@/lib/gmail';

export const maxDuration = 60;

// ─── Config parsers (read fresh from /docs on every run) ─────────────────────

function parseLabels(): string[] {
  const p   = path.join(process.cwd(), 'docs/gmail-config.md');
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, 'utf8');
  const m   = raw.match(/## Monitored Labels\n([\s\S]+?)(?=\n---|\n##)/);
  if (!m) return [];
  return m[1].split('\n')
    .filter(l => l.startsWith('- '))
    .map(l => l.slice(2).trim())
    .filter(Boolean);
}

function parseTemplates(): Record<string, { subject: string; body: string }> {
  const p   = path.join(process.cwd(), 'docs/email-templates.md');
  if (!fs.existsSync(p)) return {};
  const raw = fs.readFileSync(p, 'utf8');
  const out: Record<string, { subject: string; body: string }> = {};

  for (const section of raw.split(/\n## /).slice(1)) {
    const lines    = section.split('\n');
    const name     = lines[0].trim();
    const rest     = lines.slice(1).join('\n').trim();
    const subjMatch = rest.match(/\*\*Subject:\*\*\s*(.+)/);
    const subject  = subjMatch?.[1]?.trim() ?? 'Re: {{originalSubject}}';
    const body     = rest
      .replace(/\*\*Subject:\*\*\s*.+\n?/, '')
      .split(/\n---\n/)[0]
      .trim();
    out[name] = { subject, body };
  }
  return out;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractFirstName(from: string): string {
  const name = from.split('<')[0].trim().replace(/"/g, '');
  return name.split(' ')[0] || 'there';
}

function applyVars(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (t, [k, v]) => t.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v),
    template,
  );
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function GET() {
  const token = await getGoogleAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: 'Google auth failed — check GMAIL_* env vars' },
      { status: 500 },
    );
  }

  const labels    = parseLabels();
  const templates = parseTemplates();
  const FROM      = 'FarmAI Ireland <hello@farmai.ie>';
  const TODAY     = new Date().toLocaleDateString('en-IE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  let   totalDrafts = 0;
  const summary:    string[] = [];

  for (const labelName of labels) {
    const labelId = await getLabelId(token, labelName);
    if (!labelId) {
      console.log(`Label not found: ${labelName} — run /api/gmail-setup first`);
      continue;
    }

    const msgIds = await listUnreadMessageIds(token, labelId, 10);
    if (msgIds.length === 0) continue;

    const tmpl = templates[labelName];
    if (!tmpl) {
      console.log(`No template found for label: ${labelName}`);
      continue;
    }

    let labelDrafts = 0;
    for (const msgId of msgIds) {
      const msg = await getMessage(token, msgId);
      if (!msg) continue;

      const toEmail = msg.from.match(/<([^>]+)>/)?.[1] ?? msg.from;
      const vars    = {
        firstName:       extractFirstName(msg.from),
        originalSubject: msg.subject || '(no subject)',
        senderEmail:     toEmail,
        todayDate:       TODAY,
      };

      const ok = await createDraft(
        token,
        toEmail,
        FROM,
        applyVars(tmpl.subject, vars),
        applyVars(tmpl.body,    vars),
        msg.threadId,
        msg.messageId,
      );

      if (ok) {
        await markAsRead(token, msgId);
        labelDrafts++;
        totalDrafts++;
      }
    }

    if (labelDrafts > 0) {
      summary.push(`${labelName}: ${labelDrafts} draft${labelDrafts !== 1 ? 's' : ''}`);
    }
  }

  // Notification email
  if (totalDrafts > 0) {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL ?? 'FarmAI <reports@farmaiireland.ie>',
        to:      'hello@farmai.ie',
        subject: `${totalDrafts} draft response${totalDrafts !== 1 ? 's' : ''} ready in Gmail`,
        text: [
          `FarmAI Ireland — Email Draft Summary`,
          new Date().toLocaleDateString('en-IE', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          }),
          '─'.repeat(42),
          '',
          `${totalDrafts} draft response${totalDrafts !== 1 ? 's' : ''} created in Gmail — ready for your review.`,
          '',
          summary.join('\n'),
          '',
          'Open Gmail Drafts to review, personalise if needed, and send.',
        ].join('\n'),
      });
    }
  }

  return NextResponse.json({ ok: true, totalDrafts, summary });
}
