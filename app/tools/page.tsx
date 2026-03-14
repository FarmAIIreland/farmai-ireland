import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Tools — FarmAI Ireland',
  description: 'A directory of AI and digital tools relevant to Irish farmers — coming soon.',
};

const COMING_SOON = [
  {
    name:        'Tool finder',
    description: 'Filter by farm type, task, and budget. Find the tools that make sense for your operation.',
  },
  {
    name:        'Prompt library',
    description: 'Copy-paste ChatGPT prompts organised by task — grants, livestock, planning, and more.',
  },
  {
    name:        'App reviews',
    description: 'Hands-on reviews of farm apps available in Ireland, written for farmers not tech reviewers.',
  },
];

export default function ToolsPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <div className="max-w-site mx-auto">

        <div className="max-w-reading mx-auto mb-12 text-center">
          <span className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green">
            Coming soon
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ui-text mb-4 leading-snug">
            Tools for Irish farmers
          </h1>
          <p className="text-ui-muted text-lg leading-relaxed">
            A practical directory of AI and digital tools tested for Irish farming conditions.
            No vendor sponsorship. No hype. Just what works.
          </p>
        </div>

        {/* Coming soon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 max-w-site mx-auto">
          {COMING_SOON.map(item => (
            <div
              key={item.name}
              className="bg-white rounded-[16px] border border-ui-border p-6"
            >
              <h2 className="font-semibold text-ui-text mb-2">{item.name}</h2>
              <p className="text-sm text-ui-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* While you wait */}
        <div className="max-w-reading mx-auto text-center">
          <p className="text-ui-muted mb-6">
            While the tools section is being built, the guides section has practical walkthroughs
            of the most useful tools available now.
          </p>
          <Link
            href="/guides"
            className="inline-block bg-brand-green text-white font-semibold px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors text-sm"
          >
            Browse the guides
          </Link>
        </div>

      </div>
    </main>
  );
}
