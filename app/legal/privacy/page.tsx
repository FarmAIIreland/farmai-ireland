import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Privacy Policy — FarmAI Ireland',
  description: 'How FarmAI Ireland collects, uses, and protects your personal data under GDPR.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <article className="max-w-reading mx-auto prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green not-prose mb-4">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="text-ui-muted not-prose text-sm mb-8">Last updated: March 2026</p>

        <h2>Who we are</h2>
        <p>
          FarmAI Ireland is an independent information platform for Irish farmers. References to
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; in this policy refer to FarmAI Ireland. Our contact
          email is <a href="mailto:hello@farmaiireland.ie">hello@farmaiireland.ie</a>.
        </p>

        <h2>What data we collect</h2>
        <p>We collect personal data in the following circumstances:</p>
        <ul>
          <li>
            <strong>Newsletter subscription:</strong> If you sign up to FarmAI Monthly, we collect
            your email address. We use this solely to send you the newsletter.
          </li>
          <li>
            <strong>Contact form:</strong> If you send us a message, we collect your name, email
            address, and the content of your message in order to respond to you.
          </li>
          <li>
            <strong>Analytics:</strong> We use Google Analytics to understand how our content is
            used. This collects anonymised data about page visits, device type, and geographic
            region. No personally identifiable information is collected through analytics.
          </li>
        </ul>

        <h2>Legal basis for processing</h2>
        <p>
          We process your data on the basis of your consent (newsletter sign-up, contact form
          submission) and our legitimate interest in understanding how our content is used
          (analytics).
        </p>

        <h2>How we store and protect your data</h2>
        <p>
          Newsletter email addresses are stored with our email service provider. Contact form
          submissions are stored only as long as necessary to respond to your enquiry. We do not
          sell, rent, or share your personal data with third parties for marketing purposes.
        </p>

        <h2>Your rights under GDPR</h2>
        <p>As a person in the European Union, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time (including unsubscribing from the newsletter)</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{' '}
          <a href="mailto:hello@farmaiireland.ie">hello@farmaiireland.ie</a>.
        </p>

        <h2>Complaints</h2>
        <p>
          If you have concerns about how we handle your data, you have the right to lodge a
          complaint with the{' '}
          <a href="https://www.dataprotection.ie" target="_blank" rel="noopener noreferrer">
            Data Protection Commission
          </a>{' '}
          (Ireland&rsquo;s supervisory authority under GDPR).
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be noted with an
          updated date at the top of this page.
        </p>

      </article>
    </main>
  );
}
