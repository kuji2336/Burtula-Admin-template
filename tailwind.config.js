module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        main: {
          light: '#f5a479',
          DEFAULT: '#f48245',
          dark: '#b34206',
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
