/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "../../packages/**/*.{js,ts,jsx,tsx,mdx}",
];
export const safelist = [
  "grid-cols-1",
  "grid-cols-2",
  {
    pattern:
      /(bg|text|border)-(primary|secondary|borders|lightBorder|buttons|secondaryButtons|whiteButtonsHover|oddRow|redColor)/,
  },
];
export const theme = {
  extend: {
    colors: {
      primary: "#464341",
      secondary: "#939090",
      borders: "#BDB8B7",
      lightBorder: "#D3D1D0",
      buttons: "#98817B",
      secondaryButtons: "#d9cdca",
      whiteButtonsHover: "#E8E8E3",
      oddRow: "#F3F2F2",
      redColor: "#fb2c36",
    },
  },
};
export const plugins = [];
