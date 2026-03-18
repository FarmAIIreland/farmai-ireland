import Link  from 'next/link';

// Pillar colour map
function getPillarStyle(pillar: string): { bar: string; tagBg: string; tagText: string; headerBg: string } {
  if (pillar === 'does-this-work') {
    return { bar: '#E24B4A', tagBg: '#FDEAEA', tagText: '#7A1010', headerBg: '#FEF0F0' };
  }
  if (pillar === 'whats-changing') {
    return { bar: '#1D9E75', tagBg: '#E8F5EF', tagText: '#0A5C3F', headerBg: '#EEF7F3' };
  }
  if (pillar === 'save-time') {
    return { bar: '#1D9E75', tagBg: '#E8F5EF', tagText: '#0A5C3F', headerBg: '#F0F6F3' };
  }
  // tools-explained + fallbacks
  return { bar: '#1D9E75', tagBg: '#E8F5EF', tagText: '#0A5C3F', headerBg: '#F2F7F5' };
}

// Monospace tag label from pillar slug
function getPillarTag(pillar: string): string {
  const map: Record<string, string> = {
    'save-time':        'TIME SAVER',
    'tools-explained':  'TOOLS EXPLAINED',
    'whats-changing':   "WHAT'S CHANGING",
    'does-this-work':   'HONEST REVIEW',
    // Legacy fallbacks
    'grants-subsidies': 'TIME SAVER',
    'getting-started':  'TOOLS EXPLAINED',
    'livestock':        'HONEST REVIEW',
    'dairy':            'TOOLS EXPLAINED',
    'beef-sheep':       'HONEST REVIEW',
    'tillage':          'TOOLS EXPLAINED',
    'machinery':        'HONEST REVIEW',
    'tech':             'TOOLS EXPLAINED',
    'policy':           "WHAT'S CHANGING",
  };
  return map[pillar] ?? pillar.replace(/-/g, ' ').toUpperCase();
}

interface ArticleCardProps {
  title:     string;
  slug:      string;
  pillar:    string;
  date?:     string;
  readTime:  number;
  excerpt?:  string;
  payoff?:   string;
  verdict?:  'pass' | 'fail' | 'mixed';
  basePath?: 'read' | 'guides';
}

export function ArticleCard({
  title,
  slug,
  pillar,
  readTime,
  excerpt,
  payoff,
  verdict,
  basePath = 'read',
}: ArticleCardProps) {
  const href  = `/${basePath}/${slug}`;
  const style = getPillarStyle(pillar);
  const tag   = getPillarTag(pillar);

  // Payoff line: prefer payoff, fall back to excerpt truncated at 100 chars
  const payoffText = payoff
    ? payoff
    : excerpt
      ? (excerpt.length > 100 ? excerpt.slice(0, 97) + '…' : excerpt)
      : null;

  const verdictConfig = verdict ? {
    pass:  { label: '✓ works',    bg: '#E8F5EF', text: '#0A5C3F' },
    fail:  { label: '✗ skip it',  bg: '#FDEAEA', text: '#7A1010' },
    mixed: { label: '~ mixed bag', bg: '#FEF3DC', text: '#7A4F00' },
  }[verdict] : null;

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white overflow-hidden rounded-[12px] border border-ui-border shadow-sm hover:-translate-y-[3px] hover:border-[#D1D5DB] hover:shadow-md transition-all duration-200"
    >
      {/* Branded pillar header — replaces stock photos */}
      <div
        style={{
          height: '72px',
          background: `linear-gradient(135deg, ${style.headerBg} 0%, #F7F5F0 100%)`,
          borderBottom: `3px solid ${style.bar}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle diagonal accent */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-20px',
            width: '120px',
            height: '120px',
            backgroundColor: style.bar,
            opacity: 0.06,
            borderRadius: '50%',
          }}
        />
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: style.tagText,
            fontWeight: 700,
            position: 'relative',
          }}
        >
          {tag}
        </span>
        {/* Green F logo mark */}
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: style.bar,
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            opacity: 0.7,
            position: 'relative',
          }}
        >
          F
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">

        {/* Title */}
        <h3
          style={{
            fontSize:      '17px',
            fontWeight:    500,
            lineHeight:    1.25,
            letterSpacing: '-0.01em',
            color:         '#1A1A1A',
            marginBottom:  payoffText ? '8px' : '12px',
          }}
          className="group-hover:text-brand-green transition-colors"
        >
          {title}
        </h3>

        {/* Italic payoff line */}
        {payoffText && (
          <p
            style={{
              fontSize:     '13px',
              fontStyle:    'italic',
              color:        '#6B7280',
              borderLeft:   `2px solid ${style.bar}`,
              paddingLeft:  '10px',
              marginBottom: '12px',
              flex:         1,
            }}
          >
            {payoffText}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-ui-border">
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#6B7280' }}>
            {readTime} min read
          </span>
          <div className="flex items-center gap-2">
            {verdictConfig && (
              <span
                style={{
                  fontSize:      '11px',
                  fontWeight:    600,
                  background:    verdictConfig.bg,
                  color:         verdictConfig.text,
                  padding:       '2px 7px',
                  borderRadius:  '4px',
                }}
              >
                {verdictConfig.label}
              </span>
            )}
            <svg
              className="w-4 h-4 text-brand-green group-hover:translate-x-1 transition-transform"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
