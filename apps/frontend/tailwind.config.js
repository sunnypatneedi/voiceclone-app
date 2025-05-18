// @ts-nocheck

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#4f46e5',
        accent: '#7c3aed',
        background: '#ffffff',
        foreground: '#1f2937',
      },
    },
  },
  plugins: [],
};
