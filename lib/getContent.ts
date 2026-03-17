import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMeta {
  title:                string;
  slug:                 string;
  pillar:               string;
  date:                 string;
  readTime:             number;
  excerpt?:             string;
  // payoff: optional one-liner displayed on article cards (max 100 chars). Falls back to excerpt.
  payoff?:              string;
  image?:               string;
  // verdict: optional honest-review verdict badge. Only render on does-this-work pillar articles.
  verdict?:             'pass' | 'fail' | 'mixed';
  featured?:            boolean;
  officialAdviceBanner?: boolean;
  sources?:             { label: string; url: string; description: string }[];
}

export interface ArticleData extends ArticleMeta {
  content: string;
}

function readDir(dir: string): ArticleMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw      = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return data as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function readBySlug(dirs: string[], slug: string): ArticleData | null {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const f of files) {
      const raw             = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      if ((data as ArticleMeta).slug === slug) {
        return { ...(data as ArticleMeta), content };
      }
    }
  }
  return null;
}

/** Articles: reads content/articles/ (primary) + content/pages/ (legacy) */
export function getArticles(): ArticleMeta[] {
  const articles = readDir(path.join(process.cwd(), 'content/articles'));
  const legacy   = readDir(path.join(process.cwd(), 'content/pages'));
  return [...articles, ...legacy].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/** Guides: reads content/guides/ */
export function getGuides(): ArticleMeta[] {
  return readDir(path.join(process.cwd(), 'content/guides'));
}

export function getArticleBySlug(slug: string): ArticleData | null {
  return readBySlug(
    [
      path.join(process.cwd(), 'content/articles'),
      path.join(process.cwd(), 'content/pages'),
    ],
    slug,
  );
}

export function getGuideBySlug(slug: string): ArticleData | null {
  return readBySlug(
    [path.join(process.cwd(), 'content/guides')],
    slug,
  );
}

export function getArticleSlugs(): string[] {
  return getArticles().map(a => a.slug);
}

export function getGuideSlugs(): string[] {
  return getGuides().map(g => g.slug);
}
