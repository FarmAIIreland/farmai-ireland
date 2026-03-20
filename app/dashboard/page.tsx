import Link from 'next/link';
import { fetchKpis, fetchPreviousSnapshot, fetchGmailUnread } from '@/lib/kpi';
import IdeaForm from './IdeaForm';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number | null, suffix = ''): string {
  if (n === null) return '—';
  return `${n.toLocaleString('en-IE')}${suffix}`;
}

function wowDelta(
  current:  number | null,
  previous: number | null,
): { text: string; cls: string } {
  if (current === null || previous === null) {
    return { text: 'No prior data', cls: 'text-ui-muted' };
  }
  const diff = current - previous;
  if (diff === 0) return { text: '→ no change',                               cls: 'text-ui-muted'   };
  if (diff > 0)   return { text: `↑ ${diff.toLocaleString('en-IE')}`,         cls: 'text-brand-green' };
                  return { text: `↓ ${Math.abs(diff).toLocaleString('en-IE')}`, cls: 'text-red-500'  };
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  wow,
  accent = false,
}: {
  label:   string;
  value:   string;
  wow:     { text: string; cls: string };
  accent?: boolean;
}) {
  return (
    <div className={`rounded-[12px] border p-6 flex flex-col gap-2 ${accent ? 'bg-[#e8f5ef] border-brand-green/30' : 'bg-white border-ui-border'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ui-muted">{label}</p>
      <p className="text-5xl font-bold text-ui-text leading-none">{value}</p>
      <p className={`text-sm font-medium ${wow.cls}`}>{wow.text} vs last week</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const [kpi, prev, gmail] = await Promise.all([
    fetchKpis(),
    fetchPreviousSnapshot(),
    fetchGmailUnread(),
  ]);

  const fetchedAt = new Date(kpi.fetchedAt).toLocaleString('en-IE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const kpiCards = [
    { label: 'Monthly Visitors',      value: fmt(kpi.visitors),    current: kpi.visitors,    previous: prev?.visitors    ?? null },
    { label: 'Newsletter Open Rate',  value: fmt(kpi.openRate, '%'), current: kpi.openRate,  previous: prev?.openRate    ?? null },
    { label: 'Articles Published',    value: fmt(kpi.articleCount),  current: kpi.articleCount, previous: prev?.articleCount ?? null },
    { label: 'Thumbs Up Rate',        value: fmt(kpi.thumbsUpRate, '%'), current: kpi.thumbsUpRate, previous: prev?.thumbsUpRate ?? null },
    { label: 'Active Sponsors',       value: fmt(kpi.sponsors),     current: kpi.sponsors,    previous: prev?.sponsors    ?? null },
  ];

  const inboxCards = [
    { label: 'Sponsorship Unread',    value: fmt(gmail.sponsorship), current: gmail.sponsorship, previous: null },
    { label: 'Media Unread',          value: fmt(gmail.media),       current: gmail.media,       previous: null },
  ];

  return (
    <div className="min-h-screen bg-ui-bg">

      {/* Header with farmland background */}
      <div
        className="relative px-4 py-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #062A1E 0%, #0B4D3B 40%, #0A3D2E 70%, #041F16 100%)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-site mx-auto">

          {/* Nav */}
          <div className="flex items-start justify-between mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">FarmAI Ireland</p>
            <Link
              href="/api/dashboard-logout"
              className="text-sm text-white/70 hover:text-white border border-white/30 px-4 py-1.5 rounded-button transition-colors"
            >
              Sign out
            </Link>
          </div>

          {/* Hero subscriber number */}
          <div className="mb-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-1">
              Email Subscribers
            </p>
            <p className="text-7xl sm:text-8xl font-bold text-white leading-none">
              {fmt(kpi.subscribers)}
            </p>
            <p className={`text-sm font-medium mt-2 ${wowDelta(kpi.subscribers, prev?.subscribers ?? null).cls.replace('text-brand-green', 'text-emerald-400')}`}>
              {wowDelta(kpi.subscribers, prev?.subscribers ?? null).text} vs last week
            </p>
          </div>

          <p className="text-xs text-white/50 mt-6">{fetchedAt}</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="px-4 py-10 max-w-site mx-auto space-y-8">

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-4">Site Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpiCards.map(c => (
              <KpiCard
                key={c.label}
                label={c.label}
                value={c.value}
                wow={wowDelta(c.current, c.previous)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-4">Inbox Monitor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inboxCards.map(c => (
              <KpiCard
                key={c.label}
                label={c.label}
                value={c.value}
                wow={wowDelta(c.current, c.previous)}
                accent={typeof c.current === 'number' && c.current > 0}
              />
            ))}
          </div>
          {(gmail.sponsorship === null && gmail.media === null) && (
            <p className="text-xs text-ui-muted mt-3">
              Gmail not connected — set GMAIL_* env vars and run{' '}
              <code className="bg-white border border-ui-border rounded px-1">/api/gmail-setup</code> once.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/dashboard/drafts"
              className="rounded-[12px] border border-ui-border bg-white p-6 hover:border-brand-green/50 hover:bg-emerald-50/30 transition-colors group"
            >
              <p className="text-sm font-bold text-ui-text group-hover:text-brand-green">Review & Publish Drafts</p>
              <p className="text-xs text-ui-muted mt-1">
                Run automated quality reviews, approve or reject pipeline-generated articles.
              </p>
            </Link>
            <div className="rounded-[12px] border border-ui-border bg-white p-6">
              <p className="text-sm font-bold text-ui-text mb-3">Submit a Topic Idea</p>
              <IdeaForm />
            </div>
            <a
              href="https://github.com/FarmAIIreland/farmai-ireland/blob/master/docs/twitter-queue.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[12px] border border-ui-border bg-white p-6 hover:border-brand-green/50 hover:bg-emerald-50/30 transition-colors group"
            >
              <p className="text-sm font-bold text-ui-text group-hover:text-brand-green">Tweet Queue</p>
              <p className="text-xs text-ui-muted mt-1">
                View and copy pending tweets for X. Pipeline generates 3 per week.
              </p>
            </a>
            <Link
              href="/dashboard/videos"
              className="rounded-[12px] border border-ui-border bg-white p-6 hover:border-brand-green/50 hover:bg-emerald-50/30 transition-colors group"
            >
              <p className="text-sm font-bold text-ui-text group-hover:text-brand-green">Video Queue</p>
              <p className="text-xs text-ui-muted mt-1">
                Review and approve short-form video content before publishing to YouTube and socials.
              </p>
              <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                Coming soon
              </span>
            </Link>
          </div>
        </div>

        <p className="text-xs text-ui-muted pb-4">
          Data refreshes on every page load. Monday 8am email via{' '}
          <code className="bg-white border border-ui-border rounded px-1">/api/kpi-report</code>.{' '}
          Sunday 8pm content pipeline via{' '}
          <code className="bg-white border border-ui-border rounded px-1">/api/content-pipeline</code>.{' '}
          WoW deltas appear after second Monday report.
        </p>

      </div>
    </div>
  );
}
