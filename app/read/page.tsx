import { ArticleCard } from '@/components/ArticleCard';
import { getArticles }  from '@/lib/getContent';
import siteConfig        from '@/config/site.json';
import Link              from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Articles — FarmAI Ireland',
  description: 'Plain-English AI guides and news for Irish farmers.',
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

export default function ReadPage({ searchParams }: Props) {
  const all      = getArticles();
  const active   = searchParams.pillar ?? '';
  const articles = active ? all.filter(a => a.pillar === active) : all;

  const pillars = siteConfig.content.pillars;

  return (
    <main className="bg-ui-bg min-h-screen">

      {/* Page header */}
      <section className="bg-white border-b border-ui-border py-10 sm:py-12 px-4">
        <div className="max-w-site mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-3">Articles</p>
          <h1
            className="font-serif font-semibold text-ui-text mb-3"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            AI insight written for Irish farms
          </h1>

          {/* Pillar pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="/read"
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                !active
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
              }`}
            >
              All
            </Link>
            {pillars.map(p => (
              <Link
                key={p.slug}
                href={`/read?pillar=${p.slug}`}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                  active === p.slug
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {PILLAR_LABELS[p.slug] ?? p.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-site mx-auto">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  slug={article.slug}
                  pillar={article.pillar}
                  date={article.date}
                  readTime={article.readTime}
                  excerpt={article.excerpt}
                  payoff={article.payoff}
                  verdict={article.verdict}
                  basePath="read"
                />
              ))}
            </div>
          ) : (
            <p className="text-ui-muted">No articles found.</p>
          )}
        </div>
      </section>
    </main>
  );
}
