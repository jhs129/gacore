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
        primaryAccent: 'var(--color-accent-green)',
        secondaryAccent: 'var(--color-light-green)',
        tertiaryAccent: 'var(--color-tertiary-accent)',
        accentTeal: 'var(--color-accent-teal)',
        accentRed: 'var(--color-accent-red)',
        accentGreen: 'var(--color-accent-green)',
        'brand-green': '#58784d',
        ink: '#302f2e',
      },
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
        sans: ['Lufga', 'sans-serif'],
        serif: ['PT Serif', 'serif'],
      },
      boxShadow: {
        card: '0 0 4px rgba(48,47,46,0.1)',
        'card-hover': '0 4px 12px rgba(48,47,46,0.15)',
      },
    },
  },
  plugins: [],
}

