module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        starWars: "#FFE81F",
        bgPrimary: "#0E1111",
      },
      fontFamily: {
        pollorOne: ["Poller One", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        gothicOne: ["Pathway Gothic One", "sans-serif"],
      },
    },
  },
  variants: {
    scale: ["hover"],
    transform: ["hover"],
    extend: {},
  },
  plugins: [],
};
