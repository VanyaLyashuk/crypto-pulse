/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "0.5rem",
      },
      screens: {
        "hover-hover": { raw: "(hover: hover)" },
      },
      minHeight: {
        "50vh": "50vh",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        "primary-logo": "var(--logo-primary-color)",
        "primary-text": "var(--text-primary-color)",
        "secondary-text": "var(--text-secondary-color)",
        "spinner-fill": "var(--spinner-fill-color)",
        "spinner-text": "var(--spinner-text-color)",
        "delimeter-color": "var(--delimeter-color)",
        "border-color": "var(--border-color)",
        "select-border-color": "var(--select-border-color)",
        "primary-bg": "var(--primary-bg)",
        "pagination-bg": "var(--pagination-bg)",
        "skeleton-bg": "var(--skeleton-bg)",
        "filter-bg": "var(--filter-bg)",
        "select-bg": "var(--select-bg)",
        "cross-color": "var(--cross-color)",
        "typewriter-text": "var(--typewriter-text)",
        "search-bg": "var(--search-input-bg)",
        "table-head-bg": "var(--table-head-bg)",
        "table-head-color": "var(--table-head-color)",
      },
      fontFamily: {
        "pixelify-sans": ["Pixelify Sans", "serif"],
        "chakra-petch": ["Chakra Petch", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          maxWidth: "1300px",
          paddingLeft: "8px",
          paddingRight: "8px",
        },
      });
    },
  ],
};
