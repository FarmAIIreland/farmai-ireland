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
          green:      '#1D9E75',
          dark:       '#085041',
          amber:      '#E8A020',
        },
        ui: {
          bg:     '#F7F5F0',
          text:   '#1A1A1A',
          muted:  '#6B7280',
          border: '#E5E7EB',
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      maxWidth: {
        reading: '700px',
        site:    '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
