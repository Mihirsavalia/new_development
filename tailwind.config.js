/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
        xs: "440px"
      }
    },
  },
  plugins: [],
}
