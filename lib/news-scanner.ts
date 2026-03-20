/**
 * Scans Irish agricultural news sources for timely topics
 * that could augment the evergreen content strategy.
 *
 * Looks for headlines mentioning AI, technology, grants, schemes,
 * and other keywords relevant to FarmAI Ireland's audience.
 */

export interface NewsItem {
  source:    string;
  headline:  string;
  url:       string;
  matchedOn: string;
}

const KEYWORDS = [
  'artificial intelligence', 'AI ', ' ai ', 'machine learning',
  'technology', 'digital', 'app ', 'software', 'drone',
  'satellite', 'precision farming', 'precision agriculture',
  'grant', 'scheme', 'subsidy', 'TAMS', 'ACRES', 'BISS',
  'CAP ', 'climate', 'carbon', 'methane', 'nitrates',
  'EBI', 'ICBF', 'Bord Bia', 'data', 'automation',
  'robotics', 'sensor', 'smart farming',
];

interface FeedSource {
  name: string;
  url:  string;
  type: 'rss' | 'html';
}

const SOURCES: FeedSource[] = [
  {
    name: 'Teagasc',
    url:  'https://www.teagasc.ie/news--events/news/',
    type: 'html',
  },
  {
    name: 'DAFM',
    url:  'https://www.gov.ie/en/news/?department=department-of-agriculture-food-and-the-marine',
    type: 'html',
  },
  {
    name: 'AgriLand',
    url:  'https://www.agriland.ie/farming-news/feed/',
    type: 'rss',
  },
  {
    name: 'IFA',
    url:  'https://www.ifa.ie/feed/',
    type: 'rss',
  },
];

function matchesKeywords(text: string): string | null {
  const lower = text.toLowerCase();
  for (const kw of KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      return kw.trim();
    }
  }
  return null;
}

async function parseRSS(source: FeedSource): Promise<NewsItem[]> {
  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'FarmAI-Ireland-Bot/1.0' },
      signal:  AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];

    const xml   = await res.text();
    const items: NewsItem[] = [];

    // Simple RSS item extraction — no XML parser dependency
    const itemBlocks = xml.split('<item>').slice(1);
    for (const block of itemBlocks.slice(0, 20)) {
      const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/);
      const linkMatch  = block.match(/<link>(.*?)<\/link>|<link><!\[CDATA\[(.*?)\]\]>/);

      const headline = (titleMatch?.[1] ?? titleMatch?.[2] ?? '').trim();
      const url      = (linkMatch?.[1] ?? linkMatch?.[2] ?? '').trim();

      if (!headline) continue;

      const keyword = matchesKeywords(headline);
      if (keyword) {
        items.push({
          source:    source.name,
          headline,
          url,
          matchedOn: keyword,
        });
      }
    }

    return items;
  } catch (err) {
    console.error(`RSS scan error (${source.name}):`, err);
    return [];
  }
}

async function parseHTML(source: FeedSource): Promise<NewsItem[]> {
  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'FarmAI-Ireland-Bot/1.0' },
      signal:  AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];

    const html  = await res.text();
    const items: NewsItem[] = [];

    // Extract text from anchor tags and headings — lightweight, no DOM parser
    const linkPattern = /<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;

    while ((match = linkPattern.exec(html)) !== null) {
      const url      = match[1];
      const rawText  = match[2].replace(/<[^>]+>/g, '').trim();

      if (rawText.length < 20 || rawText.length > 200) continue;

      const keyword = matchesKeywords(rawText);
      if (keyword) {
        const fullUrl = url.startsWith('http') ? url : `${new URL(source.url).origin}${url}`;
        items.push({
          source:    source.name,
          headline:  rawText,
          url:       fullUrl,
          matchedOn: keyword,
        });
      }
    }

    // Deduplicate by headline
    const seen = new Set<string>();
    return items.filter(item => {
      if (seen.has(item.headline)) return false;
      seen.add(item.headline);
      return true;
    });
  } catch (err) {
    console.error(`HTML scan error (${source.name}):`, err);
    return [];
  }
}

/**
 * Scan all configured Irish ag news sources for timely, relevant topics.
 * Returns up to 10 matched items, sorted by source priority.
 */
export async function scanTimelyTopics(): Promise<NewsItem[]> {
  const results = await Promise.all(
    SOURCES.map(source =>
      source.type === 'rss' ? parseRSS(source) : parseHTML(source),
    ),
  );

  return results.flat().slice(0, 10);
}
