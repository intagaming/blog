const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        "surface-gray": "#121212",
        primary: colors.indigo["600"],
        "dark-white": "hsla(0, 0%, 100%, 0.87)",
        "dark-level": {
          1: "hsla(0, 0%, 100%, 0.05)",
          2: "hsla(0, 0%, 100%, 0.07)",
          3: "hsla(0, 0%, 100%, 0.08)",
          4: "hsla(0, 0%, 100%, 0.09)",
          6: "hsla(0, 0%, 100%, 0.11)",
          8: "hsla(0, 0%, 100%, 0.12)",
          12: "hsla(0, 0%, 100%, 0.14)",
          16: "hsla(0, 0%, 100%, 0.15)",
          24: "hsla(0, 0%, 100%, 0.16)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
