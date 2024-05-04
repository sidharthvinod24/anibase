/** @type {import('tailwindcss').Config} */
// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
        body:['Montserrat']
    }},
  },
  plugins: [require("daisyui")]
}