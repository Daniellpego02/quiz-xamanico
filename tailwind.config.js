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
      },
      colors: {
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        orange: {
            500: '#FF9500', // High conversion orange
            600: '#EA580C',
        },
        mystic: {
          900: '#0F0821', // Darker, deeper purple base
          800: '#1E1245',
          700: '#302060',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 2s infinite',
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
        }
      }
    },
  },
  plugins: [],
}