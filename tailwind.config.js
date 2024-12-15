/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tallowSansTC: ["TallowSansTC", "TallowTC"],
        bernaillo: ["Bernaillo"],
      },
      keyframes: {
        pulse: {
          "0%": {
            opacity: "0.18",
            transform: "scale(4) rotate(0deg)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(2) rotate(180deg)",
          },
          "100%": {
            opacity: "0.18",
            transform: "scale(4) rotate(360deg)",
          },
        },
        shine: {
          "0%": { transform: "translateX(-150%) rotate(-60deg)" },
          "40%": { transform: "translateX(150%) rotate(-60deg)" },
          "100%": { transform: "translateX(150%) rotate(-60deg)" },
        },
      },
      animation: {
        "pulse-slow": "pulse 55s linear infinite",
        shine: "shine 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
