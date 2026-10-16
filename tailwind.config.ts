import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F33",
          deep: "#081729",
        },
        ink: {
          DEFAULT: "#1A2330",
          muted: "#5C6573",
        },
        kabuki: {
          DEFAULT: "#C91F2B",
          soft: "#D45A62",
        },
        paper: {
          DEFAULT: "#FBF8F2",
          gray: "#F3F1EC",
          warm: "#F4EFE6",
        },
        line: "#E4DFD6",
      },
      fontFamily: {
        sans: ["var(--font-bengali)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-bengali)", "var(--font-display)", "Georgia", "serif"],
        bengali: ["var(--font-bengali)", "var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
        prose: "68ch",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
      },
      boxShadow: {
        navy: "0 10px 28px rgba(11, 31, 51, 0.06)",
        "navy-sm": "0 2px 10px rgba(11, 31, 51, 0.04)",
      },
      fontSize: {
        eyebrow: [
          "11px",
          { lineHeight: "1", fontWeight: "600", letterSpacing: "0.16em" },
        ],
        h1: [
          "clamp(2.6rem, 5.2vw, 4.15rem)",
          { lineHeight: "1.08", fontWeight: "500", letterSpacing: "-0.02em" },
        ],
        h2: [
          "clamp(2rem, 3.4vw, 2.85rem)",
          { lineHeight: "1.18", fontWeight: "500", letterSpacing: "-0.018em" },
        ],
      },
      spacing: {
        section: "120px",
        "section-sm": "72px",
        nav: "76px",
        "nav-sm": "64px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        spinner: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinner: "spinner 0.7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
