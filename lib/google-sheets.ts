const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

export async function readSheetValues(
  token:   string,
  sheetId: string,
  range =  'A2:A',
): Promise<string[]> {
  const url = `${SHEETS_BASE}/${sheetId}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    console.error('Sheets read error:', res.status, await res.text());
    return [];
  }
  const data = await res.json();
  return (data.values ?? [])
    .map((row: string[]) => row[0])
    .filter(Boolean);
}

export async function clearSheetValues(
  token:   string,
  sheetId: string,
  range =  'A2:A',
): Promise<void> {
  const url = `${SHEETS_BASE}/${sheetId}/values/${encodeURIComponent(range)}:clear`;
  const res = await fetch(url, {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    console.error('Sheets clear error:', res.status, await res.text());
  }
}
