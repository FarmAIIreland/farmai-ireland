interface ExistingFile {
  sha?: string;
}

export async function commitFileToGitHub(
  filePath: string,
  content:  string,
  message:  string,
): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  const repo  = process.env.GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland';
  if (!token) {
    console.error('GITHUB_TOKEN not set — cannot commit draft');
    return null;
  }

  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const headers = {
    Authorization:          `Bearer ${token}`,
    'Content-Type':         'application/json',
    Accept:                 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Fetch existing file SHA if the file already exists
  let sha: string | undefined;
  const existing = await fetch(url, { headers });
  if (existing.ok) {
    const data: ExistingFile = await existing.json();
    sha = data.sha;
  }

  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content).toString('base64'),
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method:  'PUT',
    headers,
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    console.error('GitHub commit error:', res.status, await res.text());
    return null;
  }

  return `https://github.com/${repo}/blob/master/${filePath}`;
}
