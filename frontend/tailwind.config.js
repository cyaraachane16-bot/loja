/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shein: {
          black: '#000000',
          cream: '#f3ede6',
          brown: '#5c3d2e',
          red: '#c73636',
          gold: '#9a7349',
          'gray-mid': '#b0b0b0',
          'gray-light': '#f2f2f2',
          'gray-bg': '#f6f6f6',
        },
      },
      borderRadius: {
        shein: '4px',
      },
      maxWidth: {
        shein: '1420px',
      },
    },
  },
  plugins: [],
}
