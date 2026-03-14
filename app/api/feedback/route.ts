import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, vote, page } = body as {
      slug: string;
      vote: 'up' | 'down';
      page: string;
    };

    if (!slug || !vote || !page) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey   = process.env.AIRTABLE_API_KEY;
    const baseId   = process.env.AIRTABLE_BASE_ID;
    const tableId  = process.env.AIRTABLE_TABLE_ID;

    if (!apiKey || !baseId || !tableId) {
      console.error('Airtable env vars not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    const res = await fetch(url, {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Slug:      slug,
          Vote:      vote,
          Timestamp: new Date().toISOString(),
          Page:      page,
        },
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Airtable error:', res.status, detail);
      return NextResponse.json({ error: 'Airtable write failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Feedback route error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
