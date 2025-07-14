/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src//*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0ch' },
          '100%': { width: '32ch' }, // Adjust based on your text length
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        },
      },
      animation: {
        typing: 'typing 3s steps(32) forwards',
        blink: 'blink 0.7s step-end infinite',
      },
    },
  },
  plugins: [],
}