'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie-consent';

function loadGA(gaId: string) {
  if (typeof window === 'undefined' || !gaId) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  (window as unknown as Record<string, unknown>).dataLayer =
    (window as unknown as Record<string, unknown>).dataLayer || [];
  function gtag(...args: unknown[]) {
    ((window as unknown as Record<string, unknown>).dataLayer as unknown[]).push(args);
  }
  (window as unknown as Record<string, unknown>).gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId);
}

export function CookieBanner({ gaId }: { gaId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted') {
      loadGA(gaId);
    } else if (!stored) {
      setVisible(true);
    }
  }, [gaId]);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    loadGA(gaId);
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#F7F5F0] border-t border-[#D1CFC8] px-5 py-4 sm:py-5 shadow-lg"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-[#374151] leading-relaxed">
          We use cookies to understand how readers use the site — nothing tracked for advertising.{' '}
          <Link href="/legal/cookies" className="underline hover:text-[#1D9E75]">
            Cookie policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-[#374151] border border-[#B4B2A9] rounded-md hover:bg-[#EDEBE4] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium text-white bg-[#1D9E75] rounded-md hover:bg-[#188060] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
