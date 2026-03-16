import fs   from 'fs';
import path from 'path';

export interface KpiData {
  visitors:     number | null;
  subscribers:  number | null;
  openRate:     number | null;   // percentage 0–100
  thumbsUpRate: number | null;   // percentage 0–100
  articleCount: number;
  sponsors:     number;
  fetchedAt:    string;
}

// ─── Local / static data ──────────────────────────────────────────────────────

export function countArticles(): number {
  let count = 0;
  for (const dir of ['content/articles', 'content/guides']) {
    const full = path.join(process.cwd(), dir);
    if (fs.existsSync(full)) {
      count += fs.readdirSync(full).filter(f => f.endsWith('.md')).length;
    }
  }
  return count;
}

export function getSponsors(): number {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cfg = require('@/config/site.json');
  return cfg?.ads?.activeSponsors ?? 0;
}

// ─── Vercel Analytics ─────────────────────────────────────────────────────────

export async function fetchVisitors(): Promise<number | null> {
  const token     = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;

  const now  = Date.now();
  const from = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();

  try {
    const url = new URL('https://vercel.com/api/web/insights/stats');
    url.searchParams.set('projectId', projectId);
    url.searchParams.set('from',      String(from));
    url.searchParams.set('to',        String(now));
    url.searchParams.set('filter',    '[]');
    url.searchParams.set('tz',        'Europe/Dublin');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.error('Vercel Analytics error:', res.status, await res.text());
      return null;
    }
    const json = await res.json();
    return (
      json?.data?.visitors?.value ??
      json?.data?.uniqueVisitors  ??
      json?.visitors              ??
      null
    );
  } catch (err) {
    console.error('fetchVisitors error:', err);
    return null;
  }
}

// ─── Mailchimp ────────────────────────────────────────────────────────────────

export async function fetchMailchimp(): Promise<{
  subscribers: number | null;
  openRate:    number | null;
}> {
  const key    = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const server = process.env.MAILCHIMP_SERVER_PREFIX ?? 'us8';
  if (!key || !listId) return { subscribers: null, openRate: null };

  const auth = Buffer.from(`anystring:${key}`).toString('base64');
  const base = `https://${server}.api.mailchimp.com/3.0`;

  try {
    const [listRes, campaignRes] = await Promise.all([
      fetch(`${base}/lists/${listId}?fields=stats.member_count`, {
        headers: { Authorization: `Basic ${auth}` },
      }),
      fetch(
        `${base}/campaigns?status=sent&count=1&sort_field=send_time&sort_dir=DESC&fields=campaigns.report_summary`,
        { headers: { Authorization: `Basic ${auth}` } },
      ),
    ]);

    let subscribers: number | null = null;
    let openRate:    number | null = null;

    if (listRes.ok) {
      const data  = await listRes.json();
      subscribers = data?.stats?.member_count ?? null;
    } else {
      console.error('Mailchimp list error:', listRes.status);
    }

    if (campaignRes.ok) {
      const data      = await campaignRes.json();
      const campaigns = data?.campaigns ?? [];
      const rate      = campaigns[0]?.report_summary?.open_rate;
      if (rate != null) openRate = Math.round(rate * 100);
    } else {
      console.error('Mailchimp campaigns error:', campaignRes.status);
    }

    return { subscribers, openRate };
  } catch (err) {
    console.error('fetchMailchimp error:', err);
    return { subscribers: null, openRate: null };
  }
}

// ─── Airtable thumbs-up rate ──────────────────────────────────────────────────

export async function fetchThumbsUpRate(): Promise<number | null> {
  const apiKey  = process.env.AIRTABLE_API_KEY;
  const baseId  = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  if (!apiKey || !baseId || !tableId) return null;

  type AirtableRecord = { fields: { Vote?: string } };
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  try {
    do {
      const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`);
      url.searchParams.set('fields[]', 'Vote');
      if (offset) url.searchParams.set('offset', offset);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) {
        console.error('Airtable thumbs error:', res.status, await res.text());
        return null;
      }
      const data = await res.json();
      records.push(...(data.records ?? []));
      offset = data.offset;
    } while (offset);

    if (records.length === 0) return null;
    const up = records.filter(r => r.fields.Vote === 'up').length;
    return Math.round((up / records.length) * 100);
  } catch (err) {
    console.error('fetchThumbsUpRate error:', err);
    return null;
  }
}

// ─── Airtable KPI snapshots (week-on-week) ────────────────────────────────────

export async function saveKpiSnapshot(kpi: KpiData): Promise<void> {
  const apiKey  = process.env.AIRTABLE_API_KEY;
  const baseId  = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_KPI_TABLE_ID;
  if (!apiKey || !baseId || !tableId) return;

  try {
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Date:         new Date().toISOString().split('T')[0],
          Visitors:     kpi.visitors     ?? 0,
          Subscribers:  kpi.subscribers  ?? 0,
          OpenRate:     kpi.openRate     ?? 0,
          ThumbsUpRate: kpi.thumbsUpRate ?? 0,
          ArticleCount: kpi.articleCount,
          Sponsors:     kpi.sponsors,
        },
      }),
    });
  } catch (err) {
    console.error('saveKpiSnapshot error:', err);
  }
}

export async function fetchPreviousSnapshot(): Promise<KpiData | null> {
  const apiKey  = process.env.AIRTABLE_API_KEY;
  const baseId  = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_KPI_TABLE_ID;
  if (!apiKey || !baseId || !tableId) return null;

  try {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`);
    url.searchParams.set('sort[0][field]',     'Date');
    url.searchParams.set('sort[0][direction]', 'desc');
    url.searchParams.set('maxRecords',         '2');

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return null;

    const data    = await res.json();
    const records = data.records ?? [];
    if (records.length < 2) return null; // need at least 2 weeks of data

    const f = records[1].fields; // second-most-recent = previous week
    return {
      visitors:     f.Visitors     ?? null,
      subscribers:  f.Subscribers  ?? null,
      openRate:     f.OpenRate     ?? null,
      thumbsUpRate: f.ThumbsUpRate ?? null,
      articleCount: f.ArticleCount ?? 0,
      sponsors:     f.Sponsors     ?? 0,
      fetchedAt:    f.Date         ?? '',
    };
  } catch (err) {
    console.error('fetchPreviousSnapshot error:', err);
    return null;
  }
}

// ─── Aggregate ────────────────────────────────────────────────────────────────

export async function fetchKpis(): Promise<KpiData> {
  const [visitors, { subscribers, openRate }, thumbsUpRate] = await Promise.all([
    fetchVisitors(),
    fetchMailchimp(),
    fetchThumbsUpRate(),
  ]);

  return {
    visitors,
    subscribers,
    openRate,
    thumbsUpRate,
    articleCount: countArticles(),
    sponsors:     getSponsors(),
    fetchedAt:    new Date().toISOString(),
  };
}
