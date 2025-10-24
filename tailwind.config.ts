import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        baso: {
          50: "#f1f8f5",
          100: "#dbeee3",
          200: "#b4dcc8",
          300: "#86c3a7",
          400: "#59a886",
          500: "#3b8f6e",
          600: "#2b7257",
          700: "#225947",
          800: "#1d4638",
          900: "#16352c"
        },
        ozeano: {
          50: "#edf6ff",
          100: "#d0e7ff",
          200: "#a1ceff",
          300: "#6daeff",
          400: "#3d8bff",
          500: "#186aff",
          600: "#0f4bd6",
          700: "#0e3aaa",
          800: "#0e3186",
          900: "#0e2a6c"
        },
        harea: {
          50: "#f9f5f1",
          100: "#efe1d0",
          200: "#e2c5a1",
          300: "#d2a56d",
          400: "#c08543",
          500: "#a7682d",
          600: "#855022",
          700: "#643b1c",
          800: "#452915",
          900: "#2d1a0d"
        }
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
