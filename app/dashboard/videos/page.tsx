import Link from 'next/link';

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-ui-bg">
      {/* Header */}
      <div
        className="relative px-4 py-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #062A1E 0%, #0B4D3B 40%, #0A3D2E 70%, #041F16 100%)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-site mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              &larr; Dashboard
            </Link>
            <Link
              href="/api/dashboard-logout"
              className="text-sm text-white/70 hover:text-white border border-white/30 px-4 py-1.5 rounded-button transition-colors"
            >
              Sign out
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">Video Queue</h1>
          <p className="text-white/60 mt-2">
            Review and approve short-form video content before publishing.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 max-w-site mx-auto">
        <div className="rounded-[12px] border border-ui-border bg-white p-8 text-center">
          <div className="inline-block mb-4 text-4xl text-ui-muted">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-ui-text mb-2">Video content pipeline coming soon</h2>
          <p className="text-sm text-ui-muted max-w-md mx-auto mb-6">
            This section will let you review short-form video scripts and thumbnails,
            approve content for YouTube Shorts and social reels, and track what&apos;s
            been published.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
            <div className="rounded-[8px] border border-ui-border p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-1">Planned</p>
              <p className="text-sm font-medium text-ui-text">Script review & approval</p>
              <p className="text-xs text-ui-muted mt-1">AI-generated video scripts tied to published articles, reviewed before recording.</p>
            </div>
            <div className="rounded-[8px] border border-ui-border p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-1">Planned</p>
              <p className="text-sm font-medium text-ui-text">Thumbnail & title check</p>
              <p className="text-xs text-ui-muted mt-1">Preview thumbnails and titles before uploading to YouTube and social channels.</p>
            </div>
            <div className="rounded-[8px] border border-ui-border p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-ui-muted mb-1">Planned</p>
              <p className="text-sm font-medium text-ui-text">Publish tracking</p>
              <p className="text-xs text-ui-muted mt-1">Track which videos are live, pending, or rejected across YouTube, TikTok, and Instagram.</p>
            </div>
          </div>

          <p className="text-xs text-ui-muted mt-8">
            Video files will be stored in <code className="bg-ui-bg border border-ui-border rounded px-1">content/videos/</code> alongside article drafts.
          </p>
        </div>
      </div>
    </div>
  );
}
