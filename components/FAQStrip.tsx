'use client';
import { useState } from 'react';
import siteConfig from '@/config/site.json';

export function FAQStrip() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = siteConfig.content.faq;

  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-reading mx-auto">

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ui-text mb-2">Common questions</h2>
          <p className="text-ui-muted text-sm">Things farmers ask us most</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-ui-border rounded-[12px] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ui-bg transition-colors"
              >
                <span className="font-medium text-ui-text text-sm sm:text-base">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-ui-muted flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-ui-muted leading-relaxed border-t border-ui-border pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(f => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
