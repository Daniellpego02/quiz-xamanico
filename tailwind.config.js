/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        display: ['Playfair Display', 'serif'],
        ritual: ['Cinzel', 'serif'], // Ceremonial font for ritual elements
      },
      colors: {
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          primary: '#FFD700',
          secondary: '#FFC700',
          light: '#FFE66D',
          aged: '#B8860B', // Aged gold - not neon
          ancient: '#8B7355', // Ancient artifact gold
        },
        orange: {
            500: '#FF9500', // High conversion orange
            600: '#EA580C',
        },
        mystic: {
          900: '#0F0821', // Darker, deeper purple base
          850: '#0A0618', // Even deeper darkness
          800: '#1E1245',
          700: '#302060',
          dark: '#1a0033',
          medium: '#2d1b4e',
          light: '#3d2b5e',
          deep: '#0D0518', // Deep ceremonial darkness
          void: '#050208', // The void - deepest black-purple
        },
        ember: {
          500: '#8B2500', // Deep ember red
          600: '#6B1C00', // Darker ember
          glow: '#FF4500', // Ember glow
        },
        ritual: {
          dark: '#0A0510', // Ritual darkness
          purple: '#1A0A2E', // Deep mystical purple
          gold: '#C9A227', // Ritual gold (aged, not bright)
          blood: '#4A0E0E', // Ritual blood red
          smoke: '#1A1A2E', // Smoke/shadow color
        },
        lavender: {
          500: '#c4b5d6', // Quiz subtitle color for readability
        },
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 2s infinite',
        'ritual-breathe': 'ritualBreathe 4s ease-in-out infinite',
        'ritual-glow': 'ritualGlow 3s ease-in-out infinite alternate',
        'sigil-rotate': 'sigilRotate 20s linear infinite',
        'energy-pulse': 'energyPulse 2s ease-in-out infinite',
        'sacred-float': 'sacredFloat 8s ease-in-out infinite',
        'mandala-spin': 'mandalaSpin 30s linear infinite',
        'aura-expand': 'auraExpand 3s ease-out infinite',
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
        ritualBreathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
        ritualGlow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.3), inset 0 0 30px rgba(201, 162, 39, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 162, 39, 0.6), inset 0 0 50px rgba(201, 162, 39, 0.2)' },
        },
        sigilRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        energyPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        sacredFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        mandalaSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        auraExpand: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '0.4' },
          '100%': { transform: 'scale(1.15)', opacity: '0' },
        },
      },
      backgroundImage: {
        'ritual-gradient': 'radial-gradient(ellipse at center, rgba(26, 10, 46, 0.8) 0%, rgba(10, 5, 16, 1) 70%)',
        'sacred-radial': 'radial-gradient(circle at 50% 50%, rgba(201, 162, 39, 0.1) 0%, transparent 50%)',
        'void-gradient': 'linear-gradient(180deg, #050208 0%, #0A0510 50%, #0D0518 100%)',
      },
      boxShadow: {
        'ritual': '0 0 30px rgba(201, 162, 39, 0.3), 0 0 60px rgba(201, 162, 39, 0.1)',
        'ritual-intense': '0 0 50px rgba(201, 162, 39, 0.5), 0 0 100px rgba(201, 162, 39, 0.2)',
        'seal': 'inset 0 0 20px rgba(201, 162, 39, 0.2), 0 0 30px rgba(201, 162, 39, 0.4)',
        'artifact': '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(201, 162, 39, 0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}