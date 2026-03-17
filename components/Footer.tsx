'use client';
import Link from 'next/link';
import siteConfig from '@/config/site.json';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#5DCAA5] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map(item => (
                <li key={item.path}>
                  <Link href={item.path} className="text-sm text-[#9FE1CB] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sources" className="text-sm text-[#9FE1CB] hover:text-white transition-colors">
                  Our Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 — Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#5DCAA5] mb-4">Legal</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.footer.map(item => (
                <li key={item.path}>
                  <Link href={item.path} className="text-sm text-[#9FE1CB] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Connect */}
          <div id="footer-newsletter">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#5DCAA5] mb-4">Connect</h3>
            <p className="text-sm text-[#9FE1CB] mb-3">FarmAI Monthly — one email a month.</p>
            <div className="mb-4">
              <NewsletterForm variant="dark" />
            </div>
            <div className="flex gap-4">
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-[#9FE1CB] hover:text-white transition-colors text-sm">YouTube</a>
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-[#9FE1CB] hover:text-white transition-colors text-sm">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0a3d2e]">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5DCAA5]">
          <p>© 2026 FarmAI Ireland. Independent. Not affiliated with Teagasc or any government body.</p>
          <button className="hover:text-white transition-colors">Cookie Settings</button>
        </div>
      </div>
    </footer>
  );
}
