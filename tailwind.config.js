/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // "class" means dark mode turns on when <html> has the class "dark".
  // Our theme button adds and removes that class. Then every dark: variant (dark:bg-x, dark:text-y) applies.
  darkMode: "class",

  theme: {
    extend: {
      // These colours are NOT fixed hex codes. Each one points at a CSS variable (see index.css),
      // and the variable has one value for light mode and another for dark mode.
      // So bg-canvas means "paper" in light mode and "walnut" in dark mode, with no dark: needed.
      colors: {
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",               // page background
        panel: "rgb(var(--c-panel) / <alpha-value>)",                 // cards, panels, drawer
        "panel-hover": "rgb(var(--c-panel-hover) / <alpha-value>)",   // a panel under the mouse
        line: "rgb(var(--c-line) / <alpha-value>)",                   // thin dividers
        fg: "rgb(var(--c-fg) / <alpha-value>)",                       // main text
        soft: "rgb(var(--c-soft) / <alpha-value>)",                   // quiet text
        accent: "rgb(var(--c-accent) / <alpha-value>)",               // labels, prices, highlights
        "accent-hover": "rgb(var(--c-accent-hover) / <alpha-value>)",
        action: "rgb(var(--c-action) / <alpha-value>)",               // main button background
        "action-hover": "rgb(var(--c-action-hover) / <alpha-value>)",
        "on-action": "rgb(var(--c-on-action) / <alpha-value>)",       // text on the main button
      },
      fontFamily: {
        display: ["var(--font-display)"], // headings
        sans: ["var(--font-body)"],       // everything else
      },
      // Light mode is round and soft, dark mode is square. Same trick: one name, two values.
      borderRadius: {
        btn: "var(--r-btn)",
        card: "var(--r-card)",
        field: "var(--r-field)",
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
        "fade-up": "fade-up 0.55s ease-out both",
        pop: "pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
}
