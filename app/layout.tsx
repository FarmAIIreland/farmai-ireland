import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import siteConfig from '@/config/site.json';

const GA_ID = siteConfig.analytics.googleAnalytics;

const lora = Lora({
  subsets:  ['latin'],
  variable: '--font-lora',
  display:  'swap',
  weight:   ['400', '600', '700'],
  style:    ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default:  siteConfig.seo.defaultTitle,
    template: `%s | FarmAI Ireland`,
  },
  description: siteConfig.seo.defaultDescription,
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    siteName: siteConfig.site.name,
    locale:   'en_IE',
    type:     'website',
  },
  twitter: {
    card:    'summary_large_image',
    creator: siteConfig.seo.twitterHandle,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IE" className={lora.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {GA_ID && !GA_ID.includes('XXXXXXXXXX') && <CookieBanner gaId={GA_ID} />}
      </body>
    </html>
  );
}
