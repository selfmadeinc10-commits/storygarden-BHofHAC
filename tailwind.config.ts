import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#b8dcff',
          300: '#8ac6ff',
          400: '#5aaaff',
          500: '#2c8fff',
          600: '#1774e6',
          700: '#125bb4',
          800: '#0f4a8f',
          900: '#0f3f75'
        },
        meadow: {
          400: '#34d399'
        }
      }
    }
  },
  plugins: []
}
export default config
