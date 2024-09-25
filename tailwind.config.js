/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        secondary: '#65676b',
      },
      animation: {
        'slide-in': 'slideIn 500ms ease-in-out',
      },
    },
  },
  plugins: [],
};
