/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Fira Code"', 'monospace'],
        signature: ['"Bitcount Prop Double"', 'monospace'],
      },
      colors: {
        theme: {
          bg: 'rgb(var(--color-bg) / <alpha-value>)',
          text: 'rgb(var(--color-text) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
        }
      },
      borderRadius: {
        card: 'var(--card-radius)',
        btn: 'var(--btn-radius)',
      },
    },
  },
  plugins: [],
}
