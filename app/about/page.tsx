import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'About FarmAI Ireland',
  description: 'FarmAI Ireland is an independent platform providing plain-English AI guides for Irish farmers. Not affiliated with Teagasc or any government body.',
};

export default function AboutPage() {
  return (
    <main className="bg-ui-bg min-h-screen">

      {/* Section 1 — One-liner + founding story */}
      <section className="py-14 sm:py-16 px-4 border-b border-ui-border bg-white">
        <div className="max-w-reading mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-4">About</p>
          <h1
            className="font-serif font-semibold text-ui-text mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Plain English. Cited sources. Always free.
          </h1>
          <div className="space-y-4 text-ui-muted text-base leading-relaxed">
            <p>
              FarmAI Ireland wasn&apos;t built by a farmer. It was built by someone who lives in rural Ireland,
              has deep respect for farming communities, and got genuinely frustrated watching AI move faster
              than the people who need it most could keep up with.
            </p>
            <p>
              We&apos;re not tilling fields. We&apos;re not calving heifers at 3am. But we are paying attention — to
              what AI can actually do, what it costs, what works on a real Irish farm and what doesn&apos;t.
              And we&apos;re translating that into plain English so you don&apos;t have to.
            </p>
            <p>
              Our presenter is an AI avatar. That&apos;s deliberate. We&apos;re a platform about AI, built using AI,
              explaining AI. We&apos;re not hiding that — we think it&apos;s kind of the point.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — How it works (pipeline diagram) */}
      <section className="py-14 sm:py-16 px-4 border-b border-ui-border">
        <div className="max-w-site mx-auto">
          <h2
            className="font-semibold text-ui-text mb-10 text-center"
            style={{ fontSize: '26px', letterSpacing: '-0.01em' }}
          >
            How it works
          </h2>

          {/* Pipeline strip — horizontal desktop, vertical mobile */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-0">
            {[
              { label: 'Irish farming challenge', sub: 'Grant rules changed. New tech arrived. Farmers are busy.' },
              { label: 'FarmAI reads everything', sub: 'Teagasc, gov.ie, ICBF, Bord Bia — all of it.' },
              { label: 'Filters the noise',       sub: 'What matters for Irish farms. What doesn\'t.' },
              { label: 'Plain English for you',   sub: 'Cited, honest, actionable. No hype.' },
            ].map((step, i, arr) => (
              <div key={i} className="flex flex-col lg:flex-row items-center">
                {/* Step box */}
                <div
                  className="bg-white rounded-[12px] border border-ui-border p-5 text-center"
                  style={{ minWidth: '200px', maxWidth: '220px' }}
                >
                  <p
                    className="font-semibold text-ui-text text-sm mb-1"
                    style={{ fontFamily: 'monospace', letterSpacing: '0.03em' }}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-ui-muted leading-relaxed">{step.sub}</p>
                </div>
                {/* Connector arrow — hidden after last item */}
                {i < arr.length - 1 && (
                  <>
                    {/* Desktop: right arrow */}
                    <div className="hidden lg:flex items-center px-2">
                      <div style={{ width: '32px', height: '2px', background: '#1D9E75' }} />
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="#1D9E75">
                        <path d="M0 0 L10 5 L0 10 Z" />
                      </svg>
                    </div>
                    {/* Mobile: down arrow */}
                    <div className="flex lg:hidden flex-col items-center py-2">
                      <div style={{ width: '2px', height: '24px', background: '#1D9E75' }} />
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="#1D9E75">
                        <path d="M0 0 L10 0 L5 10 Z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — What we are / what we're not */}
      <section className="py-14 sm:py-16 px-4 border-b border-ui-border bg-white">
        <div className="max-w-site mx-auto">
          <h2
            className="font-semibold text-ui-text mb-8 text-center"
            style={{ fontSize: '26px', letterSpacing: '-0.01em' }}
          >
            What we are — and what we&apos;re not
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* What we are */}
            <div className="rounded-[12px] border-2 border-brand-green bg-white p-6">
              <h3 className="font-semibold text-ui-text mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold">✓</span>
                What we are
              </h3>
              <ul className="space-y-3 text-sm text-ui-muted">
                <li className="flex gap-2"><span className="text-brand-green mt-0.5">→</span>Honest advocates for Irish farmers in a period of rapid change</li>
                <li className="flex gap-2"><span className="text-brand-green mt-0.5">→</span>Curious — we test tools, share what worked and what didn&apos;t</li>
                <li className="flex gap-2"><span className="text-brand-green mt-0.5">→</span>Grounded in Teagasc, gov.ie, and verifiable Irish farming data</li>
                <li className="flex gap-2"><span className="text-brand-green mt-0.5">→</span>Useful — every piece ends with a clear action you can take</li>
              </ul>
            </div>

            {/* What we're not */}
            <div className="rounded-[12px] border border-ui-border bg-ui-bg p-6">
              <h3 className="font-semibold text-ui-text mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-ui-border flex items-center justify-center text-ui-muted text-xs font-bold">✕</span>
                What we&apos;re not
              </h3>
              <ul className="space-y-3 text-sm text-ui-muted">
                <li className="flex gap-2"><span className="mt-0.5">→</span>Not affiliated with Teagasc, DAFM, or any government body</li>
                <li className="flex gap-2"><span className="mt-0.5">→</span>Not a product review site paid to recommend tools</li>
                <li className="flex gap-2"><span className="mt-0.5">→</span>Not farmers — advocates. There&apos;s a difference and we own it</li>
                <li className="flex gap-2"><span className="mt-0.5">→</span>Not here to tell you AI will save your farm — that&apos;s your call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 px-4">
        <div className="max-w-reading mx-auto text-center">
          <p className="font-semibold text-ui-text text-lg mb-2">Plain English. Cited sources. Always free.</p>
          <p className="text-ui-muted mb-6">Something wrong? Something we missed? A question worth answering publicly?</p>
          <Link
            href="/contact"
            className="inline-block bg-brand-green text-white font-semibold px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors"
          >
            Send us a message
          </Link>
          <p className="text-ui-muted text-sm mt-4">
            Or email directly:{' '}
            <a href="mailto:hello@farmai.ie" className="text-brand-green hover:underline">
              hello@farmai.ie
            </a>
          </p>
        </div>
      </section>

    </main>
  );
}
