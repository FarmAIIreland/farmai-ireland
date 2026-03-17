'use client';
import { useState } from 'react';

interface Props {
  /** 'dark' = used on dark backgrounds (strip, footer). 'light' = light backgrounds */
  variant?: 'dark' | 'light';
}

export function NewsletterForm({ variant = 'dark' }: Props) {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isDark = variant === 'dark';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className={`text-sm font-medium ${isDark ? 'text-[#5DCAA5]' : 'text-brand-green'}`}>
        You&apos;re in. One email a month, that&apos;s it.
      </p>
    );
  }

  if (status === 'error') {
    return (
      <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
        Something went wrong. Try again or email{' '}
        <a href="mailto:hello@farmai.ie" className="underline">hello@farmai.ie</a>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        autoComplete="email"
        className={`flex-1 min-w-0 px-4 py-3 text-sm rounded-button focus:outline-none transition-colors ${
          isDark
            ? 'bg-[#0a3d2e] border border-[#1D9E75] text-white placeholder:text-[#5DCAA5] focus:border-[#5DCAA5]'
            : 'bg-white border border-ui-border text-ui-text placeholder:text-ui-muted focus:border-brand-green'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-5 py-3 text-sm font-semibold bg-brand-green text-white rounded-button hover:bg-opacity-90 transition-colors flex-shrink-0 disabled:opacity-60"
      >
        {status === 'loading' ? 'Signing up…' : 'Sign me up'}
      </button>
    </form>
  );
}
