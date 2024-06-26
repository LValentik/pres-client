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
        'presloviny-blue': '#081A2D',
        'presloviny-gold': '#F1B224',
        'presloviny-ligthBlue': '#093454',
        'presloviny-darkBlue': '#090B22',
        'presloviny-light': '#0E5081',
        'presloviny-gray': '#4B4D53',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
  variants: {
    extend: {},
  },
};