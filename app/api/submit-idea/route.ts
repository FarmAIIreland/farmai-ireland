import { NextResponse } from 'next/server';
import { isDashboardAuthed } from '@/lib/dashboard-auth';
import { getGoogleAccessToken } from '@/lib/google-auth';

export const dynamic = 'force-dynamic';

/**
 * POST /api/submit-idea — add a topic idea to the Google Sheet the content pipeline reads.
 * Falls back to committing to a local ideas file via GitHub if Sheets isn't configured.
 * Body: { idea: string }
 */
export async function POST(request: Request) {
  if (!(await isDashboardAuthed(request))) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { idea } = await request.json();
  if (!idea || typeof idea !== 'string' || idea.trim().length < 5) {
    return NextResponse.json({ error: 'Idea must be at least 5 characters' }, { status: 400 });
  }

  const trimmed = idea.trim();

  // Try Google Sheets first
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  if (sheetId) {
    const token = await getGoogleAccessToken();
    if (token) {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A:A:append?valueInputOption=USER_ENTERED`;
        const res = await fetch(url, {
          method:  'POST',
          headers: {
            Authorization:  `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [[trimmed]],
          }),
        });

        if (res.ok) {
          return NextResponse.json({ ok: true, method: 'google-sheets' });
        }
        console.error('Sheets append error:', res.status, await res.text());
      } catch (err) {
        console.error('Sheets append error:', err);
      }
    }
  }

  // Fallback: append to docs/idea-submissions.md via GitHub API
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  if (!token) {
    return NextResponse.json({ error: 'No storage configured (set GOOGLE_SHEETS_ID or GITHUB_TOKEN)' }, { status: 500 });
  }

  try {
    const filePath = 'docs/idea-submissions.md';
    const fileUrl  = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const headers  = {
      Authorization:          `Bearer ${token}`,
      'Content-Type':         'application/json',
      Accept:                 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    let existing = '';
    let sha: string | undefined;

    const getRes = await fetch(fileUrl, { headers });
    if (getRes.ok) {
      const data = await getRes.json();
      existing = Buffer.from(data.content, 'base64').toString('utf8');
      sha = data.sha;
    } else {
      existing = '# Topic Ideas\n\nSubmitted via the dashboard.\n';
    }

    const today   = new Date().toISOString().split('T')[0];
    const updated = existing + `\n- ${trimmed} _(${today})_`;

    const body: Record<string, unknown> = {
      message: `idea: ${trimmed.slice(0, 50)}`,
      content: Buffer.from(updated).toString('base64'),
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(fileUrl, {
      method:  'PUT',
      headers,
      body:    JSON.stringify(body),
    });

    if (!putRes.ok) {
      console.error('GitHub idea commit error:', putRes.status, await putRes.text());
      return NextResponse.json({ error: 'Failed to save idea' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, method: 'github' });
  } catch (err) {
    console.error('Submit idea error:', err);
    return NextResponse.json({ error: 'Failed to save idea' }, { status: 500 });
  }
}
