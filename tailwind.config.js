/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['"SN Pro", sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns:{
        'flow': 'repeat(auto-fit, minmax(260px, 1fr))'
      }
    },
  },
  plugins: [],
}

