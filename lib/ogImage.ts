import siteConfig from '@/config/site.json';

/**
 * Build the URL for an auto-generated OG image.
 * Falls back to the article's custom image if provided,
 * otherwise generates a branded card via /api/og.
 */
export function getOgImageUrl(opts: {
  title:     string;
  pillar:    string;
  readTime:  number;
  image?:    string;
}): string {
  // If article has a unique (non-Unsplash-default) image, keep it
  // For now, always prefer the generated branded card for consistency
  const params = new URLSearchParams({
    title:    opts.title,
    pillar:   opts.pillar,
    readTime: String(opts.readTime),
  });
  return `${siteConfig.site.url}/api/og?${params.toString()}`;
}
