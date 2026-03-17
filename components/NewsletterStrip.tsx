import { NewsletterForm } from './NewsletterForm';

export function NewsletterStrip() {
  return (
    <section id="newsletter" className="bg-brand-dark text-white py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <p className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[#5DCAA5] mb-3 border-l-4 border-[#E8A020] pl-3">
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

        <div className="max-w-md mx-auto">
          <NewsletterForm variant="dark" />
        </div>

        {/* Reassurance */}
        <p className="mt-3 text-xs text-[#5DCAA5]">
          No spam. One email a month. Unsubscribe any time.
        </p>

      </div>
    </section>
  );
}
