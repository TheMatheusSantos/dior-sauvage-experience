/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#010103',
        primary: '#FFFFFF',
        secondary: '#121F2F',
        accent: '#F0BD5D',
        surface: 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        display: ['Hellix', 'Arial', 'sans-serif'],
        body: ['Lato', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-widest': '0.8em',
        'architectural': '0.4em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
