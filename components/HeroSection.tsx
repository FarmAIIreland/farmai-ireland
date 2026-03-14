'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import siteConfig from '@/config/site.json';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80';

type FlipPhase = 'idle' | 'exit' | 'enter';

const FLIP_MS  = 210;   // duration of each half-flip
const HOLD_MS  = 2500;  // how long each phrase is shown

export function HeroSection() {
  const phrases: string[] = siteConfig.hero.phrases;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<FlipPhase>('idle');

  useEffect(() => {
    const cycle = () => {
      // Phase 1: flip current phrase away (0deg → 90deg)
      setPhase('exit');

      setTimeout(() => {
        // Phase 2: advance to next phrase and snap to enter position (no transition)
        setIndex(i => (i + 1) % phrases.length);
        setPhase('enter');

        // Phase 3: after the browser paints the enter position, animate in (-90deg → 0deg)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase('idle');
          });
        });
      }, FLIP_MS);
    };

    const id = setInterval(cycle, HOLD_MS);
    return () => clearInterval(id);
  }, [phrases.length]);

  // Only apply a CSS transition when we are actually animating (exit or idle-after-enter).
  // During 'enter' we snap instantly to the start position — no transition.
  const applyTransition = phase !== 'enter';
  const easing          = phase === 'exit' ? 'ease-in' : 'ease-out';

  const transform =
    phase === 'exit'  ? 'rotateX(90deg)'  :
    phase === 'enter' ? 'rotateX(-90deg)' :
                        'rotateX(0deg)';

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden bg-[#0a2018]"
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-5 max-w-3xl mx-auto w-full"
        style={{
          paddingTop:    'clamp(2rem, 6vh, 5rem)',
          paddingBottom: 'clamp(3rem, 8vh, 6rem)',
        }}
      >
        {/* Badge */}
        <span className="inline-block mb-6 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest rounded-full bg-brand-green/25 border border-brand-green/50 text-[#5DCAA5]">
          Built for Irish farmers
        </span>

        {/* Line 1 — static */}
        <p className="text-white font-bold text-4xl md:text-6xl leading-tight mb-2 tracking-tight">
          {siteConfig.hero.line1}
        </p>

        {/* Line 2 — departures board flip */}
        <div
          className="overflow-hidden"
          style={{ perspective: '700px' }}
          aria-live="polite"
          aria-atomic="true"
        >
          <p
            className="font-black text-5xl md:text-7xl leading-tight inline-block"
            style={{
              color:            '#1D9E75',
              transform,
              transformOrigin:  'center center',
              transition:       applyTransition
                ? `transform ${FLIP_MS}ms ${easing}`
                : 'none',
              willChange:       'transform',
            }}
          >
            {phrases[index]}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
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
