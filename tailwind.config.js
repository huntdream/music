/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        secondary: '#65676b',
        active: '#eff2f5',
      },
      animation: {
        'slide-in': 'slideIn 500ms ease-in-out',
      },
      boxShadow: {
        around: '0 1px 4px #808d9a59',
      },
    },
  },
  plugins: [],
};
