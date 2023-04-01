const { withMaterialColors } = require('tailwind-material-colors');

/** @type {import('tailwindcss').Config} */
module.exports = withMaterialColors(
  {
    darkMode: 'media',
    content: [
      // './app/**/*.{js,ts,jsx,tsx}',
      // './pages/**/*.{js,ts,jsx,tsx}',
      // './components/**/*.{js,ts,jsx,tsx}',

      // Or if using `src` directory:
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--outfit-font)', 'sans-serif'],
        },
      },
    },
    plugins: [require('@tailwindcss/forms')],
  },
  {
    primary: '#344E4C',
  },
);
