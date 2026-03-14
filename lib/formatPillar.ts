const PILLAR_LABELS: Record<string, string> = {
  'getting-started':  'Getting Started',
  'grants-subsidies': 'Grants & Subsidies',
  'beef-sheep':       'Beef & Sheep',
  'dairy':            'Dairy',
  'livestock':        'Livestock',
  'tillage':          'Tillage',
  'machinery':        'Machinery',
  'tech':             'Tech',
};

export function formatPillar(slug: string): string {
  return (
    PILLAR_LABELS[slug] ??
    slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  );
}
