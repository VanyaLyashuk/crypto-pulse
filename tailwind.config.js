/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
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
        'second-primary': '#14b8a6',
        'coinGold': 'rgb(254 220 10)',
        'darkModeBg': '#22232a',
        'darkModeBgLighter': '#374151',
        'darkModeBgDarker': '#18181b',
        'darkModeText': '#d4d4d4',
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

