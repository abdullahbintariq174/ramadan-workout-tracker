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
        'vivid-pink': '#F7418F',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 1s infinite',
        'celebrate': 'celebrate 1s ease-in-out',
      },
      keyframes: {
        celebrate: {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
