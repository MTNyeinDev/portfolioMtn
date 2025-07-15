/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/*.js'],
  theme: {
    extend: {
      colors: {
        'galaxy-purple': '#8a2be2',
        'galaxy-blue': '#00d4ff',
        'galaxy-pink': '#ff6b6b',
        'galaxy-dark': '#0a0a0a',
        'galaxy-gray': '#1a1a1a',
        'social-github': '#6e5494',
        'social-linkedin': '#0a66c2',
        'social-instagram': '#e1306c',
        'social-twitter': '#1da1f2',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 2s linear infinite', // For loading spinner
        'particle-fade': 'particleFade 1s forwards', // New for cursor particles
        'scroll-arrow': 'scrollArrow 1.5s infinite ease-in-out', // New for scroll button
        'testimonial-fade-in': 'testimonialFadeIn 1s ease-out forwards', // New for testimonials
        'testimonial-fade-out': 'testimonialFadeOut 1s ease-out forwards', // New for testimonials
        'zoom-grow': 'zoomGrow 0.8s ease-out forwards', // Custom grow animation for WOW.js
      },
      keyframes: {
          socialHoverScale: { // New keyframe for social icons
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
         gradientShift: { // For the animating gradient border
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '200% 200%' },
        },
        downloadPulse: { // New keyframe for the download button
          '0%, 100%': { transform: 'scale(1)', 'box-shadow': '0 0 0px rgba(0,0,0,0)' },
          '50%': { transform: 'scale(1.03)', 'box-shadow': '0 0 15px rgba(138, 43, 226, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' },
        },
        particleFade: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        scrollArrow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        testimonialFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        testimonialFadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
        },
        zoomGrow: { // Custom keyframe for "small to grow"
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      backgroundImage: {
        'galaxy-gradient': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}