/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 'media' না, 'class' ব্যবহার করা হবে
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
