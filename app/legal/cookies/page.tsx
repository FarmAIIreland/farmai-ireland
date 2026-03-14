import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Cookie Policy — FarmAI Ireland',
  description: 'How FarmAI Ireland uses cookies and how to manage your preferences.',
};

export default function CookiesPage() {
  return (
    <main className="bg-ui-bg min-h-screen py-14 px-4">
      <article className="max-w-reading mx-auto prose prose-lg max-w-none prose-headings:font-serif prose-a:text-brand-green">

        <p className="text-xs font-semibold uppercase tracking-widest text-brand-green not-prose mb-4">Legal</p>
        <h1>Cookie Policy</h1>
        <p className="text-ui-muted not-prose text-sm mb-8">Last updated: March 2026</p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They are
          widely used to make websites work efficiently, remember your preferences, and provide
          information to site owners.
        </p>

        <h2>Cookies we use</h2>

        <h3>Essential cookies</h3>
        <p>
          These cookies are necessary for the site to function. They cannot be disabled. They do
          not collect personal information and are not used for tracking or advertising.
        </p>

        <h3>Analytics cookies</h3>
        <p>
          We use Google Analytics to understand how visitors use this site. Google Analytics
          sets cookies that collect anonymised information about:
        </p>
        <ul>
          <li>Which pages are visited and for how long</li>
          <li>How visitors arrived at the site (search, direct, social)</li>
          <li>General geographic region (country/region, not precise location)</li>
          <li>Device type and browser</li>
        </ul>
        <p>
          This data is aggregated and anonymised. It helps us understand what content is useful
          and how to improve the site. No personally identifiable information is collected through
          analytics cookies.
        </p>
        <p>
          You can opt out of Google Analytics across all websites by installing the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>

        <h2>Managing cookies</h2>
        <p>
          You can control and delete cookies through your browser settings. Instructions vary
          by browser:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Safari
            </a>
          </li>
        </ul>
        <p>
          Note that disabling cookies may affect the functionality of this and other websites.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this cookie policy from time to time. The date at the top of this page
          shows when it was last revised.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about cookies:{' '}
          <a href="mailto:hello@farmaiireland.ie">hello@farmaiireland.ie</a>
        </p>

      </article>
    </main>
  );
}
