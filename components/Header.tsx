'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import siteConfig from '@/config/site.json';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-ui-border shadow-sm">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="w-8 h-8 rounded-button bg-brand-green flex items-center justify-center text-white font-bold text-sm">F</span>
            <span className="font-semibold text-ui-text text-lg leading-tight">
              FarmAI <span className="text-brand-green">Ireland</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {siteConfig.navigation.main.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-brand-green ${
                  pathname === item.path ? 'text-brand-green' : 'text-ui-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/read"
              className="inline-block bg-brand-green text-white text-sm font-semibold px-4 py-2 rounded-button hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-ui-muted hover:text-ui-text transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ui-border bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {siteConfig.navigation.main.map(item => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className={`py-2.5 text-sm font-medium border-b border-ui-border last:border-0 transition-colors hover:text-brand-green ${
                  pathname === item.path ? 'text-brand-green' : 'text-ui-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/read"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block w-full text-center bg-brand-green text-white text-sm font-semibold px-4 py-3 rounded-button hover:bg-opacity-90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
