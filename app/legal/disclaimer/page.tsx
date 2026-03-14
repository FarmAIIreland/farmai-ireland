import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Disclaimer — FarmAI Ireland',
  description: 'Important disclaimers regarding the information published on FarmAI Ireland.',
};

export default function DisclaimerPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <article className="max-w-reading mx-auto prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green not-prose mb-4">Legal</p>
        <h1>Disclaimer</h1>
        <p className="text-ui-muted not-prose text-sm mb-8">Last updated: March 2026</p>

        <h2>Not affiliated with Teagasc or government bodies</h2>
        <p>
          FarmAI Ireland is a privately owned, independent information platform. We are not
          affiliated with, endorsed by, or connected to Teagasc, the Department of Agriculture,
          Food and the Marine, ICBF, Bord Bia, or any other Irish government body or
          state-sponsored organisation.
        </p>
        <p>
          References to these organisations are for informational purposes only. Their content
          is cited as a source, not reproduced with permission or on their behalf.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Nothing published on FarmAI Ireland constitutes professional advisory, legal, financial,
          veterinary, or agri-business advice. The information is provided as a general guide only.
        </p>
        <p>
          For decisions about grants, subsidies, scheme eligibility, herd health, animal
          treatment, farm finance, or any matter with significant consequences, always consult
          a qualified professional — your Teagasc advisor, your vet, your accountant, or the
          relevant government department directly.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          We make reasonable efforts to ensure the accuracy of information published on this site.
          However, scheme rules, payment rates, deadlines, and regulatory requirements are subject
          to change. FarmAI Ireland cannot guarantee that all information is current or complete
          at the time you read it.
        </p>
        <p>
          Always verify time-sensitive or financially significant information against the relevant
          official source before acting on it.
        </p>

        <h2>AI tools and technology</h2>
        <p>
          FarmAI Ireland provides information about AI tools and technologies. Coverage of a tool
          does not constitute endorsement. AI tools carry their own limitations, and their
          suitability for any specific farm operation depends on factors we cannot assess remotely.
          Use any tool described on this site at your own discretion and risk.
        </p>

        <h2>External links</h2>
        <p>
          This site links to third-party websites. We are not responsible for the accuracy,
          content, or practices of those sites. External links do not constitute endorsement.
        </p>

        <h2>Contact</h2>
        <p>
          If you believe any information on this site is inaccurate or misleading, please contact
          us at{' '}
          <a href="mailto:hello@farmaiireland.ie">hello@farmaiireland.ie</a>. We take corrections
          seriously and respond promptly.
        </p>

      </article>
    </main>
  );
}
