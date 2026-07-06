import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sour Lemon Brand
        yellow: {
          DEFAULT: "#F5E020",
          50:  "#FFFEE0",
          100: "#FFFBC0",
          200: "#FFF580",
          300: "#FFEE40",
          400: "#F5E020",
          500: "#D4C010",
          600: "#A89800",
          700: "#7C7000",
          800: "#504800",
          900: "#242000",
        },
        // Dark Background Scale
        bg: {
          DEFAULT: "#04040C",
          50:  "#0E0E1E",
          100: "#0A0A18",
          200: "#080812",
          300: "#06060F",
          400: "#04040C",
          500: "#030308",
          600: "#020205",
        },
        // Surface / Glass
        surface: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover:   "rgba(255,255,255,0.07)",
          active:  "rgba(255,255,255,0.10)",
          border:  "rgba(255,255,255,0.08)",
          "border-strong": "rgba(255,255,255,0.14)",
        },
        // Text Scale
        text: {
          primary:   "#EEEEF2",
          secondary: "#8888A4",
          muted:     "#505068",
          disabled:  "#303048",
        },
        // Brand Accent
        accent: {
          yellow: "#F5E020",
          "yellow-glow": "rgba(245,224,32,0.25)",
          "yellow-dim":  "rgba(245,224,32,0.08)",
          "yellow-mid":  "rgba(245,224,32,0.15)",
          blue:   "#4A6CF7",
          purple: "#8B5CF6",
          green:  "#10B981",
          red:    "#EF4444",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono:  ["var(--font-mono)",  "SF Mono", "ui-monospace", "Courier New", "monospace"],
        display: ["var(--font-inter)", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(52px, 7vw, 96px)", { lineHeight: "1.02", letterSpacing: "-3px", fontWeight: "900" }],
        "display-xl":  ["clamp(40px, 5.5vw, 80px)", { lineHeight: "1.04", letterSpacing: "-2.5px", fontWeight: "800" }],
        "display-lg":  ["clamp(32px, 4vw, 64px)",   { lineHeight: "1.06", letterSpacing: "-2px",   fontWeight: "800" }],
        "display-md":  ["clamp(26px, 3vw, 48px)",   { lineHeight: "1.1",  letterSpacing: "-1.5px", fontWeight: "700" }],
        "display-sm":  ["clamp(20px, 2vw, 32px)",   { lineHeight: "1.15", letterSpacing: "-1px",   fontWeight: "700" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow":       "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(245,224,32,0.09) 0%, transparent 60%)",
        "card-shine":      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
        "yellow-gradient": "linear-gradient(125deg, #F5E020 0%, #FFD700 50%, #FFE840 100%)",
      },
      boxShadow: {
        "yellow-sm":  "0 0 16px rgba(245,224,32,0.2)",
        "yellow-md":  "0 0 40px rgba(245,224,32,0.15)",
        "yellow-lg":  "0 0 80px rgba(245,224,32,0.1)",
        "glass":      "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg":   "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card":       "0 4px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,224,32,0.12)",
      },
      animation: {
        "pulse-slow":   "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float":        "float 6s ease-in-out infinite",
        "float-delay":  "float 6s ease-in-out infinite 2s",
        "glow-pulse":   "glowPulse 3s ease-in-out infinite",
        "spin-slow":    "spin 20s linear infinite",
        "bounce-slow":  "bounce 3s ease-in-out infinite",
        "fade-up":      "fadeUp 0.6s ease forwards",
        "fade-in":      "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245,224,32,0.2)" },
          "50%":      { boxShadow: "0 0 60px rgba(245,224,32,0.5)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
