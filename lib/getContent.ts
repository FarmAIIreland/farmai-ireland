import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMeta {
  title:    string;
  slug:     string;
  pillar:   string;
  date:     string;
  readTime: number;
  excerpt?: string;
  featured?: boolean;
  officialAdviceBanner?: boolean;
  sources?: { label: string; url: string; description: string }[];
}

function readDir(dir: string): ArticleMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw  = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return data as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticles(): ArticleMeta[] {
  return readDir(path.join(process.cwd(), 'content/pages'));
}

export function getGuides(): ArticleMeta[] {
  return readDir(path.join(process.cwd(), 'content/guides'));
}
