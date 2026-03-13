'use client';
import { useState } from 'react';

export function NewsletterStrip() {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to Mailchimp
    setSubmitted(true);
  };

  return (
    <section className="bg-brand-dark text-white py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5DCAA5] mb-3">
          FarmAI Monthly
        </p>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
          Join Irish farmers staying one step ahead
        </h2>

        {/* Subheadline */}
        <p className="text-[#9FE1CB] mb-6 text-sm sm:text-base">
          Real AI advice for Irish farms, delivered once a month — straight from the field
        </p>

        {/* Form */}
        {submitted ? (
          <p className="text-[#5DCAA5] font-semibold py-3">
            ✓ You&apos;re in. See you next month.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm rounded-button bg-[#0a3d2e] border border-[#1D9E75] text-white placeholder:text-[#5DCAA5] focus:outline-none focus:border-[#5DCAA5] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 text-sm font-semibold bg-brand-green text-white rounded-button hover:bg-opacity-90 transition-colors flex-shrink-0"
            >
              Sign me up
            </button>
          </form>
        )}

        {/* Reassurance */}
        <p className="mt-3 text-xs text-[#5DCAA5]">
          No spam. Unsubscribe any time. One email a month, that&apos;s it.
        </p>
      </div>
    </section>
  );
}
