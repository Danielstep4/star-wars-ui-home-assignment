module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        starWars: "#FFE81F",
        bgPrimary: "#0E1111",
        starWarsDark: "#8f8000",
        starWarsLight: "#fef38f",
      },
      fontFamily: {
        pollorOne: ["Poller One", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        gothicOne: ["Pathway Gothic One", "sans-serif"],
      },
      screens: {
        "2xl": "1600px",
      },
    },
  },
  variants: {
    scale: ["hover"],
    transform: ["hover"],
    extend: {
      borderRadius: ["hover"],
    },
  },
  plugins: [],
};
