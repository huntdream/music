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
        around: '0 10px 38px -10px #0e121659,0 10px 20px -15px #0e121633',
      },
    },
  },
  plugins: [],
};
