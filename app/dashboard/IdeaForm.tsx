'use client';

import { useState } from 'react';

export default function IdeaForm() {
  const [idea, setIdea]       = useState('');
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (idea.trim().length < 5) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/submit-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      if (res.ok) {
        setStatus('sent');
        setIdea('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={idea}
        onChange={e => setIdea(e.target.value)}
        placeholder="e.g. TAMS 4 deadline changes"
        className="flex-1 text-sm border border-ui-border rounded-button px-3 py-1.5 focus:outline-none focus:border-brand-green"
        disabled={status === 'sending'}
      />
      <button
        type="submit"
        disabled={status === 'sending' || idea.trim().length < 5}
        className="text-sm font-semibold px-3 py-1.5 rounded-button bg-ui-text text-white hover:bg-gray-800 disabled:opacity-40 transition-colors whitespace-nowrap"
      >
        {status === 'sending' ? '...' : status === 'sent' ? 'Saved' : 'Add'}
      </button>
      {status === 'error' && (
        <span className="text-xs text-red-500 self-center">Failed</span>
      )}
    </form>
  );
}
