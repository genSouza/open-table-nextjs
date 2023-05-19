/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      "2xs": ".625rem",
      xsm: ".75rem",
      sm: ".813rem",
      reg: ".938rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.375rem",
      "3xl": "1.563rem",
      "4xl": "2rem",
      "5xl": "2.5rem",
      "6xl": "3.125rem",
      "7xl": "4.375rem",
    },
  },
  plugins: [],
};
