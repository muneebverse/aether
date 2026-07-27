import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand shades — always referenced as `aether-*` throughout the app
        // (e.g. bg-aether-electric-teal), so these stay nested under `aether`.
        // Deep Blue Trust palette (hue 215°), built on the ratio system:
        //   Accent   = 100% sat / 60% light -> electric-teal
        //   Neutral  =  60% sat / 72% light -> sky-cyan
        //   Contrast =  85% sat / 30% light -> deep-teal
        // bright-cyan is a lighter tint of Accent, kept distinct for hover states.
        aether: {
          'deep-teal': '#0B428E',
          'electric-teal': '#3388FF',
          'bright-cyan': '#5CA0FF',
          'sky-cyan': '#8DB0E2',
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
      fontWeight: {
        '500': '500',
        '600': '600',
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
        card: '0 1px 3px rgba(11, 66, 142, 0.1)',
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
