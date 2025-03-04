/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-cream': '#FFF3C7',
        'soft-peach': '#FEC7B4',
        'soft-pink': '#FC819E',
        'vivid-pink': '#F7418F'
      },
      fontFamily: {
        'sans': ['Segoe UI', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
