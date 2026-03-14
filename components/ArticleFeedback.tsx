'use client';

import { useState } from 'react';

interface ArticleFeedbackProps {
  slug: string;
  page: string; // 'read' | 'guides'
}

type State = 'idle' | 'loading' | 'done' | 'error';

export function ArticleFeedback({ slug, page }: ArticleFeedbackProps) {
  const [state, setState] = useState<State>('idle');

  const submit = async (vote: 'up' | 'down') => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      const res = await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ slug, vote, page }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-ui-border">
      <p className="text-sm font-semibold text-ui-text mb-4">Was this useful?</p>

      {state === 'done' && (
        <p className="text-sm text-brand-green font-semibold">Thanks for the feedback.</p>
      )}

      {state === 'error' && (
        <p className="text-sm text-ui-muted">Something went wrong — please try again.</p>
      )}

      {(state === 'idle' || state === 'loading') && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => submit('up')}
            disabled={state === 'loading'}
            aria-label="Thumbs up — this was useful"
            className="flex items-center gap-2 px-4 py-2 rounded-button border border-ui-border text-sm text-ui-muted hover:border-brand-green hover:text-brand-green transition-colors disabled:opacity-50"
          >
            <span aria-hidden="true">👍</span>
            Yes
          </button>
          <button
            onClick={() => submit('down')}
            disabled={state === 'loading'}
            aria-label="Thumbs down — this was not useful"
            className="flex items-center gap-2 px-4 py-2 rounded-button border border-ui-border text-sm text-ui-muted hover:border-ui-text hover:text-ui-text transition-colors disabled:opacity-50"
          >
            <span aria-hidden="true">👎</span>
            Not really
          </button>
        </div>
      )}
    </div>
  );
}
