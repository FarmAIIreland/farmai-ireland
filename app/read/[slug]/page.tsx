import { notFound }        from 'next/navigation';
import { MDXRemote }       from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticleSlugs } from '@/lib/getContent';
import { formatPillar }    from '@/lib/formatPillar';
import { getOgImageUrl }   from '@/lib/ogImage';
import { ArticleFeedback } from '@/components/ArticleFeedback';
import { PillarIllustration } from '@/components/PillarIllustration';
import siteConfig          from '@/config/site.json';
import type { Metadata }   from 'next';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getArticleSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const url     = `${siteConfig.site.url}/read/${article.slug}`;
  const ogImage = getOgImageUrl({ title: article.title, pillar: article.pillar, readTime: article.readTime });
  return {
    title:       article.seo?.title ?? `${article.title} | FarmAI Ireland`,
    description: article.seo?.description ?? article.excerpt ?? siteConfig.seo.defaultDescription,
    keywords:    article.seo?.keywords,
    alternates:  { canonical: url },
    openGraph: {
      title:       article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      url,
      type:        'article',
      siteName:    siteConfig.site.name,
      locale:      'en_IE',
      images:      [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.date,
    },
    twitter: {
      card:        'summary_large_image',
      title:       article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      images:      [ogImage],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString('en-IE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const ogImage = getOgImageUrl({ title: article.title, pillar: article.pillar, readTime: article.readTime });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.seo?.description ?? article.excerpt,
    image: ogImage,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'FarmAI Ireland', url: siteConfig.site.url },
    publisher: {
      '@type': 'Organization',
      name: 'FarmAI Ireland',
      url: siteConfig.site.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.site.url}/images/farmai-og.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.site.url}/read/${article.slug}` },
    keywords: article.seo?.keywords?.join(', '),
    inLanguage: 'en-IE',
  };

  return (
    <main className="py-12 md:py-20 px-4 bg-ui-bg min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero illustration — desktop only */}
      <div className="hidden md:block max-w-reading mx-auto mb-8 rounded-[12px] overflow-hidden">
        <PillarIllustration pillar={article.pillar} title={article.title} variant="hero" />
      </div>

      <article className="max-w-reading mx-auto">

        {/* Pillar + meta */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">
            {formatPillar(article.pillar)}
          </span>
          <span className="text-ui-muted text-xs">·</span>
          <time className="text-ui-muted text-xs" dateTime={article.date}>{formattedDate}</time>
          <span className="text-ui-muted text-xs">·</span>
          <span className="text-ui-muted text-xs">{article.readTime} min read</span>
        </div>

        {/* Title */}
        <h1
          className="font-serif font-semibold text-ui-text mb-6"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {article.title}
        </h1>

        {/* Official advice banner */}
        {article.officialAdviceBanner && (
          <div className="mb-8 p-4 bg-amber-50 border-l-4 border-brand-amber rounded-r-lg text-sm text-ui-text">
            <strong>Note:</strong> {siteConfig.content.officialAdviceBanner}
          </div>
        )}

        {/* Body — weight 400, Lora via prose */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={article.content} />
        </div>

        {/* Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-ui-border">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ui-muted mb-4">Sources</h2>
            <ul className="space-y-3">
              {article.sources.map(s => (
                <li key={s.url} className="text-sm">
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                     className="font-semibold text-brand-green hover:underline">
                    {s.label}
                  </a>
                  {s.description && (
                    <span className="text-ui-muted"> — {s.description}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Feedback */}
        <ArticleFeedback slug={article.slug} page="read" />

      </article>
    </main>
  );
}
