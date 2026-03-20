'use client';

import { useState } from 'react';

interface Draft {
  slug:    string;
  title:   string;
  pillar:  string;
  date:    string;
  excerpt: string;
}

const PILLAR_LABELS: Record<string, string> = {
  'save-time':        'TIME SAVER',
  'tools-explained':  'TOOLS EXPLAINED',
  'whats-changing':   "WHAT'S CHANGING",
  'does-this-work':   'HONEST REVIEW',
};

const PILLAR_COLORS: Record<string, string> = {
  'save-time':        'bg-emerald-100 text-emerald-800',
  'tools-explained':  'bg-blue-100 text-blue-800',
  'whats-changing':   'bg-amber-100 text-amber-800',
  'does-this-work':   'bg-red-100 text-red-800',
};

export default function DraftReview({ drafts: initial }: { drafts: Draft[] }) {
  const [drafts, setDrafts]       = useState(initial);
  const [reviews, setReviews]     = useState<Record<string, string>>({});
  const [verdicts, setVerdicts]   = useState<Record<string, string>>({});
  const [loading, setLoading]     = useState<Record<string, boolean>>({});
  const [published, setPublished] = useState<Record<string, string>>({});

  async function handleReview(slug: string) {
    setLoading(prev => ({ ...prev, [slug]: true }));
    try {
      const res  = await fetch('/api/review-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:   JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (data.review) {
        setReviews(prev  => ({ ...prev, [slug]: data.review }));
        setVerdicts(prev => ({ ...prev, [slug]: data.verdict }));
      }
    } catch (err) {
      console.error('Review failed:', err);
    } finally {
      setLoading(prev => ({ ...prev, [slug]: false }));
    }
  }

  async function handlePublish(slug: string, target: 'articles' | 'guides') {
    setLoading(prev => ({ ...prev, [slug]: true }));
    try {
      const res  = await fetch('/api/publish-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:   JSON.stringify({ slug, target }),
      });
      const data = await res.json();
      if (data.ok) {
        setPublished(prev => ({ ...prev, [slug]: data.url }));
        setDrafts(prev => prev.filter(d => d.slug !== slug));
      }
    } catch (err) {
      console.error('Publish failed:', err);
    } finally {
      setLoading(prev => ({ ...prev, [slug]: false }));
    }
  }

  if (drafts.length === 0 && Object.keys(published).length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold text-ui-text mb-2">No drafts waiting</p>
        <p className="text-ui-muted">
          The Sunday content pipeline will generate new drafts automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Published confirmation */}
      {Object.entries(published).map(([slug, url]) => (
        <div key={slug} className="rounded-[12px] border border-emerald-300 bg-emerald-50 p-6">
          <p className="text-emerald-800 font-semibold">
            Published: {slug}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-700 underline"
          >
            {url}
          </a>
          <p className="text-xs text-emerald-600 mt-1">
            Will go live after Vercel deploys (usually under 2 minutes).
          </p>
        </div>
      ))}

      {/* Draft cards */}
      {drafts.map((draft) => (
        <div
          key={draft.slug}
          className="rounded-[12px] border border-ui-border bg-white p-6 space-y-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${PILLAR_COLORS[draft.pillar] ?? 'bg-gray-100 text-gray-700'}`}>
                {PILLAR_LABELS[draft.pillar] ?? draft.pillar}
              </span>
              <h3 className="text-lg font-bold text-ui-text leading-snug">
                {draft.title || draft.slug}
              </h3>
              {draft.excerpt && (
                <p className="text-sm text-ui-muted mt-1">{draft.excerpt}</p>
              )}
            </div>
            <span className="text-xs text-ui-muted whitespace-nowrap">{draft.date}</span>
          </div>

          {/* Review section */}
          {reviews[draft.slug] ? (
            <div className="space-y-3">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                verdicts[draft.slug] === 'COMMIT'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {verdicts[draft.slug] === 'COMMIT' ? 'COMMIT — Ready to publish' : 'REVISE — Needs changes'}
              </div>
              <pre className="text-xs bg-gray-50 border border-ui-border rounded-lg p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                {reviews[draft.slug]}
              </pre>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {!reviews[draft.slug] && (
              <button
                onClick={() => handleReview(draft.slug)}
                disabled={loading[draft.slug]}
                className="px-4 py-2 text-sm font-semibold rounded-button bg-ui-text text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-wait transition-colors"
              >
                {loading[draft.slug] ? 'Reviewing...' : 'Run 4-Persona Review'}
              </button>
            )}

            {verdicts[draft.slug] === 'COMMIT' && (
              <>
                <button
                  onClick={() => handlePublish(draft.slug, 'articles')}
                  disabled={loading[draft.slug]}
                  className="px-4 py-2 text-sm font-semibold rounded-button bg-brand-green text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-wait transition-colors"
                >
                  {loading[draft.slug] ? 'Publishing...' : 'Publish as Article'}
                </button>
                <button
                  onClick={() => handlePublish(draft.slug, 'guides')}
                  disabled={loading[draft.slug]}
                  className="px-4 py-2 text-sm font-semibold rounded-button border border-brand-green text-brand-green hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-wait transition-colors"
                >
                  Publish as Guide
                </button>
              </>
            )}

            {verdicts[draft.slug] === 'REVISE' && (
              <button
                onClick={() => {
                  setReviews(prev => { const n = { ...prev }; delete n[draft.slug]; return n; });
                  setVerdicts(prev => { const n = { ...prev }; delete n[draft.slug]; return n; });
                }}
                className="px-4 py-2 text-sm font-semibold rounded-button border border-ui-border text-ui-muted hover:bg-gray-50 transition-colors"
              >
                Re-run Review
              </button>
            )}

            <a
              href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_REPO ?? 'FarmAIIreland/farmai-ireland'}/blob/master/content/drafts/${draft.slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold rounded-button border border-ui-border text-ui-muted hover:bg-gray-50 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
