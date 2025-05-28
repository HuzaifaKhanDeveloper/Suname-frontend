/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '700px', 
        'lg': '1024px', 
        'xl': '1280px', 
        '2xl': '1536px', 
      },
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        ocean: {
          light: {
            100: '#ffdab9',
            200: '#ffb090',
            300: '#ff7f50',
            400: '#ff6347',
            500: '#87ceeb',
          },
          dark: {
            100: '#2c5c7d',
            200: '#1e3d59',
            300: '#152c40',
            400: '#0a1929',
            500: '#000033',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ocean-light': 'linear-gradient(135deg, #ffdab9, #ff7f50, #87ceeb)',
        'ocean-dark': 'linear-gradient(135deg, #1e3d59, #000033, #1e3d59)',
        'wave-light': 'radial-gradient(circle at 50% 100%, rgba(255, 127, 80, 0.2), rgba(135, 206, 235, 0.1))',
        'wave-dark': 'radial-gradient(circle at 50% 100%, rgba(30, 61, 89, 0.3), rgba(0, 0, 51, 0.2))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
        'ping-slow': 'ping 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ocean-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};