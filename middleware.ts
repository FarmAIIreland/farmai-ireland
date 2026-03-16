import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login page is always accessible
  if (pathname === '/dashboard/login') return NextResponse.next();

  const cookie   = req.cookies.get('dashboard_auth')?.value;
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password || cookie !== password) {
    return NextResponse.redirect(new URL('/dashboard/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
