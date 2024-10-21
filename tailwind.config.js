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
        padding: '0.5rem',
      },
      screens: {
        'hover-hover': {'raw': '(hover: hover)'}
      },
      minHeight: {
        '50vh': '50vh'
      },
      colors: {
        'primary': '#ffaf0f',
        'coinGold': 'rgb(254 220 10)',
      },
      fontFamily: {
        'pixelify-sans': ['Pixelify Sans', 'serif']
      }
    },
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: '1300px',
          paddingLeft: '8px',
          paddingRight: '8px',
        }
      });
    },
  ],
}

