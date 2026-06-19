import { colors } from './src/styles/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'sans-regular': ['HostGrotesk_400Regular'],
        'sans-medium': ['HostGrotesk_500Medium'],
        'sans-semibold': ['HostGrotesk_600SemiBold'],
        'sans-bold': ['HostGrotesk_700Bold'],
      },
      colors: colors
    }
  },
  // safelist: [
  //   'bg-yellow-500',
  //   'bg-teal-500',
  //   'bg-orange-500',
  //   'text-yellow-500',
  //   'text-teal-500',
  //   'text-orange-500',
  // ],
  // safelist: [
  //   {
  //     pattern: /(bg|text)-(yellow|teal|orange)-500/,
  //   },
  // ],
  plugins: [],
}