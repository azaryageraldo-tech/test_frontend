/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Mengaktifkan dark mode manual via class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // mendukung semua file JS/TS/React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // biru Tailwind (blue-600)
        dark: {
          DEFAULT: "#1f2937", // gray-800
          text: "#d1d5db",    // gray-300
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
}
