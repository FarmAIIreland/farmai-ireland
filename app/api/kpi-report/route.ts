import { NextResponse } from 'next/server';
import { Resend }       from 'resend';
import { fetchKpis, saveKpiSnapshot } from '@/lib/kpi';

function fmt(n: number | null, suffix = ''): string {
  if (n === null) return '—';
  return `${n.toLocaleString('en-IE')}${suffix}`;
}

export async function GET() {
  try {
    const kpi = await fetchKpis();

    const dateStr = new Date().toLocaleDateString('en-IE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
    const shortDate = new Date().toLocaleDateString('en-IE', {
      day: 'numeric', month: 'short',
    });

    const line = '─'.repeat(42);
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
      ``,
      line,
      `Generated automatically every Monday at 8am.`,
      `FarmAI Ireland · hello@farmai.ie`,
    ].join('\n');

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY not set');
      return NextResponse.json({ error: 'Resend not configured' }, { status: 500 });
    }

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from:    process.env.RESEND_FROM_EMAIL ?? 'KPI Report <reports@farmaiireland.ie>',
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
