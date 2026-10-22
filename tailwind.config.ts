import type { Config } from 'tailwindcss';

/**
 * Burma Teak Plant — design tokens.
 *
 * The palette descends from Ganesh Nursery's own identity: their site's theme
 * colour (#12261A) is the base forest tone, and the logo's teal is kept as a
 * restrained accent so the sub-brand reads as family without inheriting the
 * parent mark's brightness.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#07130C',
        forest: {
          DEFAULT: '#12261A',
          deep: '#0B1A12',
          mid: '#1D3B29',
          soft: '#2F5A41',
          light: '#4A7C59',
        },
        teal: {
          DEFAULT: '#19A3AD',
          deep: '#0F6E76',
          soft: '#7FCBD1',
        },
        teak: {
          DEFAULT: '#A9703F',
          dark: '#7B4F2A',
          light: '#C99B6E',
        },
        gold: {
          DEFAULT: '#C9A227',
          soft: '#E3C76A',
        },
        sand: '#E8DFD1',
        bone: '#F3EDE3',
        paper: '#FDFBF7',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid editorial scale — clamp() keeps headlines huge without overflow.
        'display-xl': ['clamp(2.75rem, 11vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 8vw, 7rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.875rem, 5.5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.5rem, 3.6vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.34em' }],
        'body-lg': ['clamp(1rem, 1.35vw, 1.1875rem)', { lineHeight: '1.75' }],
      },
      spacing: {
        section: 'clamp(5rem, 11vw, 11rem)',
        gutter: 'clamp(1.25rem, 5vw, 5.5rem)',
      },
      maxWidth: {
        shell: '96rem',
        measure: '34rem',
      },
      letterSpacing: {
        eyebrow: '0.34em',
        wider2: '0.18em',
      },
      transitionTimingFunction: {
        // One shared cinematic curve keeps every motion feeling related.
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
        drift: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'leaf-drift': {
          '0%': { transform: 'translate3d(0,0,0) rotate(0deg)', opacity: '0' },
          '12%': { opacity: '0.55' },
          '88%': { opacity: '0.4' },
          '100%': { transform: 'translate3d(28px,-115vh,0) rotate(220deg)', opacity: '0' },
        },
        'line-pulse': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1.16)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'leaf-drift': 'leaf-drift linear infinite',
        'line-pulse': 'line-pulse 2.4s cubic-bezier(0.16,1,0.3,1) infinite',
        'slow-zoom': 'slow-zoom 24s ease-out forwards',
        shimmer: 'shimmer 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
