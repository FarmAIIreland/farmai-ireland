import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Pillar colour and tag mapping — mirrors ArticleCard.tsx
const PILLAR_CONFIG: Record<string, { bar: string; tag: string; bg: string }> = {
  'save-time':       { bar: '#1D9E75', tag: 'TIME SAVER',      bg: '#E8F5EF' },
  'tools-explained': { bar: '#1D9E75', tag: 'TOOLS EXPLAINED', bg: '#E8F5EF' },
  'whats-changing':  { bar: '#1D9E75', tag: "WHAT'S CHANGING",  bg: '#E8F5EF' },
  'does-this-work':  { bar: '#E24B4A', tag: 'HONEST REVIEW',   bg: '#FDEAEA' },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title    = searchParams.get('title')    ?? 'FarmAI Ireland';
  const pillar   = searchParams.get('pillar')   ?? 'tools-explained';
  const readTime = searchParams.get('readTime') ?? '5';

  const config = PILLAR_CONFIG[pillar] ?? PILLAR_CONFIG['tools-explained'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F7F5F0',
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top pillar colour bar */}
        <div style={{ height: '8px', backgroundColor: config.bar, width: '100%', flexShrink: 0 }} />

        {/* Subtle diagonal accent */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-100px',
            width: '500px',
            height: '800px',
            backgroundColor: config.bar,
            opacity: 0.04,
            transform: 'rotate(15deg)',
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '60px 72px 48px 72px',
            justifyContent: 'space-between',
          }}
        >
          {/* Pillar tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'monospace',
                letterSpacing: '0.15em',
                backgroundColor: config.bg,
                color: config.bar,
                padding: '6px 16px',
                borderRadius: '6px',
                fontWeight: 700,
              }}
            >
              {config.tag}
            </div>
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'monospace',
                color: '#6B7280',
              }}
            >
              {readTime} min read
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? '48px' : title.length > 40 ? '56px' : '64px',
                fontWeight: 600,
                color: '#1A1A1A',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer — brand + divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid #E5E7EB',
              paddingTop: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Green square logo mark */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#1D9E75',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 700,
                }}
              >
                F
              </div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  letterSpacing: '-0.01em',
                }}
              >
                FarmAI Ireland
              </div>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: '#6B7280',
                fontFamily: 'monospace',
              }}
            >
              farmai.ie
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
