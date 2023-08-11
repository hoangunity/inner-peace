/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/universe.png')",
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
