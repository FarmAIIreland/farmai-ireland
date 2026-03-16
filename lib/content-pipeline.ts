import fs   from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { getGoogleAccessToken } from './google-auth';
import { readSheetValues, clearSheetValues } from './google-sheets';
import { commitFileToGitHub } from './github';

// ─── Parse backlog from docs/content-strategy.md ─────────────────────────────

export function parseBacklogTopics(): string[] {
  const filePath = path.join(process.cwd(), 'docs/content-strategy.md');
  if (!fs.existsSync(filePath)) return [];

  const raw          = fs.readFileSync(filePath, 'utf8');
  const backlogStart = raw.indexOf('## 5. The 50-Topic Backlog');
  if (backlogStart === -1) return [];

  const nextSection    = raw.indexOf('\n## ', backlogStart + 1);
  const backlogSection = nextSection > -1
    ? raw.slice(backlogStart, nextSection)
    : raw.slice(backlogStart);

  return backlogSection
    .split('\n')
    .filter(line => line.startsWith('- '))
    .map(line => line.slice(2).trim())
    .filter(Boolean);
}

// Get titles already published to avoid duplicates
export function getPublishedTitles(): string[] {
  const dirs   = ['content/articles', 'content/guides'];
  const titles: string[] = [];

  for (const dir of dirs) {
    const full = path.join(process.cwd(), dir);
    if (!fs.existsSync(full)) continue;
    for (const file of fs.readdirSync(full).filter(f => f.endsWith('.md'))) {
      const raw   = fs.readFileSync(path.join(full, file), 'utf8');
      const match = raw.match(/^title:\s*"([^"]+)"/m);
      if (match) titles.push(match[1].toLowerCase());
    }
  }
  return titles;
}

// ─── Unsplash ─────────────────────────────────────────────────────────────────

const FALLBACK_IMAGES: Record<string, string> = {
  cattle:    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  grass:     'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  tillage:   'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80',
  tech:      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=80',
  general:   'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
  landscape: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80',
};

function fallbackForTopic(topic: string): string {
  const q = topic.toLowerCase();
  if (/cattle|cow|calv|herd|livestock|sheep|lamb/.test(q))   return FALLBACK_IMAGES.cattle;
  if (/grass|pasture|graz|silage/.test(q))                   return FALLBACK_IMAGES.grass;
  if (/tillage|crop|grain|harvest|tractor|drone/.test(q))    return FALLBACK_IMAGES.tillage;
  if (/app|phone|software|ai|chatgpt|digital|sensor/.test(q)) return FALLBACK_IMAGES.tech;
  return FALLBACK_IMAGES.general;
}

export async function fetchUnsplashImage(topic: string): Promise<string> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return fallbackForTopic(topic);

  try {
    const query = encodeURIComponent(`${topic} farm ireland`);
    const res   = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } },
    );
    if (!res.ok) return fallbackForTopic(topic);

    const data  = await res.json();
    const photo = data.results?.[0];
    if (!photo) return fallbackForTopic(topic);

    return `${photo.urls.regular}&q=80`;
  } catch {
    return fallbackForTopic(topic);
  }
}

// ─── Article generation via Claude ────────────────────────────────────────────

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '');
}

export async function generateArticle(
  topic:    string,
  imageUrl: string,
): Promise<{ slug: string; content: string; title: string } | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set');
    return null;
  }

  const today = new Date().toISOString().split('T')[0];

  const prompt = `Write a practical How-To Guide for FarmAI Ireland on this topic:
"${topic}"

Brand voice rules — strictly enforced:
- Plain English. First paragraph must answer: what does this mean for my farm?
- Write like a neighbour over the gate, not a professor at a podium
- NEVER use: "it's worth noting", "in today's rapidly evolving landscape", "in conclusion", "game-changer", "revolutionise"
- Audience: Eoin, 47, Roscommon beef farmer, 80 suckler cows, suspicious of hype, time-poor
- Irish context: reference Teagasc, ICBF, Bord Bia, gov.ie, Citizens Information where relevant
- Irish English spelling (e.g. "recognise" not "recognize")
- Must cite at least one real Irish agricultural source
- Add officialAdviceBanner: true if the topic involves grants, subsidies, or animal health

Article format: Problem → Tool → Step-by-step → What it costs → Where to get help
Length: 600–900 words

Available pillars: dairy, beef-sheep, tillage, getting-started, grants-subsidies, livestock, machinery, tech

Return ONLY this exact YAML frontmatter + markdown body — nothing else before or after:

---
title: "..."
slug: "..."
image: "${imageUrl}"
type: "article"
pillar: "getting-started"
date: "${today}"
readTime: 5
difficulty: "beginner"
featured: false
officialAdviceBanner: false
status: "draft"
excerpt: "One sentence, 15–20 words, no full stop at end"
sources:
  - url: "https://..."
    label: "Source Name"
    description: "One-line description"
---

[article markdown here]`;

  try {
    const client  = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 2048,
      messages:   [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].type === 'text' ? message.content[0].text.trim() : '';
    if (!raw) return null;

    // Ensure it starts with ---
    const content = raw.startsWith('---') ? raw : `---\n${raw}`;

    const titleMatch = content.match(/^title:\s*"([^"]+)"/m);
    const title      = titleMatch?.[1] ?? topic;
    const slug       = slugify(title);

    // Normalise slug in frontmatter to match our own
    const normalised = content.replace(/^slug:\s*"[^"]*"/m, `slug: "${slug}"`);

    return { slug, content: normalised, title };
  } catch (err) {
    console.error('generateArticle error:', err);
    return null;
  }
}

// ─── Main pipeline ────────────────────────────────────────────────────────────

export interface DraftResult {
  title:     string;
  slug:      string;
  githubUrl: string | null;
  excerpt:   string;
}

export async function runContentPipeline(): Promise<DraftResult[]> {
  const results: DraftResult[] = [];

  // 1. Read user-submitted ideas from Google Sheet (takes priority)
  let sheetIdeas: string[] = [];
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (sheetId) {
    const token = await getGoogleAccessToken();
    if (token) {
      sheetIdeas = await readSheetValues(token, sheetId);
      if (sheetIdeas.length > 0) {
        await clearSheetValues(token, sheetId);
        console.log(`Read ${sheetIdeas.length} idea(s) from Google Sheet`);
      }
    }
  }

  // 2. Parse backlog and filter already-published topics
  const backlog     = parseBacklogTopics();
  const published   = getPublishedTitles();
  const unpublished = backlog.filter(t =>
    !published.some(p => p.includes(t.toLowerCase().slice(0, 25))),
  );

  // 3. Select up to 3 topics — sheet ideas first, then backlog
  const selected = [...sheetIdeas, ...unpublished].slice(0, 3);
  if (selected.length === 0) {
    console.log('No topics available for generation');
    return results;
  }

  // 4. Generate each article sequentially
  for (const topic of selected) {
    try {
      const imageUrl  = await fetchUnsplashImage(topic);
      const article   = await generateArticle(topic, imageUrl);
      if (!article) continue;

      const filePath  = `content/drafts/${article.slug}.md`;
      const githubUrl = await commitFileToGitHub(
        filePath,
        article.content,
        `draft: auto-generated — ${article.title}`,
      );

      const excerptMatch = article.content.match(/^excerpt:\s*"([^"]+)"/m);
      results.push({
        title:     article.title,
        slug:      article.slug,
        githubUrl,
        excerpt:   excerptMatch?.[1] ?? '',
      });

      console.log(`Generated draft: ${article.title}`);
    } catch (err) {
      console.error(`Failed topic "${topic}":`, err);
    }
  }

  return results;
}
