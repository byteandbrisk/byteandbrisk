/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: '#2D6AE3',
          light: '#5A8AED',
          dark: '#1E4BA8',
        },
        mint: {
          DEFAULT: '#1CD6A0',
          light: '#4ADEB5',
          dark: '#13A37A',
        },
        iris: {
          DEFAULT: '#7B61FF',
          light: '#9B85FF',
          dark: '#5A3FCC',
        },
        ink: '#0F172A',
        graphite: '#334155',
        mist: '#94A3B8',
        base: '#F5F8FA',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-drift': 'gradientDrift 12s ease-in-out infinite',
      },
      keyframes: {
        gradientDrift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

