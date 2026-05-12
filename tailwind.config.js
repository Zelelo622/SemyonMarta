/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fff8f0',
        cream: '#EFE3CE',
        parch: '#E8D9BE',
        rose: '#b32015',
        'rose-deep': '#9A1820',
        'rose-soft': '#C8424A',
        ink: '#1A1614',
        'ink-muted': '#5C4A3E',
      },
      fontFamily: {
        bukva: ['"AncientKyiv"', 'serif'],
        slav: ['"Monomakh Unicode"', 'Georgia', 'serif'],
        marck: ['"Cyrillic Old"', 'serif'],
        mono: ['"Monomakh Unicode"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest3: '0.25em',
        widest4: '0.32em',
      },
      animation: {
        'fade-up': 'fadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1.2s ease-out both',
        sway: 'sway 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
