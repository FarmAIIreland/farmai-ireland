'use client';

/**
 * PillarIllustration — Economist-style editorial illustrations.
 *
 * Generates unique SVG-based visuals per pillar using geometric patterns,
 * bold colours, and brand typography. No stock photos, no external deps.
 *
 * Each pillar has a distinct visual identity:
 *   save-time       → diagonal speed lines + clock arc
 *   tools-explained → circuit grid + connection dots
 *   whats-changing  → wave/signal lines + radar sweep
 *   does-this-work  → bold crosshairs + test flask motif
 */

interface PillarIllustrationProps {
  pillar: string;
  title?: string;
  /** 'card' = compact for ArticleCard, 'hero' = full-width for article page */
  variant?: 'card' | 'hero';
  className?: string;
}

// Pillar visual config
const PILLAR_VISUALS: Record<string, {
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

function getVisuals(pillar: string) {
  return PILLAR_VISUALS[pillar] ?? PILLAR_VISUALS['tools-explained'];
}

// Generate a seeded pseudo-random number from title string (for variety)
function seedFromTitle(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// --- SVG Patterns per Pillar ---

function SaveTimePattern({ seed }: { seed: number }) {
  const offset = seed % 40;
  return (
    <>
      {/* Diagonal speed lines */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line
          key={`speed-${i}`}
          x1={60 + i * 55 + offset}
          y1={0}
          x2={-20 + i * 55 + offset}
          y2={200}
          stroke="currentColor"
          strokeWidth={i % 2 === 0 ? 2 : 1}
          opacity={0.15 + (i % 3) * 0.05}
        />
      ))}
      {/* Clock arc */}
      <circle
        cx={280 + (seed % 30)}
        cy={80}
        r={50}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        opacity={0.2}
        strokeDasharray="80 240"
        strokeDashoffset={seed % 60}
      />
      <line
        x1={280 + (seed % 30)}
        y1={80}
        x2={280 + (seed % 30) + 25}
        y2={55}
        stroke="currentColor"
        strokeWidth={2}
        opacity={0.25}
        strokeLinecap="round"
      />
      {/* Small accent dots */}
      {[0, 1, 2].map(i => (
        <circle
          key={`dot-${i}`}
          cx={100 + i * 90 + (seed % 20)}
          cy={140 + (i * 15) % 30}
          r={3}
          fill="currentColor"
          opacity={0.2}
        />
      ))}
    </>
  );
}

function ToolsPattern({ seed }: { seed: number }) {
  const gridOffset = seed % 20;
  return (
    <>
      {/* Circuit grid */}
      {[0, 1, 2, 3].map(i => (
        <g key={`grid-${i}`}>
          <line
            x1={50 + i * 80 + gridOffset}
            y1={20}
            x2={50 + i * 80 + gridOffset}
            y2={180}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.1}
          />
          <line
            x1={20}
            y1={30 + i * 45}
            x2={380}
            y2={30 + i * 45}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.08}
          />
        </g>
      ))}
      {/* Connection nodes */}
      {[0, 1, 2, 3, 4, 5].map(i => {
        const x = 50 + (i * 67 + seed) % 300;
        const y = 30 + (i * 43 + seed) % 140;
        return (
          <g key={`node-${i}`}>
            <circle cx={x} cy={y} r={5} fill="currentColor" opacity={0.2} />
            <circle cx={x} cy={y} r={10} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.1} />
          </g>
        );
      })}
      {/* Horizontal connector lines between nodes */}
      <line x1={80 + gridOffset} y1={70} x2={200 + gridOffset} y2={70} stroke="currentColor" strokeWidth={1.5} opacity={0.15} strokeLinecap="round" />
      <line x1={160 + gridOffset} y1={120} x2={320 + gridOffset} y2={120} stroke="currentColor" strokeWidth={1.5} opacity={0.12} strokeLinecap="round" />
    </>
  );
}

function ChangingPattern({ seed }: { seed: number }) {
  const waveOffset = seed % 50;
  return (
    <>
      {/* Wave lines */}
      {[0, 1, 2].map(i => (
        <path
          key={`wave-${i}`}
          d={`M 0 ${60 + i * 50 + (seed % 15)} Q 90 ${30 + i * 50 + waveOffset % 20} 180 ${60 + i * 50 + (seed % 15)} T 360 ${60 + i * 50 + (seed % 15)}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 1 ? 2 : 1.5}
          opacity={0.12 + i * 0.04}
        />
      ))}
      {/* Radar sweep arc */}
      <path
        d={`M ${300 + (seed % 20)} 30 A 70 70 0 0 1 ${340 + (seed % 20)} 120`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        opacity={0.18}
        strokeLinecap="round"
      />
      {/* Signal dots — spreading outward */}
      {[0, 1, 2, 3].map(i => (
        <circle
          key={`sig-${i}`}
          cx={60 + i * 30 + waveOffset}
          cy={100 + (i * 11) % 30}
          r={2 + i}
          fill="currentColor"
          opacity={0.25 - i * 0.05}
        />
      ))}
    </>
  );
}

function DoesThisWorkPattern({ seed }: { seed: number }) {
  const offset = seed % 30;
  return (
    <>
      {/* Bold crosshair */}
      <line x1={200 + offset} y1={20} x2={200 + offset} y2={180} stroke="currentColor" strokeWidth={2} opacity={0.15} />
      <line x1={80} y1={100 + offset % 20} x2={340} y2={100 + offset % 20} stroke="currentColor" strokeWidth={2} opacity={0.15} />
      <circle cx={200 + offset} cy={100 + offset % 20} r={30} fill="none" stroke="currentColor" strokeWidth={2} opacity={0.18} />
      <circle cx={200 + offset} cy={100 + offset % 20} r={55} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.1} strokeDasharray="8 6" />
      {/* Flask silhouette */}
      <path
        d={`M ${90 + offset} 50 L ${90 + offset} 100 L ${65 + offset} 160 L ${115 + offset} 160 Z`}
        fill="currentColor"
        opacity={0.08}
      />
      <line x1={80 + offset} y1={50} x2={100 + offset} y2={50} stroke="currentColor" strokeWidth={1.5} opacity={0.15} />
      {/* Check / X marks */}
      <g opacity={0.2}>
        <line x1={300} y1={45} x2={310} y2={55} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        <line x1={310} y1={55} x2={325} y2={35} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
      </g>
      <g opacity={0.15}>
        <line x1={300} y1={135} x2={315} y2={150} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        <line x1={315} y1={135} x2={300} y2={150} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
      </g>
    </>
  );
}

function PatternSVG({ pillar, seed }: { pillar: string; seed: number }) {
  const patternMap: Record<string, React.FC<{ seed: number }>> = {
    'save-time': SaveTimePattern,
    'tools-explained': ToolsPattern,
    'whats-changing': ChangingPattern,
    'does-this-work': DoesThisWorkPattern,
  };
  const Pattern = patternMap[pillar] ?? ToolsPattern;
  return <Pattern seed={seed} />;
}

export function PillarIllustration({
  pillar,
  title = '',
  variant = 'card',
  className = '',
}: PillarIllustrationProps) {
  const vis = getVisuals(pillar);
  const seed = seedFromTitle(title);
  const isHero = variant === 'hero';

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: vis.bg,
        height: isHero ? '220px' : '160px',
        borderBottom: `3px solid ${vis.accent}`,
      }}
    >
      {/* SVG Pattern Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        style={{ color: vis.accentLight }}
        aria-hidden="true"
      >
        <PatternSVG pillar={pillar} seed={seed} />
      </svg>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, transparent 40%, ${vis.bg}cc 100%)`,
        }}
      />

      {/* Content overlay */}
      <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
        {/* Top row: tag + icon */}
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: isHero ? '12px' : '10px',
              letterSpacing: '0.15em',
              color: vis.accentLight,
              fontWeight: 700,
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            {vis.tag}
          </span>
          <span
            style={{
              fontSize: isHero ? '28px' : '22px',
              opacity: 0.5,
              filter: 'grayscale(30%)',
            }}
            aria-hidden="true"
          >
            {vis.icon}
          </span>
        </div>

        {/* Bottom: brand mark */}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: isHero ? '24px' : '18px',
              height: isHero ? '24px' : '18px',
              backgroundColor: vis.accent,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: isHero ? '14px' : '10px',
              fontWeight: 700,
            }}
          >
            F
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              color: vis.accentLight,
              opacity: 0.5,
              letterSpacing: '0.05em',
            }}
          >
            farmai.ie
          </span>
        </div>
      </div>
    </div>
  );
}
