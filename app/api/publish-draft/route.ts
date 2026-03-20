import { NextResponse } from 'next/server';
import { isDashboardAuthed } from '@/lib/dashboard-auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/publish-draft — move a draft from content/drafts/ to content/articles/ (or guides/).
 * Body: { slug: string, target?: "articles" | "guides" }
 * Updates status: "draft" → "published" in frontmatter, creates in target, deletes from drafts.
 */
export async function POST(request: Request) {
  if (!(await isDashboardAuthed(request))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { slug, target = 'articles' } = await request.json();
  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  if (target !== 'articles' && target !== 'guides') {
    return NextResponse.json({ error: 'target must be "articles" or "guides"' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not set' }, { status: 500 });
  }

  const headers = {
    Authorization:          `Bearer ${token}`,
    'Content-Type':         'application/json',
    Accept:                 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // 1. Read the draft from GitHub
    const draftUrl = `https://api.github.com/repos/${repo}/contents/content/drafts/${slug}.md`;
    const draftRes = await fetch(draftUrl, { headers });

    if (!draftRes.ok) {
      return NextResponse.json({ error: `Draft not found: ${slug}` }, { status: 404 });
    }

    const draftData = await draftRes.json();
    let content = Buffer.from(draftData.content, 'base64').toString('utf8');

    // 2. Update frontmatter: status draft → published, update date to today
    content = content.replace(/^status:\s*"?draft"?/m, 'status: "published"');
    const today = new Date().toISOString().split('T')[0];
    content = content.replace(/^date:\s*"?[\d-]+"?/m, `date: "${today}"`);

    // 3. Create the file in target directory
    const targetPath = `content/${target}/${slug}.md`;
    const targetUrl  = `https://api.github.com/repos/${repo}/contents/${targetPath}`;

    // Check if target already exists
    const existingRes = await fetch(targetUrl, { headers });
    const targetBody: Record<string, unknown> = {
      message: `publish: ${slug} → ${target}`,
      content: Buffer.from(content).toString('base64'),
    };
    if (existingRes.ok) {
      const existingData = await existingRes.json();
      targetBody.sha = existingData.sha;
    }

    const createRes = await fetch(targetUrl, {
      method:  'PUT',
      headers,
      body:    JSON.stringify(targetBody),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error('Create in target error:', err);
      return NextResponse.json({ error: 'Failed to create published file' }, { status: 500 });
    }

    // 4. Delete the draft
    const deleteRes = await fetch(draftUrl, {
      method:  'DELETE',
      headers,
      body:    JSON.stringify({
        message: `publish: remove draft ${slug}`,
        sha:     draftData.sha,
      }),
    });

    if (!deleteRes.ok) {
      console.error('Delete draft error:', await deleteRes.text());
      // Don't fail — the article is already published, draft cleanup is secondary
    }

    return NextResponse.json({
      ok:   true,
      slug,
      target,
      url:  `https://farmai.ie/${target === 'guides' ? 'guides' : 'read'}/${slug}`,
    });
  } catch (err) {
    console.error('Publish draft error:', err);
    return NextResponse.json({ error: 'Publish failed' }, { status: 500 });
  }
}
