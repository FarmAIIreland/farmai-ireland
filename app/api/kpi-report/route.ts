import { NextResponse } from 'next/server';
import { Resend }       from 'resend';
import fs               from 'fs';
import path             from 'path';
import { fetchKpis, saveKpiSnapshot } from '@/lib/kpi';
import { checkBrokenLinks }           from '@/lib/broken-links';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function fmt(n: number | null, suffix = ''): string {
  if (n === null) return '—';
  return `${n.toLocaleString('en-IE')}${suffix}`;
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('x-cron-secret') !== cronSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const [kpi, broken] = await Promise.all([
      fetchKpis(),
      checkBrokenLinks(),
    ]);

    const dateStr = new Date().toLocaleDateString('en-IE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const shortDate = new Date().toLocaleDateString('en-IE', {
      day: 'numeric', month: 'short',
    });

    const line = '─'.repeat(42);

    const brokenSection = broken.length > 0
      ? [
          ``,
          line,
          `Broken Links (${broken.length} found):`,
          ``,
          ...broken.map(b => `${b.file}\n  → ${b.url} [${b.status}]`),
        ].join('\n')
      : `\n${line}\nBroken Links: none found ✓`;

    // Count pending drafts
    let draftCount = 0;
    const draftsDir = path.join(process.cwd(), 'content/drafts');
    if (fs.existsSync(draftsDir)) {
      draftCount = fs.readdirSync(draftsDir).filter(f => f.endsWith('.md')).length;
    }

    // Count pending tweets
    let pendingTweets = 0;
    const tweetQueuePath = path.join(process.cwd(), 'docs/twitter-queue.md');
    if (fs.existsSync(tweetQueuePath)) {
      const queueContent = fs.readFileSync(tweetQueuePath, 'utf8');
      pendingTweets = (queueContent.match(/\*\*STATUS:\*\* PENDING/g) ?? []).length;
    }

    // Build actionable next steps
    const actions: string[] = [];
    if (draftCount > 0) {
      actions.push(`  -> ${draftCount} draft${draftCount !== 1 ? 's' : ''} waiting for review: https://farmai.ie/dashboard/drafts`);
    }
    if (pendingTweets > 0) {
      actions.push(`  -> ${pendingTweets} tweet${pendingTweets !== 1 ? 's' : ''} ready to post (docs/twitter-queue.md)`);
    }
    if (kpi.subscribers !== null && kpi.subscribers > 0 && kpi.articleCount > 0) {
      actions.push(`  -> Consider sending a newsletter this week if you haven't recently`);
    }
    if (actions.length === 0) {
      actions.push(`  -> All clear — no immediate actions needed`);
    }

    const emailBody = [
      `FarmAI Ireland — Weekly KPI Report`,
      dateStr,
      line,
      ``,
      `Monthly Visitors      ${fmt(kpi.visitors)}`,
      `Email Subscribers     ${fmt(kpi.subscribers)}`,
      `Newsletter Open Rate  ${fmt(kpi.openRate, '%')}`,
      `Articles Published    ${fmt(kpi.articleCount)}`,
      `Thumbs Up Rate        ${fmt(kpi.thumbsUpRate, '%')}`,
      `Active Sponsors       ${fmt(kpi.sponsors)}`,
      brokenSection,
      ``,
      line,
      `THIS WEEK:`,
      ...actions,
      ``,
      line,
      `Generated automatically every Monday at 8am.`,
      `Dashboard: https://farmai.ie/dashboard`,
      `FarmAI Ireland · hello@farmai.ie`,
    ].join('\n');

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ error: 'Resend not configured' }, { status: 500 });
    }

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from:    process.env.RESEND_FROM_EMAIL ?? 'KPI Report <reports@farmai.ie>',
      to:      'hello@farmai.ie',
      subject: `FarmAI Ireland — Weekly KPI Report (${shortDate})`,
      text:    emailBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }

    // Save snapshot for week-on-week tracking
    await saveKpiSnapshot(kpi);

    return NextResponse.json({ ok: true, kpi });
  } catch (err) {
    console.error('KPI report error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
