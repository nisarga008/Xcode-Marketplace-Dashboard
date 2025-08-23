/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dceeff',
          200: '#b9ddff',
          300: '#86c4ff',
          400: '#4ea6ff',
          500: '#1e86ff',
          600: '#1568db',
          700: '#124fb0',
          800: '#123f8a',
          900: '#12366f'
        }
      }
    }
  },
  plugins: []
};
