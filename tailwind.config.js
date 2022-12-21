/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    minWidth: {
        1: '8rem', 
        2: '15rem'
    },
    minHeight: {
      1: '3rem',
      2: '2rem'
    },
    extend: {},
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
}
