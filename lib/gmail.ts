const BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

function authHeaders(token: string) {
  return {
    Authorization:  `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// ─── Labels ───────────────────────────────────────────────────────────────────

export async function listAllLabels(
  token: string,
): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`${BASE}/labels`, { headers: authHeaders(token) });
  if (!res.ok) return [];
  const data = await res.json();
  return data.labels ?? [];
}

export async function getLabelId(
  token: string,
  name:  string,
): Promise<string | null> {
  const labels = await listAllLabels(token);
  return labels.find(l => l.name.toLowerCase() === name.toLowerCase())?.id ?? null;
}

export async function createLabel(
  token: string,
  name:  string,
): Promise<string | null> {
  const res = await fetch(`${BASE}/labels`, {
    method:  'POST',
    headers: authHeaders(token),
    body:    JSON.stringify({ name }),
  });
  if (!res.ok) {
    console.error('createLabel error:', res.status);
    return null;
  }
  const data = await res.json();
  return data.id ?? null;
}

export async function ensureLabel(
  token: string,
  name:  string,
): Promise<string | null> {
  const existing = await getLabelId(token, name);
  if (existing) return existing;
  return createLabel(token, name);
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export async function listUnreadMessageIds(
  token:      string,
  labelId:    string,
  maxResults = 20,
): Promise<string[]> {
  const url = new URL(`${BASE}/messages`);
  url.searchParams.set('labelIds',   labelId);
  url.searchParams.set('q',          'is:unread');
  url.searchParams.set('maxResults', String(maxResults));

  const res = await fetch(url.toString(), { headers: authHeaders(token) });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.messages ?? []).map((m: { id: string }) => m.id);
}

export async function getUnreadCount(
  token:   string,
  labelId: string,
): Promise<number> {
  const ids = await listUnreadMessageIds(token, labelId, 100);
  return ids.length;
}

export interface GmailMessage {
  id:         string;
  threadId:   string;
  subject:    string;
  from:       string;
  snippet:    string;
  messageId?: string;
}

export async function getMessage(
  token: string,
  id:    string,
): Promise<GmailMessage | null> {
  const res = await fetch(
    `${BASE}/messages/${id}?format=metadata` +
    `&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Message-ID`,
    { headers: authHeaders(token) },
  );
  if (!res.ok) return null;

  const data    = await res.json();
  const headers = data.payload?.headers ?? [];
  const get     = (name: string) =>
    headers.find((h: { name: string; value: string }) =>
      h.name.toLowerCase() === name.toLowerCase()
    )?.value ?? '';

  return {
    id:        data.id,
    threadId:  data.threadId,
    subject:   get('Subject'),
    from:      get('From'),
    snippet:   data.snippet ?? '',
    messageId: get('Message-ID'),
  };
}

// ─── Drafts ───────────────────────────────────────────────────────────────────

export async function createDraft(
  token:      string,
  to:         string,
  from:       string,
  subject:    string,
  body:       string,
  threadId?:  string,
  inReplyTo?: string,
): Promise<boolean> {
  const headerLines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    inReplyTo ? `In-Reply-To: ${inReplyTo}` : '',
    inReplyTo ? `References: ${inReplyTo}`  : '',
    'Content-Type: text/plain; charset=utf-8',
    '',
    body,
  ].filter(Boolean).join('\r\n');

  const raw = Buffer.from(headerLines).toString('base64url');
  const msg: Record<string, unknown> = { raw };
  if (threadId) msg.threadId = threadId;

  const res = await fetch(`${BASE}/drafts`, {
    method:  'POST',
    headers: authHeaders(token),
    body:    JSON.stringify({ message: msg }),
  });
  if (!res.ok) {
    console.error('createDraft error:', res.status, await res.text());
    return false;
  }
  return true;
}

export async function markAsRead(token: string, messageId: string): Promise<void> {
  await fetch(`${BASE}/messages/${messageId}/modify`, {
    method:  'POST',
    headers: authHeaders(token),
    body:    JSON.stringify({ removeLabelIds: ['UNREAD'] }),
  });
}

// ─── Filters ──────────────────────────────────────────────────────────────────

export async function createFilter(
  token:       string,
  query:       string,
  addLabelIds: string[],
): Promise<boolean> {
  const res = await fetch(`${BASE}/settings/filters`, {
    method:  'POST',
    headers: authHeaders(token),
    body:    JSON.stringify({
      criteria: { query },
      action:   { addLabelIds, removeLabelIds: [] },
    }),
  });
  if (!res.ok) {
    console.error('createFilter error:', res.status, await res.text());
    return false;
  }
  return true;
}
