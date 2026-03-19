import { NextRequest, NextResponse } from 'next/server';

/** Edge-compatible SHA-256 hash using Web Crypto API. */
async function hashPassword(password: string): Promise<string> {
  const data   = new TextEncoder().encode(password + ':farmai-dashboard');
  const hash   = await crypto.subtle.digest('SHA-256', data);
  const bytes  = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page is always accessible
  if (pathname === '/dashboard/login') return NextResponse.next();

  const cookie   = req.cookies.get('dashboard_auth')?.value;
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password || cookie !== await hashPassword(password)) {
    return NextResponse.redirect(new URL('/dashboard/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
