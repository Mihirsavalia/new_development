/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#02B89D",
        secondary: "#0281B9",
        pureWhite: "#FFF",
        pureBlack: "#000",
        errorColor: "#F8D7DA",
        warningColor: "#FFF3CD",
        infoColor: "#E7F1FF",
        defaultRed: "#B02A37",
      },
      colors: {
        primary: "#02B89D",
        whiteSmoke: "#F6F6F6",
        lightSilver: "#D8D8D8",
        lightGray: "#F4F4F4",
        slatyGrey: "#6E6D7A",
        pureWhite: "#FFF",
      },
      screens: {
        xs: "230px",
        xsm: "440px",
        sm: "640px",
        md: "768px",
        lg: "1080px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
        smFooter: "300px",
        lgFooter: "640px",
      },
    },
  },
  plugins: [],
};
