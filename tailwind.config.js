/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'light': '#99DDDD',
        'semilight': '#559999',
        'dark': '#160916',
        'darker': '#090209',
        'semidark': '#363629',
      },
    },
  },
  plugins: [],
}
