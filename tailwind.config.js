// tailwind.config.js
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        secondary: colors.yellow,
        neutral: colors.trueGray,
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        firaMono: ["'Fira Mono'", "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
