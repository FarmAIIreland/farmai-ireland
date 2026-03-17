import type { Metadata } from 'next';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title:       'Tools — FarmAI Ireland',
  description: 'A directory of AI tools for Irish farmers — tested on real farms, explained in plain English. Coming soon.',
};

export default function ToolsPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-20 px-4">
      <div className="max-w-reading mx-auto text-center">

        <span className="inline-block mb-6 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green">
          Coming soon
        </span>

        <h1
          className="font-serif font-semibold text-ui-text mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          AI Tools for Irish Farmers
        </h1>

        <p className="text-ui-muted text-lg leading-relaxed mb-3">
          We&apos;re building a directory of AI tools — tested on real Irish farms, explained in plain English.
        </p>

        <p className="text-ui-muted mb-10">
          Coming soon. Sign up to FarmAI Monthly and you&apos;ll be the first to know when it launches.
        </p>

        <div className="max-w-md mx-auto">
          <NewsletterForm variant="light" />
        </div>

        <p className="mt-3 text-xs text-ui-muted">
          No spam. One email a month. Unsubscribe any time.
        </p>

      </div>
    </main>
  );
}
