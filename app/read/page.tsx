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
    <main className="py-12 sm:py-16 px-4 bg-ui-bg min-h-screen">
      <div className="max-w-site mx-auto">

        <div className="mb-8">
          <h1 className="text-[26px] font-semibold text-ui-text mb-1" style={{ letterSpacing: '-0.01em' }}>Articles</h1>
          <p className="text-ui-muted text-sm">Plain-English AI insight for Irish farmers</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/read"
            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
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
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                active === p.slug
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
              }`}
            >
              {PILLAR_LABELS[p.slug] ?? p.label}
            </Link>
          ))}
        </div>

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
    </main>
  );
}
