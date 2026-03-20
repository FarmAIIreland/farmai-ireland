/**
 * Validate dashboard cookie on API routes that serve the dashboard UI.
 * Mirrors the SHA-256 check in middleware.ts.
 */
export async function isDashboardAuthed(request: Request): Promise<boolean> {
  const password = process.env.DASHBOARD_PASSWORD;
  if (!password) return false;

  const cookies = request.headers.get('cookie') ?? '';
  const match   = cookies.match(/dashboard_auth=([^;]+)/);
  if (!match) return false;

  const data   = new TextEncoder().encode(password + ':farmai-dashboard');
  const hash   = await crypto.subtle.digest('SHA-256', data);
  const expect = Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return match[1] === expect;
}
