export function NewsletterStrip() {
  return (
    <section className="bg-brand-dark text-white py-12 px-4">
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

        {/* Mailchimp form */}
        <form
          action="https://farmai.us8.list-manage.com/subscribe/post?u=1f348941acbc5a0faa981e4f0&id=2757c8b36c&f_id=000d36e3f0"
          method="post"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          {/* Honeypot — must be empty on real submissions */}
          <input
            type="text"
            name="b_1f348941acbc5a0faa981e4f0_2757c8b36c"
            tabIndex={-1}
            defaultValue=""
            aria-hidden="true"
            style={{ position: 'absolute', left: '-5000px' }}
          />

          <input
            type="email"
            name="EMAIL"
            required
            placeholder="your@email.com"
            autoComplete="email"
            className="flex-1 px-4 py-3 text-sm rounded-button bg-[#0a3d2e] border border-[#1D9E75] text-white placeholder:text-[#5DCAA5] focus:outline-none focus:border-[#5DCAA5] transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-3 text-sm font-semibold bg-brand-green text-white rounded-button hover:bg-opacity-90 transition-colors flex-shrink-0"
          >
            Sign me up
          </button>
        </form>

        {/* Reassurance */}
        <p className="mt-3 text-xs text-[#5DCAA5]">
          No spam. One email a month. Unsubscribe any time.
        </p>

      </div>
    </section>
  );
}
