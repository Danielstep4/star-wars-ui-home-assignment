module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        starWars: "#FFE81F",
        bgPrimary: "0E1111",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
