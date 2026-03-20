import { HeroSection }    from '@/components/HeroSection';
import { NewsletterStrip } from '@/components/NewsletterStrip';
import { ArticleCard }     from '@/components/ArticleCard';
import { TopicPillars }    from '@/components/TopicPillars';
import { FAQStrip }        from '@/components/FAQStrip';
import { getFeaturedMix }  from '@/lib/getContent';
import siteConfig          from '@/config/site.json';
import Link                from 'next/link';
import type { Metadata }   from 'next';

export const metadata: Metadata = {
  title:       siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    title:       siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url:         siteConfig.site.url,
    images:      [{ url: `${siteConfig.site.url}/api/og?title=${encodeURIComponent(siteConfig.seo.defaultTitle)}&pillar=tools-explained&readTime=`, width: 1200, height: 630, type: 'image/png' }],
  },
};

export default function HomePage() {
  const articles = getFeaturedMix(siteConfig.content.featuredArticlesOnHome);

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Latest articles — content first */}
      <section className="py-12 sm:py-16 px-4 bg-ui-bg">
        <div className="max-w-site mx-auto">
          <div className="mb-8 sm:mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ui-text mb-1">Latest articles</h2>
              <p className="text-ui-muted text-sm sm:text-base">What&apos;s working on farms right now</p>
            </div>
            <Link
              href="/read"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
                />
              ))}
            </div>
          ) : (
            <p className="text-ui-muted text-sm">Articles coming soon.</p>
          )}

          {/* Mobile "View all" link */}
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/read"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Browse by topic */}
      <TopicPillars />

      {/* 4. Newsletter strip */}
      <NewsletterStrip />

      {/* 5. FAQ */}
      <FAQStrip />
    </>
  );
}
