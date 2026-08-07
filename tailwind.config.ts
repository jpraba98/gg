import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: "#09090B",
        surface: "#111111",
        card: "#1A1A1A",
        border: "#2A2A2A",
        "text-secondary": "#AAAAAA",
        drip: {
          DEFAULT: "#5BC8F5",
          50: "#EAF8FE",
          100: "#D5F1FD",
          400: "#7ED4F8",
          500: "#5BC8F5",
          600: "#2BAEE8",
          700: "#1B8FC2",
        },
        gold: {
          DEFAULT: "#D4AF37",
          400: "#E1C562",
          500: "#D4AF37",
          600: "#B3922A",
        },
        motion: {
          DEFAULT: "#8B5CF6",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-drip": "0 0 30px rgba(91, 200, 245, 0.35)",
        "glow-gold": "0 0 30px rgba(212, 175, 55, 0.35)",
        "glow-motion": "0 0 30px rgba(139, 92, 246, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
