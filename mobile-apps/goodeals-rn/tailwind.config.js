/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter100: ['Inter_100Thin'],
        'inter-thin': ['Inter_100Thin'],
        inter200: ['Inter_200ExtraLight'],
        'inter-extra-light': ['Inter_200ExtraLight'],
        inter300: ['Inter_300Light'],
        'inter-light': ['Inter_300Light'],
        inter: ['Inter_400Regular'],
        inter400: ['Inter_400Regular'],
        'inter-regular': ['Inter_400Regular'],
        inter500: ['Inter_500Medium'],
        'inter-medium': ['Inter_500Medium'],
        inter600: ['Inter_600SemiBold'],
        'inter-semi-bold': ['Inter_600SemiBold'],
        inter700: ['Inter_700Bold'],
        'inter-bold': ['Inter_700Bold'],
        inter800: ['Inter_800ExtraBold'],
        'inter-extra-bold': ['Inter_800ExtraBold'],
        inter900: ['Inter_900Black'],
        'inter-black': ['Inter_900Black'],
        raleway100: ['Raleway_100Thin'],
        'raleway-thin': ['Raleway_100Thin'],
        raleway200: ['Raleway_200ExtraLight'],
        'raleway-extra-light': ['Raleway_200ExtraLight'],
        raleway300: ['Raleway_300Light'],
        'raleway-light': ['Raleway_300Light'],
        raleway: ['Raleway_400Regular'],
        raleway400: ['Raleway_400Regular'],
        'raleway-regular': ['Raleway_400Regular'],
        raleway500: ['Raleway_500Medium'],
        'raleway-medium': ['Raleway_500Medium'],
        raleway600: ['Raleway_600SemiBold'],
        'raleway-semi-bold': ['Raleway_600SemiBold'],
        raleway700: ['Raleway_700Bold'],
        'raleway-bold': ['Raleway_700Bold'],
        raleway800: ['Raleway_800ExtraBold'],
        'raleway-extra-bold': ['Raleway_800ExtraBold'],
        raleway900: ['Raleway_900Black'],
        'raleway-black': ['Raleway_900Black'],
        raleway100_italic: ['Raleway_100Thin_Italic'],
        'raleway-thin-italic': ['Raleway_100Thin_Italic'],
        raleway200_italic: ['Raleway_200ExtraLight_Italic'],
        'raleway-extra-light-italic': ['Raleway_200ExtraLight_Italic'],
        raleway300_italic: ['Raleway_300Light_Italic'],
        'raleway-light-italic': ['Raleway_300Light_Italic'],
        ralewayitalic: ['Raleway_400Regular_Italic'],
        raleway400_italic: ['Raleway_400Regular_Italic'],
        'raleway-regular-italic': ['Raleway_400Regular_Italic'],
        raleway500_italic: ['Raleway_500Medium_Italic'],
        'raleway-medium-italic': ['Raleway_500Medium_Italic'],
        raleway600_italic: ['Raleway_600SemiBold_Italic'],
        'raleway-semi-bold-italic': ['Raleway_600SemiBold_Italic'],
        raleway700_italic: ['Raleway_700Bold_Italic'],
        'raleway-bold-italic': ['Raleway_700Bold_Italic'],
        raleway800_italic: ['Raleway_800ExtraBold_Italic'],
        'raleway-extra-bold-italic': ['Raleway_800ExtraBold_Italic'],
        raleway900_italic: ['Raleway_900Black_Italic'],
        'raleway-black-italic': ['Raleway_900Black_Italic'],
      },
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
    backgroundOpacity: true,
  },
};
