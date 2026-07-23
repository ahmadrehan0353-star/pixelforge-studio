import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080B",
          900: "#0B0B0F",
          800: "#111116",
          700: "#17171D",
          600: "#1F1F27",
          500: "#2A2A34",
        },
        mist: {
          100: "#F7F7FA",
          300: "#C7C7D3",
          500: "#8E8EA0",
          700: "#5C5C6B",
        },
        forge: {
          indigo: "#6D5EF5",
          cyan: "#4CD9E8",
          ember: "#FF7A45",
          emberLight: "#FFA469",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "forge-gradient": "linear-gradient(135deg, #6D5EF5 0%, #4CD9E8 100%)",
        "ember-gradient": "linear-gradient(135deg, #FF7A45 0%, #FFA469 100%)",
        "mesh-radial":
          "radial-gradient(circle at 20% 20%, rgba(109,94,245,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(76,217,232,0.18), transparent 45%), radial-gradient(circle at 50% 90%, rgba(255,122,69,0.12), transparent 40%)",
      },
      boxShadow: {
        glow: "0 0 60px -15px rgba(109,94,245,0.5)",
        "glow-ember": "0 0 60px -15px rgba(255,122,69,0.45)",
        panel: "0 8px 40px -12px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
