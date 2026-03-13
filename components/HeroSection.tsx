import Image from 'next/image';
import Link from 'next/link';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80';

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-[#0a2018]"
      style={{ minHeight: 'calc(100svh - 64px)' }}
    >
      {/* Background image */}
      <Image
        src={PLACEHOLDER_IMAGE}
        alt="Irish farmland at sunrise"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark overlay — slightly lighter so image reads */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content — pushed toward upper-centre, not dead centre */}
      <div className="relative z-10 text-center text-white px-5 max-w-3xl mx-auto w-full"
        style={{ paddingTop: 'clamp(2rem, 6vh, 5rem)', paddingBottom: 'clamp(3rem, 8vh, 6rem)' }}
      >
        {/* Badge */}
        <span className="inline-block mb-4 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest rounded-full bg-brand-green/25 border border-brand-green/50 text-[#5DCAA5]">
          Built for Irish farmers
        </span>

        {/* H1 — Lora serif */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.2] mb-4 text-balance">
          AI knowledge that actually makes sense on the farm
        </h1>

        {/* Subheadline — Inter, stays as body */}
        <p className="font-sans text-base sm:text-lg text-white/80 mb-7 max-w-xl mx-auto leading-relaxed">
          Plain English guides, practical tools, and honest advice — helping Irish farmers get to grips with AI without the hype.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/read"
            className="inline-block bg-brand-green text-white font-semibold px-7 py-3 rounded-button hover:bg-opacity-90 transition-colors text-sm"
          >
            Browse articles
          </Link>
          <Link
            href="/guides"
            className="inline-block border border-white/60 text-white font-semibold px-7 py-3 rounded-button hover:bg-white/10 transition-colors text-sm"
          >
            Start here if you&apos;re new
          </Link>
        </div>
      </div>
    </section>
  );
}
