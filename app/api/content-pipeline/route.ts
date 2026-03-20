import { NextResponse }          from 'next/server';
import { Resend }                from 'resend';
import { runContentPipeline }   from '@/lib/content-pipeline';
import { checkBrokenLinks }     from '@/lib/broken-links';
import { scanTimelyTopics }     from '@/lib/news-scanner';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('x-cron-secret') !== cronSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const [drafts, broken, timely] = await Promise.all([
      runContentPipeline(),
      checkBrokenLinks(),
      scanTimelyTopics(),
    ]);

    const dateStr = new Date().toLocaleDateString('en-IE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });

    const line = '─'.repeat(42);

    const draftLines = drafts.length > 0
      ? drafts.map((d, i) => [
          `${i + 1}. ${d.title}`,
          d.excerpt ? `   "${d.excerpt}"` : '',
          d.githubUrl
            ? `   Review: ${d.githubUrl}`
            : '   (GitHub commit failed — check function logs)',
          d.tweet ? `   Tweet queued: ✓` : '   Tweet: not generated',
        ].filter(Boolean).join('\n')).join('\n\n')
      : 'No drafts generated — check Vercel function logs for errors.';

    const tweetCount = drafts.filter(d => d.tweet).length;
    const tweetSection = tweetCount > 0
      ? `\n${line}\nTweets: ${tweetCount} queued in docs/twitter-queue.md\nCopy-paste to X when ready.`
      : '';

    const brokenSection = broken.length > 0
      ? [
          '',
          line,
          `Broken Links (${broken.length} found):`,
          '',
          ...broken.map(b => `${b.file}\n  → ${b.url} [${b.status}]`),
        ].join('\n')
      : `\n${line}\nBroken Links: none found ✓`;

    const timelySection = timely.length > 0
      ? [
          '',
          line,
          `Timely Topics Found (${timely.length}):`,
          'These headlines from Irish ag news matched our keywords.',
          'Consider an article angle if any are relevant.',
          '',
          ...timely.slice(0, 5).map(t =>
            `  [${t.source}] ${t.headline}\n  Matched: ${t.matchedOn}\n  ${t.url}`
          ),
        ].join('\n')
      : `\n${line}\nTimely Topics: no keyword matches this week`;

    const emailBody = [
      `FarmAI Ireland — Sunday Content Pipeline`,
      dateStr,
      line,
      '',
      `${drafts.length} draft article${drafts.length !== 1 ? 's' : ''} generated:`,
      '',
      draftLines,
      brokenSection,
      tweetSection,
      timelySection,
      '',
      line,
      'NEXT STEPS:',
      `  1. Review & approve drafts: https://farmai.ie/dashboard/drafts`,
      `     (4-persona quality review runs automatically — just click Approve)`,
      `  2. Copy tweets from docs/twitter-queue.md to X (3x this week)`,
      timely.length > 0
        ? `  3. Consider a timely article from the headlines above`
        : '',
    ].filter(Boolean).join('\n');

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL ?? 'FarmAI Pipeline <reports@farmai.ie>',
        to:      'hello@farmai.ie',
        subject: `${drafts.length} new draft${drafts.length !== 1 ? 's' : ''} ready — FarmAI Content Pipeline`,
        text:    emailBody,
      });
    }

    return NextResponse.json({
      ok:            true,
      draftsGenerated: drafts.length,
      brokenLinks:   broken.length,
      drafts:        drafts.map(d => ({ title: d.title, githubUrl: d.githubUrl })),
    });
  } catch (err) {
    console.error('Content pipeline error:', err);
    return NextResponse.json({ error: 'Pipeline failed' }, { status: 500 });
  }
}
