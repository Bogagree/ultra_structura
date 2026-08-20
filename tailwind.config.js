module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        primary: {
          100: '#FFF8E7',
          200: '#F5E6B8',
          300: '#E8D08A',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#A8871F',
          700: '#7A6216',
          800: '#524110',
          900: '#2E2509',
        },
        gray: {
          100: '#FBF8F1',
          200: '#F0EBE0',
          300: '#E4DDD0',
          400: '#C9C0B0',
          500: '#A39886',
          600: '#7A7164',
          700: '#524A40',
          800: '#352F29',
          900: '#1C1915',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  plugins: [],
};
