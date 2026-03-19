import { notFound }        from 'next/navigation';
import { MDXRemote }       from 'next-mdx-remote/rsc';
import { getGuideBySlug, getGuideSlugs } from '@/lib/getContent';
import { formatPillar }    from '@/lib/formatPillar';
import { getOgImageUrl }   from '@/lib/ogImage';
import { ArticleFeedback } from '@/components/ArticleFeedback';
import { PillarIllustration } from '@/components/PillarIllustration';
import siteConfig          from '@/config/site.json';
import type { Metadata }   from 'next';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getGuideSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return {};
  const url     = `${siteConfig.site.url}/guides/${guide.slug}`;
  const ogImage = getOgImageUrl({ title: guide.title, pillar: guide.pillar, readTime: guide.readTime });
  return {
    title:       guide.seo?.title ?? `${guide.title} | FarmAI Ireland`,
    description: guide.seo?.description ?? guide.excerpt ?? siteConfig.seo.defaultDescription,
    keywords:    guide.seo?.keywords,
    alternates:  { canonical: url },
    openGraph: {
      title:       guide.seo?.title ?? guide.title,
      description: guide.seo?.description ?? guide.excerpt,
      url,
      type:        'article',
      siteName:    siteConfig.site.name,
      locale:      'en_IE',
      images:      [{ url: ogImage, width: 1200, height: 630, alt: guide.title }],
      publishedTime: guide.date,
    },
    twitter: {
      card:        'summary_large_image',
      title:       guide.seo?.title ?? guide.title,
      description: guide.seo?.description ?? guide.excerpt,
      images:      [ogImage],
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const formattedDate = new Date(guide.date).toLocaleDateString('en-IE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const ogImage = getOgImageUrl({ title: guide.title, pillar: guide.pillar, readTime: guide.readTime });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.seo?.description ?? guide.excerpt,
    image: ogImage,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { '@type': 'Organization', name: 'FarmAI Ireland', url: siteConfig.site.url },
    publisher: {
      '@type': 'Organization',
      name: 'FarmAI Ireland',
      url: siteConfig.site.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.site.url}/images/farmai-og.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.site.url}/guides/${guide.slug}` },
    keywords: guide.seo?.keywords?.join(', '),
    inLanguage: 'en-IE',
  };

  return (
    <main className="py-12 md:py-20 px-4 bg-ui-bg min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero illustration — desktop only */}
      <div className="hidden md:block max-w-reading mx-auto mb-8 rounded-[12px] overflow-hidden">
        <PillarIllustration pillar={guide.pillar} title={guide.title} variant="hero" />
      </div>

      <article className="max-w-reading mx-auto">

        {/* Pillar + meta */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-green">
            {formatPillar(guide.pillar)}
          </span>
          <span className="text-ui-muted text-xs">·</span>
          <time className="text-ui-muted text-xs" dateTime={guide.date}>{formattedDate}</time>
          <span className="text-ui-muted text-xs">·</span>
          <span className="text-ui-muted text-xs">{guide.readTime} min read</span>
        </div>

        {/* Title */}
        <h1
          className="font-serif font-semibold text-ui-text mb-6"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          {guide.title}
        </h1>

        {/* Official advice banner */}
        {guide.officialAdviceBanner && (
          <div className="mb-8 p-4 bg-amber-50 border-l-4 border-brand-amber rounded-r-lg text-sm text-ui-text">
            <strong>Note:</strong> {siteConfig.content.officialAdviceBanner}
          </div>
        )}

        {/* Body — weight 400, Lora via prose */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green prose-a:no-underline hover:prose-a:underline">
          <MDXRemote source={guide.content} />
        </div>

        {/* Sources */}
        {guide.sources && guide.sources.length > 0 && (
          <div className="mt-12 pt-8 border-t border-ui-border">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ui-muted mb-4">Sources</h2>
            <ul className="space-y-3">
              {guide.sources.map(s => (
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
        <ArticleFeedback slug={guide.slug} page="guides" />

      </article>
    </main>
  );
}
