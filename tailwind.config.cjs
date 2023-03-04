/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        gray800: '#292738',
        gray700: '#363447',
        gray600: '#4A4556',
        green700: '#28C76F',
        green300: '#81FBB8',
        red700: '#EA5455',
        red300: '#FEB692',
        purple700: '#7367F0',
        purple500: '#A66DE9',
        purple300: '#CE9FFC',
        orange300: '#DF9780',
        cyan700: '#32CCBC',
        cyan300: '#90F7EC',
      },
      keyframes: {
        up: {
          '0%': {
            height: 0,
          },
        },
      },
      animation: {
        up: 'up 1.4s',
      },
      gridTemplateRows: {
        bars: '10rem 1rem',
      },
    },
  },
  plugins: [],
}
