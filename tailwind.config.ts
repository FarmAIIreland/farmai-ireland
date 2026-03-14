import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#1D9E75',
          dark:   '#085041',
          amber:  '#E8A020',
        },
        ui: {
          bg:     '#F7F5F0',
          text:   '#1A1A1A',
          muted:  '#6B7280',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        // Lora is used for everything — body, headings, nav, buttons
        sans:  ['var(--font-lora)', 'Georgia', 'serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      borderRadius: {
        button: '0.5rem',
      },
      maxWidth: {
        reading: '700px',
        site:    '1200px',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily:     'var(--font-lora), Georgia, serif',
            color:          '#1A1A1A',
            a:              { color: '#1D9E75', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            h1:             { color: '#1A1A1A', fontFamily: 'var(--font-lora), Georgia, serif', fontWeight: '600' },
            h2:             { color: '#1A1A1A', fontFamily: 'var(--font-lora), Georgia, serif', fontWeight: '600' },
            h3:             { color: '#1A1A1A', fontFamily: 'var(--font-lora), Georgia, serif', fontWeight: '600' },
            strong:         { color: '#1A1A1A' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
