'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import siteConfig from '@/config/site.json';

type FlipPhase = 'idle' | 'exit' | 'enter';

const FLIP_MS = 210;
const HOLD_MS = 2500;

export function HeroSection() {
  const phrases: string[] = siteConfig.hero.phrases;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<FlipPhase>('idle');

  useEffect(() => {
    const cycle = () => {
      setPhase('exit');
      setTimeout(() => {
        setIndex(i => (i + 1) % phrases.length);
        setPhase('enter');
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

  const applyTransition = phase !== 'enter';
  const easing          = phase === 'exit' ? 'ease-in' : 'ease-out';
  const transform =
    phase === 'exit'  ? 'rotateX(90deg)'  :
    phase === 'enter' ? 'rotateX(-90deg)' :
                        'rotateX(0deg)';

  return (
    <section
      className="relative w-full overflow-hidden h-[40vh] sm:h-[50vh]"
      style={{
        background: 'linear-gradient(135deg, #062A1E 0%, #0B4D3B 40%, #0A3D2E 70%, #041F16 100%)',
      }}
    >
      {/* Subtle geometric pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="60" stroke="#1D9E75" strokeWidth="0.5" />
            <line x1="60" y1="0" x2="0" y2="60" stroke="#1D9E75" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Radial glow behind text */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(29,158,117,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-5">
        <div className="text-center max-w-4xl w-full">

          {/* Badge */}
          <span className="inline-block mb-3 px-3 py-1 text-xs sm:text-[13px] font-semibold uppercase tracking-wider sm:tracking-widest rounded-full bg-brand-green/25 border border-brand-green/50 text-[#5DCAA5]">
            Built for Irish farmers
          </span>

          {/* Line 1 — static, subordinate */}
          <p className="text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight mb-1 tracking-tight">
            {siteConfig.hero.line1}
          </p>

          {/* Line 2 — departures board flip, dominant */}
          {/* Fixed height prevents CTA buttons from bouncing when phrase length varies */}
          <div
            className="overflow-hidden"
            style={{ perspective: '700px', height: 'clamp(3.5rem, 11vw, 9rem)' }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              className="font-bold leading-none inline-block whitespace-nowrap"
              style={{
                fontSize:        'clamp(3.5rem, 11vw, 9rem)',
                color:           '#1D9E75',
                transform,
                transformOrigin: 'center center',
                transition:      applyTransition
                  ? `transform ${FLIP_MS}ms ${easing}`
                  : 'none',
                willChange: 'transform',
              }}
            >
              {phrases[index]}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5 sm:mt-6">
            <Link
              href="/read"
              className="inline-block bg-brand-green text-white font-semibold px-6 sm:px-7 py-3 rounded-button hover:bg-opacity-90 transition-colors text-sm"
            >
              Browse articles
            </Link>
            <Link
              href="/guides"
              className="inline-block border-2 border-white/75 text-white font-semibold px-6 sm:px-7 py-3 rounded-button hover:bg-white/10 transition-colors text-sm"
            >
              Start here if you&apos;re new
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
