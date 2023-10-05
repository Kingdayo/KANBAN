/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'big': {'max': '1300px'},
      // => @media (max-width: 1300px) { ... }

      'md': {'max': '1030px'},
      // => @media (max-width: 1030px) { ... }
      'mobile': {'max': '767px'},
      // => @media (max-width: 767px) { ... }
    }, 
    extend: {
      colors : {
        primary : {
          100 : '#2B2C37',
          200 : '#20212C'
        },
        secondary : '#828FA3',
        line : '#3E3F4E',
        tertiarty : {
          100 : '#A8A4FF',
          200: '#635FC7',
        }
      },
      borderWidth : {
        small : '0.05em'
      },
      minWidth: {
        tasks : '18em'
      },
      width: {
        column : '300px',
        zero: '0%'
      },
      content: {
        addTask : "url('./assets/icon-add-task-mobile.svg')"
      },
      inset:{
        'small' : '8.333333%'
      }
    },
  },
  plugins: [],
}
