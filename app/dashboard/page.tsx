import Link from 'next/link';
import { fetchKpis, fetchPreviousSnapshot } from '@/lib/kpi';

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
  if (diff === 0) return { text: '→ no change', cls: 'text-ui-muted' };
  if (diff > 0)   return { text: `↑ ${diff.toLocaleString('en-IE')}`,         cls: 'text-brand-green' };
                  return { text: `↓ ${Math.abs(diff).toLocaleString('en-IE')}`, cls: 'text-red-500' };
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  wow,
}: {
  label: string;
  value: string;
  wow:   { text: string; cls: string };
}) {
  return (
    <div className="bg-white rounded-[12px] border border-ui-border p-6 flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-ui-muted">{label}</p>
      <p className="text-5xl font-bold text-ui-text leading-none">{value}</p>
      <p className={`text-sm font-medium ${wow.cls}`}>{wow.text} vs last week</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const [kpi, prev] = await Promise.all([
    fetchKpis(),
    fetchPreviousSnapshot(),
  ]);

  const cards: { label: string; value: string; current: number | null; previous: number | null }[] = [
    {
      label:    'Monthly Visitors',
      value:    fmt(kpi.visitors),
      current:  kpi.visitors,
      previous: prev?.visitors ?? null,
    },
    {
      label:    'Email Subscribers',
      value:    fmt(kpi.subscribers),
      current:  kpi.subscribers,
      previous: prev?.subscribers ?? null,
    },
    {
      label:    'Newsletter Open Rate',
      value:    fmt(kpi.openRate, '%'),
      current:  kpi.openRate,
      previous: prev?.openRate ?? null,
    },
    {
      label:    'Articles Published',
      value:    fmt(kpi.articleCount),
      current:  kpi.articleCount,
      previous: prev?.articleCount ?? null,
    },
    {
      label:    'Thumbs Up Rate',
      value:    fmt(kpi.thumbsUpRate, '%'),
      current:  kpi.thumbsUpRate,
      previous: prev?.thumbsUpRate ?? null,
    },
    {
      label:    'Active Sponsors',
      value:    fmt(kpi.sponsors),
      current:  kpi.sponsors,
      previous: prev?.sponsors ?? null,
    },
  ];

  const fetchedAt = new Date(kpi.fetchedAt).toLocaleString('en-IE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-ui-bg px-4 py-12">
      <div className="max-w-site mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ui-text mb-1">KPI Dashboard</h1>
            <p className="text-sm text-ui-muted">FarmAI Ireland · {fetchedAt}</p>
          </div>
          <Link
            href="/api/dashboard-logout"
            className="shrink-0 text-sm text-ui-muted hover:text-ui-text border border-ui-border px-4 py-2 rounded-button transition-colors"
          >
            Sign out
          </Link>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(c => (
            <KpiCard
              key={c.label}
              label={c.label}
              value={c.value}
              wow={wowDelta(c.current, c.previous)}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-ui-muted">
          Data refreshes on every page load. Automated email every Monday at 8am via{' '}
          <code className="bg-white border border-ui-border rounded px-1 py-0.5">/api/kpi-report</code>.
          Week-on-week deltas appear after the second Monday report.
        </p>

      </div>
    </div>
  );
}
