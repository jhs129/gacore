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

// :root {
//   --color-primary-light: #FFFFFF;
//   --color-primary-dark: #343A40;
//   --color-accent-red: #F1696D;
//   --color-accent-green: #5B794E;
//   --color-accent-teal: #037E88;
//   --text-color-body-text-primary: #037E88;
//   --color-tertiary: #D4EBF0;
//   --color-quaternary: #8F3536;
//   --font-primary: 'Lora', sans-serif;
//   --font-secondary: 'Inter', sans-serif;
//   --spacing-xl: 32px;
//   --spacing-lg: 16px;
//   --spacing-md: 8px;
//   --spacing-sm: 4px;
//   --spacing-xs: 2px;
// }