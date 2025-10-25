module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        brand: "hsl(210, 90%, 56%)",
        ink: "hsl(222, 47%, 11%)",
        muted: "hsl(215, 16%, 47%)",
        surface: "hsl(210, 20%, 98%)",
      },
      boxShadow: {
        elev: "0 10px 30px -12px rgba(0,0,0,.12)",
      },
    },
  },
  plugins: [],
};
