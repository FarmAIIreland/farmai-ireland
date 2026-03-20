import { NextRequest, NextResponse } from 'next/server';

/** SHA-256 hash matching the Edge-compatible implementation in middleware.ts. */
async function hashPassword(password: string): Promise<string> {
  const data   = new TextEncoder().encode(password + ':farmai-dashboard');
  const hash   = await crypto.subtle.digest('SHA-256', data);
  const bytes  = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password?: string };

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('dashboard_auth', await hashPassword(expected), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   60 * 60 * 24, // 24 hours
    path:     '/',
  });
  return res;
}
