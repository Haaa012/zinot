/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bottoncolor: 'var(--primary-color)',
        success: 'var(--success-color)',
        bgortext: 'var(--text-color)',
        primary: 'var(--violet-color)', 
        second : 'var(--black-color)',
        third :  'var(--red-color)'
      },
    },
  },
  plugins: [],
}

