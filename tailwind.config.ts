import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        core: {
          bg: "#0A0E14",
          panel: "#131923",
          panel2: "#1A2230",
          line: "#252E3D",
          text: "#E7ECF2",
          muted: "#8894A6",
        },
        jarvis: { DEFAULT: "#3E8EFF", dim: "#1E3A5F" },
        friday: { DEFAULT: "#E8546B", dim: "#4A2430" },
        edith: { DEFAULT: "#9D7CFF", dim: "#332B54" },
        suite: { DEFAULT: "#4EC9C0", dim: "#1D3B39" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, #1A222E 1px, transparent 1px), linear-gradient(to bottom, #1A222E 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "spin-slower": "spin 40s linear infinite reverse",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
