import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Teal brand shades — always referenced as `aether-*` throughout the app
        // (e.g. bg-aether-electric-teal), so these stay nested under `aether`.
        aether: {
          'deep-teal': '#0097A7',
          'electric-teal': '#00BCD4',
          'bright-cyan': '#00E5FF',
          'sky-cyan': '#4DD0E1',
          // Also mirrored here since some files use the `aether-` prefixed
          // form for these too (e.g. text-aether-deep-ink) — see below.
          'sky-white': '#FAFAF8',
          'deep-ink': '#1a3a3a',
          success: '#10B981',
          alert: '#EF4444',
          neutral: '#6B7280',
        },
        // Supporting neutrals — referenced WITHOUT the `aether-` prefix in most
        // of the app (bg-sky-white, text-deep-ink, text-success, text-neutral,
        // text-alert). Defined at the top level too so both forms resolve to
        // the same value instead of silently producing no styles.
        'sky-white': '#FAFAF8',
        'deep-ink': '#1a3a3a',
        success: '#10B981',
        alert: '#EF4444',
        neutral: '#6B7280',
      },
      fontFamily: {
        display: [
          'Space Grotesk',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        body: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        tight: '8px',
        DEFAULT: '12px',
        expansive: '16px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(15, 15, 18, 0.1)',
        card: '0 1px 3px rgba(0, 151, 167, 0.1)',
      },
      transitionDuration: {
        fast: '200ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
