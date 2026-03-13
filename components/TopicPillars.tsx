import Link from 'next/link';
import siteConfig from '@/config/site.json';

const PILLAR_ICONS: Record<string, string> = {
  dairy:      '🐄',
  'beef-sheep': '🐑',
  tillage:    '🌾',
};

export function TopicPillars() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-ui-bg">
      <div className="max-w-site mx-auto">

        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ui-text mb-2">Browse by topic</h2>
          <p className="text-ui-muted text-sm sm:text-base">Find what&apos;s relevant to your type of farming</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {siteConfig.content.pillars.map(pillar => (
            <Link
              key={pillar.slug}
              href={`/read?pillar=${pillar.slug}`}
              className="group flex flex-col bg-white rounded-[12px] border border-ui-border p-6 hover:border-brand-green hover:shadow-md transition-all"
            >
              {/* Icon + tag */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{PILLAR_ICONS[pillar.slug] ?? '🌱'}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-green bg-[#e8f5ef] px-2 py-0.5 rounded-full">
                  {pillar.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-ui-text text-lg mb-2 group-hover:text-brand-green transition-colors">
                {pillar.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-ui-muted leading-relaxed flex-1">
                {pillar.description}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center gap-1 text-brand-green text-sm font-medium">
                <span>Explore</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
