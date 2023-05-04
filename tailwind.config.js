/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins, sans-serif'
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)'},
          'to': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)'},
        }
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-in-out',
      }
    }
  },
  plugins: [],
}

