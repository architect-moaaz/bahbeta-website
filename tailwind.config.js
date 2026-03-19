/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-black': '#000000',
        'bb-dark': '#0a0a0a',
        'bb-gray': {
          50: '#f7f7f8',
          100: '#e8e8ea',
          200: '#d1d1d5',
          300: '#a9a9b0',
          400: '#7c7c85',
          500: '#5a5a63',
          600: '#48484f',
          700: '#3a3a40',
          800: '#2a2a2e',
          900: '#1a1a1e',
          950: '#111114',
        },
        'bb-accent': '#0084FF',
        'bb-accent-light': '#339DFF',
        'bb-accent-dark': '#0066CC',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"SF Pro Display"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '200' }],
        'section': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'subtitle-lg': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.4', fontWeight: '300' }],
        'subtitle': ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.5', fontWeight: '400' }],
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(0, 132, 255, 0.3), 0 0 15px rgba(0, 132, 255, 0.15)',
        'glow': '0 0 8px rgba(0, 132, 255, 0.4), 0 0 20px rgba(0, 132, 255, 0.2), 0 0 40px rgba(0, 132, 255, 0.1)',
        'glow-lg': '0 0 15px rgba(0, 132, 255, 0.5), 0 0 30px rgba(0, 132, 255, 0.3), 0 0 60px rgba(0, 132, 255, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
