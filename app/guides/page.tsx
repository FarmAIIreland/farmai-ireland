import { ArticleCard } from '@/components/ArticleCard';
import { getGuides }   from '@/lib/getContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Guides — FarmAI Ireland',
  description: 'Step-by-step guides to using AI tools on Irish farms.',
};

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <main className="py-12 sm:py-16 px-4 bg-ui-bg min-h-screen">
      <div className="max-w-site mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold text-ui-text mb-2">Guides</h1>
          <p className="text-ui-muted">Step-by-step practical guides for Irish farmers</p>
        </div>

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
                basePath="guides"
              />
            ))}
          </div>
        ) : (
          <p className="text-ui-muted">Guides coming soon.</p>
        )}
      </div>
    </main>
  );
}
