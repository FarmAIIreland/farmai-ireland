import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Terms of Use — FarmAI Ireland',
  description: 'Terms of use for the FarmAI Ireland website.',
};

export default function TermsPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <article className="max-w-reading mx-auto prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green not-prose mb-4">Legal</p>
        <h1>Terms of Use</h1>
        <p className="text-ui-muted not-prose text-sm mb-8">Last updated: March 2026</p>

        <h2>Acceptance of terms</h2>
        <p>
          By accessing FarmAI Ireland (&ldquo;the site&rdquo;), you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>Information provided</h2>
        <p>
          The content on this site is provided for general information and educational purposes
          only. It does not constitute professional, legal, financial, or agricultural advisory
          advice. Always verify information with official sources and consult a qualified advisor
          before making decisions about your farm operation, grants, or compliance.
        </p>
        <p>
          FarmAI Ireland is an independent platform. We are not affiliated with Teagasc, the
          Department of Agriculture, ICBF, Bord Bia, or any government body. Our content is not
          endorsed by these organisations.
        </p>

        <h2>Accuracy and currency</h2>
        <p>
          We take reasonable steps to ensure the information on this site is accurate and
          up to date. However, scheme rules, deadlines, and regulatory requirements change.
          We cannot guarantee that all information is current at the time you read it. Always
          verify time-sensitive information against the relevant official source before acting on it.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, FarmAI Ireland accepts no liability for any
          loss or damage arising from reliance on information published on this site. This includes
          but is not limited to financial loss, missed deadlines, compliance failures, or farm
          management decisions made based on our content.
        </p>

        <h2>External links</h2>
        <p>
          This site contains links to third-party websites including Teagasc, gov.ie, ICBF, and
          commercial tool providers. We are not responsible for the content, accuracy, or privacy
          practices of those sites. Links do not constitute endorsement unless explicitly stated.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Original content on this site is owned by FarmAI Ireland and may not be reproduced
          without permission. Where content is sourced from third parties, credit is given. If
          you believe we have used something incorrectly, please contact us.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms. Continued use of the site after changes constitutes
          acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href="mailto:hello@farmaiireland.ie">hello@farmaiireland.ie</a>
        </p>

      </article>
    </main>
  );
}
