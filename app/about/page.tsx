import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'About FarmAI Ireland',
  description: 'FarmAI Ireland is an independent platform providing plain-English AI guides for Irish farmers. Not affiliated with Teagasc or any government body.',
};

export default function AboutPage() {
  return (
    <main className="bg-ui-bg min-h-screen">

      {/* Hero */}
      <section className="py-14 sm:py-16 px-4 border-b border-ui-border">
        <div className="max-w-reading mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green mb-4">About</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ui-text mb-5 leading-snug">
            Independent AI guidance for Irish farmers
          </h1>
          <p className="text-ui-muted text-lg leading-relaxed">
            FarmAI Ireland is an independent platform. We have no affiliation with Teagasc, the
            Department of Agriculture, or any agri-business. Our one job is giving Irish farmers
            accurate, plain-English information about AI tools and what they mean on the ground.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="py-12 px-4 border-b border-ui-border">
        <div className="max-w-reading mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-ui-text mb-4">What we do</h2>
          <div className="prose prose-lg max-w-none prose-a:text-brand-green">
            <p>
              We test AI tools, read the official guidance, and translate both into plain English.
              Every article and guide is written for someone who has better things to do than learn
              a new technology for its own sake.
            </p>
            <p>
              We cover tools that are available in Ireland now, at costs that make sense on real
              Irish farms. We do not cover prototypes, overseas-only products, or technology that
              is five years away from landing here.
            </p>
            <p>
              When something is not worth your time or money, we say so plainly. When it is, we
              explain exactly how to use it and what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-12 px-4 border-b border-ui-border">
        <div className="max-w-reading mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-ui-text mb-4">How we source information</h2>
          <div className="prose prose-lg max-w-none prose-a:text-brand-green">
            <p>Every article draws from publicly available information published by:</p>
            <ul>
              <li>Teagasc — research, advisory publications, and benchmarking data</li>
              <li>The Department of Agriculture, Food and the Marine — scheme rules and official guidance</li>
              <li>ICBF — Irish Cattle Breeding Federation data and methodology</li>
              <li>Bord Bia — market and benchmarking data</li>
              <li>gov.ie — official policy and regulatory guidance</li>
            </ul>
            <p>
              We cite our sources at the bottom of every piece. We update articles when the official
              guidance changes. If we get something wrong, we correct it quickly — see our{' '}
              <Link href="/sources">editorial standards page</Link> for how that works.
            </p>
          </div>
        </div>
      </section>

      {/* Independence */}
      <section className="py-12 px-4 border-b border-ui-border bg-white">
        <div className="max-w-reading mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-ui-text mb-4">Independence</h2>
          <div className="prose prose-lg max-w-none prose-a:text-brand-green">
            <p>
              FarmAI Ireland does not accept payment from tool vendors, agri-businesses, or advisory
              services in exchange for editorial coverage. Sponsorship is disclosed clearly when it
              exists. We do not run affiliate links.
            </p>
            <p>
              If we recommend a tool, it is because we think it is worth your time — not because
              someone paid us to say so.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 px-4">
        <div className="max-w-reading mx-auto text-center">
          <h2 className="font-serif text-2xl font-semibold text-ui-text mb-3">Get in touch</h2>
          <p className="text-ui-muted mb-6">Something wrong? Something we missed? A question worth answering publicly?</p>
          <Link
            href="/contact"
            className="inline-block bg-brand-green text-white font-semibold px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors"
          >
            Send us a message
          </Link>
          <p className="text-ui-muted text-sm mt-4">
            Or email directly:{' '}
            <a href="mailto:hello@farmaiireland.ie" className="text-brand-green hover:underline">
              hello@farmaiireland.ie
            </a>
          </p>
        </div>
      </section>

    </main>
  );
}
