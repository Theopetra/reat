module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      headerBold: ["DMSansBold"],
      headerBoldItalic: ["DMSansBoldItalic"],
      textItalic: ["DMSansItalic"],
      textMedium: ["DMSansMedium"],
      textMediumItalic: ["DMSansMediumItalic"],
      textRegular: ["DMSansRegular"],
      headerRax: ["RaxtorRegular"],
    },
    extend: {
      colors: {
        lightGreen: "#95C95B",
        darkGreen: "#54930E",
        lightGray: "#C2C2C2",
        lightYellow: "#E5BD4D",
        darkYellow: "#CF9940",
        lightBlack: "#262626",
      },
      backgroundImage: {
        home: "url('/images/Home.png')",
      },
    },
  },
  plugins: [],
};
