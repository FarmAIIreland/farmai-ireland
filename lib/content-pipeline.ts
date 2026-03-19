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

// ─── Image generation ─────────────────────────────────────────────────────────
// OG images are now generated dynamically via /api/og — no external image deps.

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
  topic: string,
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

Core editorial filter — non-negotiable:
- The title MUST explicitly state what the farmer saves (time, money, or headache avoided)
- Not "How to use AI for X" — instead "Cut X time in half with AI" or "Stop overpaying for X"
- Title patterns that work:
  * "Save [time] on [task] with [tool]" (save-time pillar)
  * "[Tool] tested: is it worth €[cost] for your [farm type]?" (does-this-work pillar)
  * "Stop [pain point] — here's what [change] actually means for your farm" (whats-changing pillar)
  * "[Outcome] in [timeframe] — the [tool] guide for farmers who haven't started yet" (tools-explained pillar)
- We are ambassadors and enablers, not farmers. Write from that position.

Article format: Problem → Tool → Step-by-step → What it costs → Where to get help
Length: 600–900 words

Available pillars (choose the BEST fit):
- save-time: Paperwork, grants, admin, compliance — anything that saves the farmer time
- tools-explained: Plain-English breakdowns of AI tools, glossaries, getting started guides
- whats-changing: Policy, regulation, market shifts, industry trends
- does-this-work: Honest reviews, tool testing, cost-benefit verdicts

Return ONLY this exact YAML frontmatter + markdown body — nothing else before or after:

---
title: "..."
slug: "..."
type: "article"
pillar: "save-time"
date: "${today}"
readTime: 5
difficulty: "beginner"
featured: false
officialAdviceBanner: false
status: "draft"
excerpt: "One sentence, 15–20 words, no full stop at end"
seo:
  title: "SEO-optimised title under 60 chars | FarmAI Ireland"
  description: "Compelling meta description, 150-160 chars, includes primary keyword"
  keywords: ["primary keyword", "secondary keyword", "Irish farming + topic"]
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

// ─── Tweet generation ─────────────────────────────────────────────────────────

export async function generateTweet(
  title: string,
  slug: string,
  pillar: string,
  excerpt: string,
  date: string,
): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const schemeHashtags: Record<string, string> = {
    biss: '#BISS', acres: '#ACRES', tams: '#TAMS', nitrates: '#Nitrates',
    organic: '#OrganicFarming', dairy: '#DairyFarming', beef: '#BeefFarming',
    sheep: '#SheepFarming', tillage: '#Tillage', carbon: '#CarbonCredits',
  };

  const topicTag = Object.entries(schemeHashtags).find(
    ([key]) => title.toLowerCase().includes(key) || slug.includes(key),
  )?.[1] ?? `#${pillar.replace(/-/g, '').replace(/^\w/, c => c.toUpperCase())}`;

  const prompt = `Generate a single tweet for FarmAI Ireland (@FarmAI_Ireland) about this article.

Article title: "${title}"
Article excerpt: "${excerpt}"
Article URL: https://farmai.ie/read/${slug}

Rules — strictly enforced:
- NEVER start with "Discover", "Unlock", "Exciting", "We're thrilled", or any hype language
- NEVER use emojis
- Plain English, sceptical, practical tone — Eoin the Roscommon beef farmer voice
- Hook line first (max 15 words): why does a time-poor Irish farmer care right now?
- One sentence expanding the hook — what's the actual farm benefit
- Then the article URL on its own line
- Then hashtags on own line: #IrishFarming #FarmAI ${topicTag}
- Total tweet MUST be under 257 characters (URLs count as 23 chars on X)
- The hook must answer: "why does a time-poor Irish farmer care about this right now?"

Return ONLY the tweet text. Nothing else — no quotes, no explanation.`;

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });

    const tweet = message.content[0].type === 'text' ? message.content[0].text.trim() : '';
    if (!tweet) return null;

    return tweet;
  } catch (err) {
    console.error('generateTweet error:', err);
    return null;
  }
}

function formatTweetQueueEntry(
  date: string,
  title: string,
  slug: string,
  tweet: string,
): string {
  return `
---

**DATE:** ${date}
**ARTICLE:** ${title}
**URL:** https://farmai.ie/read/${slug}
**STATUS:** PENDING

**TWEET:**
${tweet}
`;
}

export interface DraftResult {
  title:     string;
  slug:      string;
  githubUrl: string | null;
  excerpt:   string;
  tweet:     string | null;
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

  // 4. Generate each article sequentially + tweet for each
  const tweetEntries: string[] = [];

  for (const topic of selected) {
    try {
      const article   = await generateArticle(topic);
      if (!article) continue;

      const filePath  = `content/drafts/${article.slug}.md`;
      const githubUrl = await commitFileToGitHub(
        filePath,
        article.content,
        `draft: auto-generated — ${article.title}`,
      );

      const excerptMatch = article.content.match(/^excerpt:\s*"([^"]+)"/m);
      const pillarMatch  = article.content.match(/^pillar:\s*"([^"]+)"/m);
      const excerpt      = excerptMatch?.[1] ?? '';
      const pillar       = pillarMatch?.[1] ?? 'tools-explained';
      const today        = new Date().toISOString().split('T')[0];

      // Generate tweet for this article
      const tweet = await generateTweet(article.title, article.slug, pillar, excerpt, today);
      if (tweet) {
        tweetEntries.push(formatTweetQueueEntry(today, article.title, article.slug, tweet));
      }

      results.push({
        title:     article.title,
        slug:      article.slug,
        githubUrl,
        excerpt,
        tweet,
      });

      console.log(`Generated draft: ${article.title}`);
    } catch (err) {
      console.error(`Failed topic "${topic}":`, err);
    }
  }

  // 5. Append tweets to queue file via GitHub commit
  if (tweetEntries.length > 0) {
    try {
      const queuePath = 'docs/twitter-queue.md';

      // Read existing queue content from GitHub
      const token = process.env.GITHUB_TOKEN;
      const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
      let existingContent = '';

      if (token) {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${repo}/contents/${queuePath}`,
            { headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' } },
          );
          if (res.ok) {
            const data = await res.json();
            existingContent = Buffer.from(data.content, 'base64').toString('utf8');
          }
        } catch {
          // File may not exist yet — that's fine
        }

        const updatedContent = existingContent + tweetEntries.join('');
        await commitFileToGitHub(
          queuePath,
          updatedContent,
          `tweets: ${tweetEntries.length} new tweet(s) queued`,
        );
        console.log(`Appended ${tweetEntries.length} tweet(s) to queue`);
      }
    } catch (err) {
      console.error('Failed to update tweet queue:', err);
    }
  }

  return results;
}
