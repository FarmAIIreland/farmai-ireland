import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/getContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Articles — FarmAI Ireland',
  description: 'Plain-English AI guides and news for Irish farmers.',
};

export default function ReadPage() {
  const articles = getArticles();

  return (
    <main className="py-12 sm:py-16 px-4 bg-ui-bg min-h-screen">
      <div className="max-w-site mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-ui-text mb-2">Articles</h1>
          <p className="text-ui-muted">Plain-English AI insight for Irish farmers</p>
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
                basePath="read"
              />
            ))}
          </div>
        ) : (
          <p className="text-ui-muted">Articles coming soon.</p>
        )}
      </div>
    </main>
  );
}
