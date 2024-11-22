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
        primaryLight: 'var(--color-primary-light)',
        secondaryLight: 'var(--color-secondary-light)',
        primaryDark: 'var(--color-primary-dark)',
        secondaryDark: 'var(--color-secondary-dark)',
        primaryAccent: 'var(--color-primary-accent)',
        secondaryAccent: 'var(--color-secondary-accent)',
        tertiaryAccent: 'var(--color-tertiary-accent)',
        accentTeal: 'var(--color-accent-teal)',
        accentRed: 'var(--color-accent-red)',
        accentGreen: 'var(--color-accent-green)',
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        sans: ['Lufga', 'sans-serif'],
        serif: ['Aspira', 'serif'],
      },
    },
  },
  plugins: [],
}

