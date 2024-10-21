/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: '#F1F9FF',
        main: '#F5F6F7',
        cat: {
          fill: '#D3EBFF',
          outline: '#C1E4FF',
          active: {
            fill: '#0C5A96',
            outline: '#0F365C',
          },
        },
        primary: {
          100: '#CBF0F9',
          200: '#9ADCF4',
          300: '#64B7DF',
          400: '#3B8DC0',
          500: '#0C5A96',
          600: '#084681',
          700: '#06346C',
          800: '#032457',
          900: '#021A48',
        },
      },
    },
  },
  plugins: [],
  corePlugin: {
    // backgroundOpacity: true,
  },
};
