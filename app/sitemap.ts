import { MetadataRoute } from 'next';
import { getArticleSlugs, getGuideSlugs } from '@/lib/getContent';
import siteConfig from '@/config/site.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,           lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/read`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/tools`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/sources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getArticleSlugs().map(slug => ({
    url:             `${base}/read/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getGuideSlugs().map(slug => ({
    url:             `${base}/guides/${slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...guideRoutes];
}
