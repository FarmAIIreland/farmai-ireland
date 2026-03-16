export async function getGoogleAccessToken(): Promise<string | null> {
  const clientId     = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams({
        client_id:     clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type:    'refresh_token',
      }),
    });

    if (!res.ok) {
      console.error('Google token error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.access_token ?? null;
  } catch (err) {
    console.error('getGoogleAccessToken error:', err);
    return null;
  }
}
