/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: "#000",
      },
      textColor: {
        dark: "#fff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
