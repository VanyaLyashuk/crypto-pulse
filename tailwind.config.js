/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        'hover-hover': {'raw': '(hover: hover)'}
      },
      minHeight: {
        '50vh': '50vh'
      },
      colors: {
        'primary': '#e76e4e',
      },
      fontFamily: {
        'pixelify-sans': ['Pixelify Sans', 'serif']
      }
    },
  },
  plugins: [],
}

