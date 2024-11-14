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
        primaryLight: '#FFF',
        secondaryLight: '#F8F9FA',
        primaryDark: '#000',
        secondaryDark: '#343A40',
        primaryAccent: '#CF4B08',
        secondaryAccent: '#037E88',
        tertiaryAccent: '#343A40',
      },
      fontFamily: {
        sans: ['Lufga', 'sans-serif'],
        serif: ['Aspira', 'serif'],
      },
    },
  },
  plugins: [],
}