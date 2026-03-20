import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Pillar visual config
const PILLAR_CONFIG: Record<string, {
  bg: string;
  accent: string;
  accentLight: string;
  tag: string;
}> = {
  'save-time': {
    bg: '#0B4D3B',
    accent: '#1D9E75',
    accentLight: '#2CC98F',
    tag: 'TIME SAVER',
  },
  'tools-explained': {
    bg: '#0A3D5C',
    accent: '#1D9E75',
    accentLight: '#4DB89A',
    tag: 'TOOLS EXPLAINED',
  },
  'whats-changing': {
    bg: '#1A3A2F',
    accent: '#1D9E75',
    accentLight: '#5EC4A0',
    tag: "WHAT'S CHANGING",
  },
  'does-this-work': {
    bg: '#4A1515',
    accent: '#E24B4A',
    accentLight: '#F07070',
    tag: 'HONEST REVIEW',
  },
};

export async function GET(req: NextRequest) {
  try {
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
          }}
        >
          {/* Top accent bar */}
          <div style={{ height: '6px', backgroundColor: config.accent, width: '100%', display: 'flex' }} />

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
            {/* Top row: pillar tag + read time */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: '16px',
                    fontFamily: 'monospace',
                    letterSpacing: '0.15em',
                    color: config.accentLight,
                    fontWeight: 700,
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
                    marginLeft: '16px',
                  }}
                >
                  {readTime} min read
                </div>
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
                  fontSize: title.length > 60 ? 46 : title.length > 40 ? 54 : 62,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  maxWidth: '950px',
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
                borderTop: '2px solid rgba(255,255,255,0.1)',
                paddingTop: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    marginLeft: '12px',
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

          {/* Right-side accent strip */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '4px',
              height: '630px',
              backgroundColor: config.accent,
              opacity: 0.3,
              display: 'flex',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    // Fallback: return a simple branded image on any error
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A3D5C',
            fontFamily: 'Georgia, serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#1D9E75',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '36px',
                fontWeight: 700,
                marginBottom: '24px',
              }}
            >
              F
            </div>
            <div style={{ fontSize: '48px', color: 'white', fontWeight: 600 }}>
              FarmAI Ireland
            </div>
            <div style={{ fontSize: '22px', color: '#4DB89A', marginTop: '12px' }}>
              AI for Irish Farmers
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }
}
