/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // The whole palette lives here. Now you can write bg-paper, text-ink, border-line...
      colors: {
        paper: "#f6f0e4",       // page background (warm cream)
        sand: "#ebe1cd",        // panels and the picture stage
        line: "#d9ccb2",        // thin borders and dividers
        ink: "#1e2822",         // main text (deep green-black)
        muted: "#6b6a5e",       // quiet text
        clay: "#a84a22",        // the one accent colour (terracotta)
        "clay-dark": "#843815", // accent when hovered
      },
      fontFamily: {
        // font-display = headings, font-sans = everything else (the default)
        display: ["Fraunces", "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        pop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        pop: "pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
}
