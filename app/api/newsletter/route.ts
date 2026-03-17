import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const dc     = process.env.MAILCHIMP_SERVER_PREFIX ?? 'us8';

    if (!apiKey || !listId) {
      return NextResponse.json({ error: 'Newsletter service not configured.' }, { status: 500 });
    }

    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method:  'POST',
        headers: {
          Authorization:  `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'subscribed' }),
      },
    );

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    const body = await res.json();
    // Member already subscribed — treat as success
    if (body.title === 'Member Exists') {
      return NextResponse.json({ ok: true });
    }

    console.error('Mailchimp error:', body);
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 });
  } catch (err) {
    console.error('Newsletter route error:', err);
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
