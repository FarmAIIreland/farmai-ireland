const PILLAR_LABELS: Record<string, string> = {
  'save-time':        'Save Time',
  'tools-explained':  'Tools Explained',
  'whats-changing':   "What's Changing",
  'does-this-work':   'Does This Work?',
  // Legacy fallbacks — remove once all content is migrated
  'getting-started':  'Getting Started',
  'grants-subsidies': 'Grants & Subsidies',
  'livestock':        'Livestock',
  'dairy':            'Dairy',
  'beef-sheep':       'Beef & Sheep',
  'tillage':          'Tillage',
  'machinery':        'Machinery',
  'tech':             'Tech',
  'policy':           'Policy',
};

export function formatPillar(slug: string): string {
  return (
    PILLAR_LABELS[slug] ??
    slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  );
}
