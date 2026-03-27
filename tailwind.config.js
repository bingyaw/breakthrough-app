/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#F7F4EF",
        accent: "#E63329",
        "card-bg": "#FFFFFF",
        "dark-bg": "#1A1A1A",
        "dark-card": "#2A2A2A",
        "dark-surface": "#333333",
      },
      fontFamily: {
        sans: ["DMSans_400Regular"],
        "sans-medium": ["DMSans_500Medium"],
        "sans-bold": ["DMSans_700Bold"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
