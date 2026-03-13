import { HeroSection }    from '@/components/HeroSection';
import { NewsletterStrip } from '@/components/NewsletterStrip';
import { ArticleCard }     from '@/components/ArticleCard';
import { TopicPillars }    from '@/components/TopicPillars';
import { FAQStrip }        from '@/components/FAQStrip';
import { getArticles }     from '@/lib/getContent';
import siteConfig          from '@/config/site.json';
import type { Metadata }   from 'next';

export const metadata: Metadata = {
  title:       siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    title:       siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url:         siteConfig.site.url,
    images:      [{ url: siteConfig.seo.ogImage }],
  },
};

export default function HomePage() {
  const articles = getArticles().slice(0, siteConfig.content.featuredArticlesOnHome);

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Newsletter strip */}
      <NewsletterStrip />

      {/* 3. Latest articles */}
      <section className="py-12 sm:py-16 px-4 bg-ui-bg">
        <div className="max-w-site mx-auto">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ui-text mb-2">Latest articles</h2>
            <p className="text-ui-muted text-sm sm:text-base">What&apos;s working on farms right now</p>
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
                />
              ))}
            </div>
          ) : (
            <p className="text-ui-muted text-sm">Articles coming soon.</p>
          )}
        </div>
      </section>

      {/* 4. Browse by topic */}
      <TopicPillars />

      {/* 5. FAQ */}
      <FAQStrip />
    </>
  );
}
