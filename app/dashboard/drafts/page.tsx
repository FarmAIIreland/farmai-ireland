import Link from 'next/link';
import DraftReview from './DraftReview';

export const dynamic = 'force-dynamic';

interface DraftMeta {
  slug:    string;
  title:   string;
  pillar:  string;
  date:    string;
  excerpt: string;
}

async function fetchDrafts(): Promise<DraftMeta[]> {
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  if (!token) return [];

  try {
    const url = `https://api.github.com/repos/${repo}/contents/content/drafts`;
    const res = await fetch(url, {
      headers: {
        Authorization:          `Bearer ${token}`,
        Accept:                 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      next: { revalidate: 0 },
    });

    if (res.status === 404) return [];
    if (!res.ok) return [];

    const files = await res.json();
    const mdFiles = files.filter((f: { name: string }) => f.name.endsWith('.md'));

    const drafts = await Promise.all(
      mdFiles.map(async (file: { name: string; download_url: string; sha: string }) => {
        try {
          const contentRes = await fetch(file.download_url);
          const raw = await contentRes.text();

          const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
          const fm = fmMatch?.[1] ?? '';

          const get = (key: string) => {
            const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
            return m?.[1]?.trim() ?? '';
          };

          return {
            slug:    file.name.replace('.md', ''),
            title:   get('title'),
            pillar:  get('pillar'),
            date:    get('date'),
            excerpt: get('excerpt'),
          };
        } catch {
          return null;
        }
      }),
    );

    return drafts.filter(Boolean) as DraftMeta[];
  } catch {
    return [];
  }
}

export default async function DraftsPage() {
  const drafts = await fetchDrafts();

  return (
    <div className="min-h-screen bg-ui-bg">
      {/* Header */}
      <div
        className="relative px-4 py-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #062A1E 0%, #0B4D3B 40%, #0A3D2E 70%, #041F16 100%)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-site mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              &larr; Dashboard
            </Link>
            <Link
              href="/api/dashboard-logout"
              className="text-sm text-white/70 hover:text-white border border-white/30 px-4 py-1.5 rounded-button transition-colors"
            >
              Sign out
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">Review & Publish</h1>
          <p className="text-white/60 mt-2">
            {drafts.length} draft{drafts.length !== 1 ? 's' : ''} waiting for review.
            Click &ldquo;Run 4-Persona Review&rdquo; to get an automated quality check, then approve or reject.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 max-w-site mx-auto">
        <DraftReview drafts={drafts} />
      </div>
    </div>
  );
}
