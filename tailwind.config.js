/** @type {import('tailwindcss').Config} */
// const { keyframes } = require('@angular/animations');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4356FF',
        secondary: '#AE43FF',
        neutral: '#2C2C2C',

      },
      fontFamily:{
        'sans': ['"SN Pro", sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns:{
        'flow': 'repeat(auto-fit, minmax(250px, 1fr))'
      },
      backgroundImage:{
        hero: "url('/assets/bg-landscape.jpeg')",
        rainbow: 'conic-gradient(#fd004c,#fe9000,#fff020,#3edf4b, #3363ff,#b102b7,#fd004c)',
      },
      boxShadow:{
        'glowing' :'0 0 5px #00ff40, 0 0 10px #00ff40, 0 0 15px #00ff40, 0 0 20px #00ff40'
      },
      keyframes:{
        spiner: {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(360deg)'},
        }
      },
      animation:{
        spiner: 'spiner 2s linear infinite',
      }

    },
  },
  plugins: [],
}

