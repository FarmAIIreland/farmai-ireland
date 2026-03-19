import Link from 'next/link';
import { PillarIllustration } from './PillarIllustration';

// Pillar colour map (used for text/badge styling below the illustration)
function getPillarStyle(pillar: string): { bar: string; tagBg: string; tagText: string } {
  if (pillar === 'does-this-work') {
    return { bar: '#E24B4A', tagBg: '#FDEAEA', tagText: '#7A1010' };
  }
  // All green pillars
  return { bar: '#1D9E75', tagBg: '#E8F5EF', tagText: '#0A5C3F' };
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
      {/* Illustrated pillar header — replaces old stock photos */}
      <PillarIllustration pillar={pillar} title={title} variant="card" />

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
