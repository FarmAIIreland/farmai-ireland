import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:       'Tools — FarmAI Ireland',
  description: 'A curated list of AI and digital tools for Irish farmers — only tools we\'ve tested or written about. No affiliate links.',
};

/* ── Tool data ─────────────────────────────────────────────────────────────── */

interface Tool {
  name:        string;
  oneLiner:    string;
  category:    'ai-assistant' | 'livestock' | 'grassland' | 'management' | 'compliance';
  url:         string;
  price:       string;
  irish:       boolean;
  articleSlug: string;
  articleLabel: string;
}

const TOOLS: Tool[] = [
  {
    name:         'ChatGPT',
    oneLiner:     'General-purpose AI assistant — drafting, brainstorming, admin prep.',
    category:     'ai-assistant',
    url:          'https://chat.openai.com',
    price:        'Free (Plus €20/mo)',
    irish:        false,
    articleSlug:  '/read/chatgpt-first-10-prompts-farmers',
    articleLabel: 'Your first 10 prompts',
  },
  {
    name:         'Claude',
    oneLiner:     'AI assistant — strong on long documents, policies, and measured answers.',
    category:     'ai-assistant',
    url:          'https://claude.ai',
    price:        'Free (Pro €20/mo)',
    irish:        false,
    articleSlug:  '/read/chatgpt-claude-gemini-which-for-farmers',
    articleLabel: 'ChatGPT vs Claude vs Gemini',
  },
  {
    name:         'Google Gemini',
    oneLiner:     'AI with live web search — good for current information.',
    category:     'ai-assistant',
    url:          'https://gemini.google.com',
    price:        'Free',
    irish:        false,
    articleSlug:  '/read/chatgpt-claude-gemini-which-for-farmers',
    articleLabel: 'ChatGPT vs Claude vs Gemini',
  },
  {
    name:         'Herdwatch',
    oneLiner:     'Farm management app — tagging, dosing, movements, ICBF sync.',
    category:     'management',
    url:          'https://www.herdwatch.com',
    price:        'Free tier / from €149/yr',
    irish:        true,
    articleSlug:  '/guides/save-time-calving-apps',
    articleLabel: 'Calving apps compared',
  },
  {
    name:         'AgriNet',
    oneLiner:     'DAFM official app — movement notifications and herd register.',
    category:     'compliance',
    url:          'https://www.agfood.ie',
    price:        'Free',
    irish:        true,
    articleSlug:  '/guides/save-time-calving-apps',
    articleLabel: 'Calving apps compared',
  },
  {
    name:         'PastureBase',
    oneLiner:     'Grass measurement and management — Teagasc-backed.',
    category:     'grassland',
    url:          'https://pasturebase.teagasc.ie',
    price:        'Free',
    irish:        true,
    articleSlug:  '/guides/pasturebase-phone-grass-measurement',
    articleLabel: 'Measuring grass with your phone',
  },
  {
    name:         'Moocall HEAT',
    oneLiner:     'Tail-mounted heat detection sensor — Irish-made, local support.',
    category:     'livestock',
    url:          'https://www.moocall.com',
    price:        'Hardware + subscription',
    irish:        true,
    articleSlug:  '/read/heat-detection-apps-ireland-review',
    articleLabel: 'Heat detection apps reviewed',
  },
  {
    name:         'SenseHub (MSD)',
    oneLiner:     'Ear tag monitoring — activity, rumination, health, and heat alerts.',
    category:     'livestock',
    url:          'https://www.msd-animal-health.ie',
    price:        'Hardware + subscription',
    irish:        false,
    articleSlug:  '/read/heat-detection-apps-ireland-review',
    articleLabel: 'Heat detection apps reviewed',
  },
  {
    name:         'FarmFlo',
    oneLiner:     'Sheep and cattle management — scanning records, breeding data.',
    category:     'management',
    url:          'https://www.farmflo.com',
    price:        'From €99/yr',
    irish:        true,
    articleSlug:  '/read/sheep-scanning-ai-tools',
    articleLabel: 'Sheep scanning and AI tools',
  },
  {
    name:         'ICBF HerdPlus',
    oneLiner:     'Breeding data, EBI reports, and herd performance from ICBF.',
    category:     'livestock',
    url:          'https://www.icbf.com',
    price:        'Free for registered herds',
    irish:        true,
    articleSlug:  '/read/icbf-ai-ebi-explained',
    articleLabel: 'How ICBF uses AI for EBI',
  },
];

/* ── Category config ───────────────────────────────────────────────────────── */

const CATEGORIES: Record<string, { label: string; description: string }> = {
  'ai-assistant': { label: 'AI Assistants',       description: 'General-purpose AI tools for drafting, research, and admin' },
  'livestock':    { label: 'Livestock & Breeding', description: 'Heat detection, breeding data, and animal monitoring' },
  'grassland':    { label: 'Grassland',            description: 'Grass measurement and pasture management' },
  'management':   { label: 'Farm Management',      description: 'Herd records, compliance, and daily operations' },
  'compliance':   { label: 'Compliance',           description: 'Official DAFM systems and regulatory tools' },
};

const CATEGORY_ORDER = ['ai-assistant', 'management', 'livestock', 'grassland', 'compliance'] as const;

/* ── Page ───────────────────────────────────────────────────────────────────── */

interface Props {
  searchParams: { category?: string };
}

export default function ToolsPage({ searchParams }: Props) {
  const active = searchParams.category ?? '';
  const visibleCategories = active
    ? CATEGORY_ORDER.filter(k => k === active)
    : CATEGORY_ORDER;

  return (
    <main className="bg-ui-bg min-h-screen">

      {/* Page header */}
      <section className="bg-white border-b border-ui-border py-10 sm:py-12 px-4">
        <div className="max-w-site mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-3">Tools</p>
          <h1
            className="font-serif font-semibold text-ui-text mb-2"
            style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Tested tools. No affiliate links.
          </h1>
          <p className="text-ui-muted text-sm sm:text-base mb-1">
            Every tool links to our article so you can read the honest take first.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            <Link
              href="/tools"
              className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                !active
                  ? 'bg-brand-green text-white border-brand-green'
                  : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
              }`}
            >
              All
            </Link>
            {CATEGORY_ORDER.map(catKey => (
              <Link
                key={catKey}
                href={`/tools?category=${catKey}`}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${
                  active === catKey
                    ? 'bg-brand-green text-white border-brand-green'
                    : 'bg-white text-ui-muted border-ui-border hover:border-brand-green hover:text-brand-green'
                }`}
              >
                {CATEGORIES[catKey].label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tool categories */}
      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {visibleCategories.map(catKey => {
            const cat = CATEGORIES[catKey];
            const tools = TOOLS.filter(t => t.category === catKey);
            if (tools.length === 0) return null;

            return (
              <div key={catKey}>
                <div className="mb-4">
                  <h2 className="font-serif font-semibold text-ui-text text-xl mb-1">
                    {cat.label}
                  </h2>
                  <p className="text-ui-muted text-sm">{cat.description}</p>
                </div>

                <div className="grid gap-3">
                  {tools.map(tool => (
                    <div
                      key={tool.name}
                      className="bg-white rounded-[10px] border border-ui-border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-semibold text-ui-text text-[16px]">
                            {tool.name}
                          </h3>
                          {tool.irish && (
                            <span className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                              Irish
                            </span>
                          )}
                          <span className="text-[11px] text-ui-muted font-mono">
                            {tool.price}
                          </span>
                        </div>
                        <p className="text-ui-muted text-sm mb-2">
                          {tool.oneLiner}
                        </p>
                        <Link
                          href={tool.articleSlug}
                          className="text-brand-green text-sm font-semibold hover:underline"
                        >
                          Our take: {tool.articleLabel} →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="max-w-reading mx-auto mt-14 pt-8 border-t border-ui-border text-center">
          <p className="text-ui-muted text-sm mb-1">
            Missing a tool? Think we should review something?
          </p>
          <p className="text-ui-muted text-sm">
            Email us at{' '}
            <a href="mailto:hello@farmai.ie" className="text-brand-green hover:underline">
              hello@farmai.ie
            </a>
            {' '}and we&apos;ll take a look.
          </p>
        </div>
      </section>
    </main>
  );
}
