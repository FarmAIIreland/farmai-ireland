import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
        {GA_ID && !GA_ID.includes('XXXXXXXXXX') && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
