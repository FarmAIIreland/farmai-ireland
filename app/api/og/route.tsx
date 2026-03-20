import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Pillar visual config — mirrors PillarIllustration.tsx
const PILLAR_CONFIG: Record<string, {
  bg: string;
  accent: string;
  accentLight: string;
  tag: string;
  icon: string;
}> = {
  'save-time': {
    bg: '#0B4D3B',
    accent: '#1D9E75',
    accentLight: '#2CC98F',
    tag: 'TIME SAVER',
    icon: '⏱',
  },
  'tools-explained': {
    bg: '#0A3D5C',
    accent: '#1D9E75',
    accentLight: '#4DB89A',
    tag: 'TOOLS EXPLAINED',
    icon: '🔧',
  },
  'whats-changing': {
    bg: '#1A3A2F',
    accent: '#1D9E75',
    accentLight: '#5EC4A0',
    tag: "WHAT'S CHANGING",
    icon: '📡',
  },
  'does-this-work': {
    bg: '#4A1515',
    accent: '#E24B4A',
    accentLight: '#F07070',
    tag: 'HONEST REVIEW',
    icon: '🧪',
  },
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
          backgroundColor: config.bg,
          fontFamily: 'Georgia, serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '6px', backgroundColor: config.accent, width: '100%', flexShrink: 0 }} />

        {/* Background geometric pattern (simplified for @vercel/og) */}
        {/* Diagonal lines */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '100px',
            width: '3px',
            height: '900px',
            backgroundColor: config.accentLight,
            opacity: 0.08,
            transform: 'rotate(25deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '250px',
            width: '2px',
            height: '900px',
            backgroundColor: config.accentLight,
            opacity: 0.06,
            transform: 'rotate(25deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '400px',
            width: '2px',
            height: '900px',
            backgroundColor: config.accentLight,
            opacity: 0.05,
            transform: 'rotate(25deg)',
          }}
        />

        {/* Large circle accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            border: `3px solid ${config.accentLight}`,
            opacity: 0.08,
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '56px 72px 48px 72px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top row: pillar tag + icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.15em',
                  color: config.accentLight,
                  fontWeight: 700,
                  opacity: 0.9,
                }}
              >
                {config.tag}
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  color: config.accentLight,
                  opacity: 0.5,
                }}
              >
                {readTime} min read
              </div>
            </div>
            <div style={{ fontSize: '36px', opacity: 0.4 }}>
              {config.icon}
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
                fontSize: title.length > 60 ? '46px' : title.length > 40 ? '54px' : '62px',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '950px',
                opacity: 0.95,
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
              borderTop: `2px solid ${config.accentLight}20`,
              paddingTop: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Green square logo mark */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: config.accent,
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
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                  opacity: 0.9,
                }}
              >
                FarmAI Ireland
              </div>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: config.accentLight,
                fontFamily: 'monospace',
                opacity: 0.5,
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
