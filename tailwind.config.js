/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '640px',
      lg: '992px',
    },
    
    extend: {
      colors: {
        primaryLight: 'var(--color-primary-light, #FFFFFF)',
        secondaryLight: 'var(--color-secondary-light)',
        primaryDark: 'var(--color-primary-dark, #000000)',
        secondaryDark: 'var(--color-secondary-dark)',
        primaryAccent: 'var(--color-primary-accent, #FFD166)',
        secondaryAccent: 'var(--color-secondary-accent, #06D6A0)',
        tertiaryAccent: 'var(--color-tertiary-accent, #118AB2)',
        accentTeal: 'var(--color-accent-teal, #06D6A0)',
        accentRed: 'var(--color-accent-red, #EF476F)',
        accentGreen: 'var(--color-accent-green, #06D6A0)',
      },
      fontFamily: {
        sans: ['Lufga', 'sans-serif'],
        serif: ['Aspira', 'serif'],
      },
    },
  },
  plugins: [],
}

