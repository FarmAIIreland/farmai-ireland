import { NextResponse } from 'next/server';
import { isDashboardAuthed } from '@/lib/dashboard-auth';

export const dynamic = 'force-dynamic';

interface GitHubFile {
  name: string;
  path: string;
  sha:  string;
  download_url: string;
}

/**
 * GET /api/drafts — list all drafts from content/drafts/ via GitHub API.
 * Returns frontmatter metadata for each draft.
 */
export async function GET(request: Request) {
  if (!(await isDashboardAuthed(request))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not set' }, { status: 500 });
  }

  try {
    const url = `https://api.github.com/repos/${repo}/contents/content/drafts`;
    const res = await fetch(url, {
      headers: {
        Authorization:          `Bearer ${token}`,
        Accept:                 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (res.status === 404) {
      return NextResponse.json({ drafts: [] });
    }
    if (!res.ok) {
      return NextResponse.json({ error: `GitHub error: ${res.status}` }, { status: 500 });
    }

    const files: GitHubFile[] = await res.json();
    const mdFiles = files.filter(f => f.name.endsWith('.md'));

    // Fetch content for each draft to extract frontmatter
    const drafts = await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const contentRes = await fetch(file.download_url);
          const raw = await contentRes.text();

          // Parse frontmatter manually (avoid importing gray-matter in edge)
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
            sha:     file.sha,
          };
        } catch {
          return null;
        }
      }),
    );

    return NextResponse.json({
      drafts: drafts.filter(Boolean),
    });
  } catch (err) {
    console.error('List drafts error:', err);
    return NextResponse.json({ error: 'Failed to list drafts' }, { status: 500 });
  }
}
