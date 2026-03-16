import { NextResponse }          from 'next/server';
import { Resend }                from 'resend';
import { runContentPipeline }   from '@/lib/content-pipeline';
import { checkBrokenLinks }     from '@/lib/broken-links';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET() {
  try {
    const [drafts, broken] = await Promise.all([
      runContentPipeline(),
      checkBrokenLinks(),
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
        ].filter(Boolean).join('\n')).join('\n\n')
      : 'No drafts generated — check Vercel function logs for errors.';

    const brokenSection = broken.length > 0
      ? [
          '',
          line,
          `Broken Links (${broken.length} found):`,
          '',
          ...broken.map(b => `${b.file}\n  → ${b.url} [${b.status}]`),
        ].join('\n')
      : `\n${line}\nBroken Links: none found ✓`;

    const emailBody = [
      `FarmAI Ireland — Sunday Content Pipeline`,
      dateStr,
      line,
      '',
      `${drafts.length} draft article${drafts.length !== 1 ? 's' : ''} generated:`,
      '',
      draftLines,
      brokenSection,
      '',
      line,
      'Review drafts on GitHub, edit if needed, then move to',
      'content/articles/ or content/guides/ to publish.',
    ].join('\n');

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from:    process.env.RESEND_FROM_EMAIL ?? 'FarmAI Pipeline <reports@farmaiireland.ie>',
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
    return NextResponse.json({ error: 'Pipeline failed', detail: String(err) }, { status: 500 });
  }
}
