/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '40%': {
            transform: 'translateY(-10px) scale(1.1)',
          },
        },
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        slideInFromRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInFromLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '0.4',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(102, 126, 234, 0.6)',
          },
        },
      },
      animation: {
        bounce: 'bounce 1.4s infinite ease-in-out',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        slideInFromRight: 'slideInFromRight 0.5s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(102, 126, 234, 0.3)',
        'glow-lg': '0 0 40px rgba(102, 126, 234, 0.6)',
      },
    },
  },
  plugins: [],
}
