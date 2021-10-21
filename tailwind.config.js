// tailwind.config.js
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.yellow,
        neutral: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
