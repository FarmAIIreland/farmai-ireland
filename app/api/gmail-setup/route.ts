/**
 * One-time setup route — run once to create Gmail labels and filters.
 * Call GET /api/gmail-setup after setting GMAIL_* env vars in Vercel.
 * Safe to call again — will not duplicate labels (ensureLabel is idempotent).
 */
import { NextResponse }       from 'next/server';
import fs                    from 'fs';
import path                  from 'path';

export const dynamic = 'force-dynamic';
import { getGoogleAccessToken } from '@/lib/google-auth';
import { ensureLabel, createFilter } from '@/lib/gmail';

function parseConfig(): {
  labels:   string[];
  keywords: Record<string, string[]>;
} {
  const p   = path.join(process.cwd(), 'docs/gmail-config.md');
  if (!fs.existsSync(p)) return { labels: [], keywords: {} };
  const raw = fs.readFileSync(p, 'utf8');

  // Labels
  const lm     = raw.match(/## Monitored Labels\n([\s\S]+?)(?=\n---|\n##)/);
  const labels = lm
    ? lm[1].split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim()).filter(Boolean)
    : [];

  // Keywords
  const keywords: Record<string, string[]> = {};
  const km = raw.match(/## Filter Keywords([\s\S]+?)(?=\n---\n## |\n---$|$)/);
  if (km) {
    for (const part of km[1].split(/\n### /).slice(1)) {
      const lines = part.split('\n');
      const label = lines[0].trim();
      const kw    = lines[1]?.trim();
      if (kw && !kw.startsWith('(')) {
        keywords[label] = kw.split(',').map(k => k.trim()).filter(Boolean);
      }
    }
  }

  return { labels, keywords };
}

export async function GET() {
  const token = await getGoogleAccessToken();
  if (!token) {
    return NextResponse.json(
      { error: 'Google auth failed — check GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN' },
      { status: 500 },
    );
  }

  const { labels, keywords } = parseConfig();
  const labelIds: Record<string, string> = {};
  const results:  string[] = [];

  // Ensure all labels exist
  for (const label of labels) {
    const id = await ensureLabel(token, label);
    if (id) {
      labelIds[label] = id;
      results.push(`✓ Label: "${label}" (${id})`);
    } else {
      results.push(`✗ Failed to create label: "${label}"`);
    }
  }

  // Create filters (skip Reader — it's the catch-all, has no keywords)
  for (const [label, kws] of Object.entries(keywords)) {
    if (label.toLowerCase() === 'reader' || kws.length === 0) continue;
    const labelId = labelIds[label];
    if (!labelId) continue;

    const query = kws.map(k => (k.includes(' ') ? `"${k}"` : k)).join(' OR ');
    const ok    = await createFilter(token, query, [labelId]);
    results.push(
      ok
        ? `✓ Filter: "${label}" — ${kws.length} keyword${kws.length !== 1 ? 's' : ''}`
        : `✗ Failed to create filter: "${label}"`,
    );
  }

  return NextResponse.json({ ok: true, results });
}
