/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#464341",
        secondary: "#939090",
        borders: "#CDCBCB",
        buttons: "#98817B",
        secondaryButtons: "#d9cdca",
        whiteButtonsHover: "#efeeec",
        redColor: "#fb2c36",
      },
      screens: {
        xxs_xs:'450px',
        productImageH:'500px',
        xs_sm: "550px",
        lg_xl: "1155px",
      },
    },
  },
  plugins: [],
};
