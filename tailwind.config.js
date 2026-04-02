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
        shell: "#F7F2EF",
        surface: "#FFFDFC",
        panel: "#FFFDFC",
        "panel-muted": "#F4ECE6",
        "panel-soft": "#F8F1EC",
        "primary-soft": "#F1E4E8",
        divider: "#E9DDD6",
        "text-muted": "#7B706C",
        "text-subtle": "#A0918B",
        "accent-peach": "#EDD2C0",
        "accent-lilac": "#E8E0F4",
        "accent-mint": "#DCEBDD",
        "accent-sand": "#E5D7CC",
      },
      fontFamily: {
        lora: ["Lora_600SemiBold"],
        "lora-bold": ["Lora_700Bold"],
        sans: ["SourceSans3_400Regular"],
        "sans-medium": ["SourceSans3_500Medium"],
        "sans-semibold": ["SourceSans3_600SemiBold"],
        "sans-bold": ["SourceSans3_700Bold"],
      },
    },
  },
  plugins: [],
};
