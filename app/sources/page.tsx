import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Our Sources — FarmAI Ireland',
  description: 'How FarmAI Ireland sources and verifies information, and how we handle corrections.',
};

const SOURCES = [
  {
    name:        'Teagasc',
    url:         'https://www.teagasc.ie',
    description: 'Research publications, advisory guidelines, grassland data, and scheme guidance from the Irish Agriculture and Food Development Authority.',
  },
  {
    name:        'Department of Agriculture, Food and the Marine',
    url:         'https://www.gov.ie/en/organisation/department-of-agriculture-food-and-the-marine/',
    description: 'Official scheme rules, deadlines, regulatory requirements, and policy guidance.',
  },
  {
    name:        'ICBF — Irish Cattle Breeding Federation',
    url:         'https://www.icbf.com',
    description: 'EBI data, breed statistics, tagging compliance, and cattle genomics methodology.',
  },
  {
    name:        'Bord Bia',
    url:         'https://www.bordbia.ie',
    description: 'Market data, sustainability standards, and benchmarking for Irish food and drink.',
  },
  {
    name:        'agfood.ie',
    url:         'https://www.agfood.ie',
    description: 'Land parcel identification, LPIS data, and agri-food scheme management.',
  },
  {
    name:        'PastureBase Ireland',
    url:         'https://www.pasturebase.ie',
    description: 'National grass measurement platform and grassland benchmarking data.',
  },
  {
    name:        'Copernicus / EU Satellite Programme',
    url:         'https://www.copernicus.eu',
    description: 'Free Sentinel-2 satellite imagery used in NDVI and crop monitoring tools.',
  },
];

export default function SourcesPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <div className="max-w-reading mx-auto">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-4">Editorial</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ui-text mb-5 leading-snug">
          Our sources and editorial standards
        </h1>
        <p className="text-ui-muted text-lg leading-relaxed mb-10">
          Every article and guide cites its sources. Here is the full list of the organisations
          we draw from, and how we handle accuracy and corrections.
        </p>

        {/* Sources list */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-ui-text mb-6">Trusted sources</h2>
          <ul className="space-y-5">
            {SOURCES.map(s => (
              <li key={s.url} className="pb-5 border-b border-ui-border last:border-0">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-green hover:underline text-base"
                >
                  {s.name}
                </a>
                <p className="text-ui-muted text-sm mt-1 leading-relaxed">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial standards */}
        <section className="mb-12">
          <h2 className="font-serif text-xl font-semibold text-ui-text mb-4">Editorial standards</h2>
          <div className="prose prose-lg max-w-none prose-a:text-brand-green">
            <p>
              We only recommend tools and practices that are available in Ireland, tested at Irish
              farm scale, and cited from official sources. We do not publish AI-generated content
              without human review and fact-checking.
            </p>
            <p>
              Scheme rules, deadlines, and payment rates change. We update articles when official
              guidance changes, and we date every article so you can see when it was last verified.
            </p>
            <p>
              We are not affiliated with Teagasc, the Department of Agriculture, or any tool vendor.
              When we cover a commercial product, we are not paid to do so unless explicitly stated.
            </p>
          </div>
        </section>

        {/* Corrections */}
        <section className="bg-white rounded-[16px] border border-ui-border p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-ui-text mb-3">Corrections policy</h2>
          <p className="text-ui-muted leading-relaxed mb-4">
            If something we have published is wrong, we want to know. We correct errors quickly
            and note the correction at the bottom of the article. We do not quietly edit and
            re-date — if we got something wrong, we say so.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-green text-white font-semibold px-5 py-2.5 rounded-button hover:bg-opacity-90 transition-colors text-sm"
          >
            Report an error
          </Link>
        </section>

      </div>
    </main>
  );
}
