import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BrokenLink {
  file:   string;
  url:    string;
  status: number | 'timeout' | 'error';
}

async function checkUrl(url: string): Promise<number | 'timeout' | 'error'> {
  const controller = new AbortController();
  const timer      = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      method:  'HEAD',
      signal:  controller.signal,
      headers: { 'User-Agent': 'FarmAI-LinkChecker/1.0' },
    });
    clearTimeout(timer);

    // Some servers reject HEAD — retry with GET
    if (res.status === 405) {
      const res2 = await fetch(url, {
        method:  'GET',
        signal:  AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'FarmAI-LinkChecker/1.0' },
      });
      return res2.status;
    }

    return res.status;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === 'AbortError') return 'timeout';
    return 'error';
  }
}

export async function checkBrokenLinks(): Promise<BrokenLink[]> {
  const broken:   BrokenLink[]                 = [];
  const toCheck:  { file: string; url: string }[] = [];
  const dirs      = ['content/articles', 'content/guides'];

  for (const dir of dirs) {
    const full = path.join(process.cwd(), dir);
    if (!fs.existsSync(full)) continue;

    for (const file of fs.readdirSync(full).filter(f => f.endsWith('.md'))) {
      const raw     = fs.readFileSync(path.join(full, file), 'utf8');
      const { data } = matter(raw);
      const sources  = (data.sources ?? []) as { url?: string }[];
      for (const s of sources) {
        if (s.url) toCheck.push({ file: `${dir}/${file}`, url: s.url });
      }
    }
  }

  if (toCheck.length === 0) return [];

  // Check in batches of 5 concurrent requests
  const BATCH = 5;
  for (let i = 0; i < toCheck.length; i += BATCH) {
    const batch   = toCheck.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(async ({ file, url }) => ({
        file,
        url,
        status: await checkUrl(url),
      })),
    );
    for (const r of results) {
      const ok = typeof r.status === 'number' && r.status >= 200 && r.status < 400;
      if (!ok) broken.push(r);
    }
  }

  return broken;
}
