import { ArticleCard } from '@/components/ArticleCard';
import { getGuides }   from '@/lib/getContent';
import Link            from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Guides — FarmAI Ireland',
  description: 'Step-by-step guides to using AI tools on Irish farms.',
};

const PILLAR_LABELS: Record<string, string> = {
  'save-time':       'Time Savers',
  'tools-explained': 'Tools Explained',
  'whats-changing':  "What's Changing",
  'does-this-work':  'Honest Reviews',
};

interface Props {
  searchParams: { pillar?: string };
}

export default function GuidesPage({ searchParams }: Props) {
  const all    = getGuides();
  const active = searchParams.pillar ?? '';
  const guides = active ? all.filter(g => g.pillar === active) : all;

  // Only show pills for pillars that actually have guides
  const activePillars = Array.from(new Set(all.map(g => g.pillar)));

  return (
    <main className="bg-ui-bg min-h-screen">

      {/* Page header */}
      <section className="bg-white border-b border-ui-border py-10 sm:py-12 px-4">
        <div className="max-w-site mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-3">Guides</p>
          <h1
            className="font-serif font-semibold text-ui-text mb-3"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Step-by-step. No jargon. Start here.
          </h1>

          {/* Pillar pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="/guides"
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                !active
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
              }`}
            >
              All
            </Link>
            {activePillars.map(slug => (
              <Link
                key={slug}
                href={`/guides?pillar=${slug}`}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                  active === slug
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {PILLAR_LABELS[slug] ?? slug}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide grid */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-site mx-auto">
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map(guide => (
                <ArticleCard
                  key={guide.slug}
                  title={guide.title}
                  slug={guide.slug}
                  pillar={guide.pillar}
                  date={guide.date}
                  readTime={guide.readTime}
                  excerpt={guide.excerpt}
                  payoff={guide.payoff}
                  verdict={guide.verdict}
                  basePath="guides"
                />
              ))}
            </div>
          ) : (
            <p className="text-ui-muted">No guides found for this category.</p>
          )}
        </div>
      </section>
    </main>
  );
}
