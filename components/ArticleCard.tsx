import Link  from 'next/link';
import Image from 'next/image';

// Pillar colour map
function getPillarStyle(pillar: string): { bar: string; tagBg: string; tagText: string } {
  if (pillar === 'grants-subsidies') {
    return { bar: '#E8A020', tagBg: '#FEF3DC', tagText: '#7A4F00' };
  }
  if (pillar === 'does-this-work') {
    return { bar: '#E24B4A', tagBg: '#FDEAEA', tagText: '#7A1010' };
  }
  return { bar: '#1D9E75', tagBg: '#E8F5EF', tagText: '#0A5C3F' };
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
  image?:    string;
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
  image,
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
      {/* 3px pillar colour bar */}
      <div style={{ height: '3px', background: style.bar, flexShrink: 0 }} />

      {/* Optional image / pillar-colour header */}
      {image ? (
        <div className="relative w-full" style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-col flex-1 p-5">

        {/* Monospace tag */}
        <span
          style={{
            fontFamily:    'monospace',
            fontSize:      '10px',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            background:    style.tagBg,
            color:         style.tagText,
            display:       'inline-block',
            padding:       '2px 7px',
            borderRadius:  '4px',
            marginBottom:  '10px',
            alignSelf:     'flex-start',
          }}
        >
          {tag}
        </span>

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
