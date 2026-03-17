import { ArticleCard } from '@/components/ArticleCard';
import { getGuides }   from '@/lib/getContent';
import siteConfig       from '@/config/site.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Guides — FarmAI Ireland',
  description: 'Step-by-step guides to using AI tools on Irish farms.',
};

export default function GuidesPage() {
  const guides = getGuides();

  const pillarImages = (siteConfig.content as Record<string, unknown>).pillarImages as Record<string, string> | undefined;
  const usedPillarImages = new Set<string>();

  function resolveImage(pillar: string, articleImage?: string): string | undefined {
    if (articleImage) return articleImage;
    if (!pillarImages) return undefined;
    const fallback = pillarImages[pillar];
    if (!fallback) return undefined;
    if (usedPillarImages.has(fallback)) return undefined;
    usedPillarImages.add(fallback);
    return fallback;
  }

  return (
    <main className="py-12 sm:py-16 px-4 bg-ui-bg min-h-screen">
      <div className="max-w-site mx-auto">
        <div className="mb-10">
          <h1 className="text-[26px] font-semibold text-ui-text mb-1" style={{ letterSpacing: '-0.01em' }}>Guides</h1>
          <p className="text-ui-muted text-sm">Step-by-step practical guides for Irish farmers</p>
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
                payoff={guide.payoff}
                verdict={guide.verdict}
                image={resolveImage(guide.pillar, guide.image)}
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
