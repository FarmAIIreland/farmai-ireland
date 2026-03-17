import Link from 'next/link';
import siteConfig from '@/config/site.json';

const PILLAR_ICONS: Record<string, string> = {
  'save-time':       '⏱',
  'tools-explained': '🔧',
  'whats-changing':  '📡',
  'does-this-work':  '🧪',
};

export function TopicPillars() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-ui-bg">
      <div className="max-w-site mx-auto">

        <div className="mb-8 sm:mb-10">
          <h2 className="text-[26px] font-semibold text-ui-text mb-2" style={{ letterSpacing: '-0.01em' }}>
            Browse by topic
          </h2>
          <p className="text-ui-muted text-sm sm:text-base">Find what matters for your farm</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.content.pillars.map(pillar => {
            const accent = pillar.accent ?? '#1D9E75';
            return (
              <Link
                key={pillar.slug}
                href={`/read?pillar=${pillar.slug}`}
                className="group flex flex-col bg-white rounded-[12px] border border-ui-border p-6 hover:shadow-md transition-all"
                style={{ borderTopWidth: '3px', borderTopColor: accent }}
              >
                {/* Icon + tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{PILLAR_ICONS[pillar.slug] ?? '🌱'}</span>
                  <span
                    className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded"
                    style={{
                      fontFamily:    'monospace',
                      letterSpacing: '0.1em',
                      background:    accent === '#E24B4A' ? '#FDEAEA' : '#E8F5EF',
                      color:         accent === '#E24B4A' ? '#7A1010' : '#0A5C3F',
                    }}
                  >
                    {pillar.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-semibold text-ui-text text-base mb-2 transition-colors"
                  style={{ color: 'inherit' }}
                >
                  <span className="group-hover:text-brand-green transition-colors">{pillar.label}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-ui-muted leading-relaxed flex-1">
                  {pillar.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
                  <span>Explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
