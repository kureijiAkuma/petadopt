/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Roboto:["Roboto", "sans-serif"],
        Familjen_Grotesk:["Familjen Grotesk", "sans-serif"]
      },
      boxShadow: {
        'custom': '-7px 7px 4px 0px rgba(0, 0, 0, 0.75)',
        'custom-2': '-4px 4px 4px 0px rgba(0, 0, 0, 0.75)',
      }

    },
  },
  plugins: [],
});

