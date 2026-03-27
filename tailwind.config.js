/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Keep these tokens aligned with constants/theme.ts.
      colors: {
        wine: "#5B0F2A",
        charcoal: "#14151B",
        "warm-nude": "#D2B6A4",
        "skin-beige": "#E8D8CF",
        cream: "#FAF7F8",
      },
    },
  },
  plugins: [],
};
