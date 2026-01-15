/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#FFD700', // Pure Gold
          600: '#D97706',
        },
        orange: {
            500: '#FF9500',
            600: '#EA580C',
        },
        mystic: {
          950: '#0a0a0a', // Deep dark mode
          900: '#120918', // Deep purple-black
          800: '#1E1245',
          700: '#302060',
        },
        neon: {
          green: '#39FF14', // Soft neon green for CTA
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 2s infinite',
        'glow-gold': 'glow-gold 2s ease-in-out infinite alternate',
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'line-grow': 'line-grow 1s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 149, 0, 0.7)' },
          '70%': { boxShadow: '0 0 0 12px rgba(255, 149, 0, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 149, 0, 0)' }
        },
        'glow-gold': {
          '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.3), 0 0 10px rgba(255, 215, 0, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'line-grow': {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }
    },
  },
  plugins: [],
}