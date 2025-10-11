/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // all your source files
    ],
    theme: {
      extend: {
        fontFamily: {
          HittoSushi: ['HittoSushi', 'sans-serif'],
        },
      },
    },
    plugins: [],
    darkMode: "class", // enables dark mode via 'dark' class
};
  