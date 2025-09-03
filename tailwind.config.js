/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#223843",   // für Überschriften, Haupttext
        background: "#EFF1F3",    // für Seitenhintergrund
        accent1: "#DBD3D8",       // für Sektionen, Cards, leichte Flächen
        accent2: "#D8B4A0",       // für Buttons, Icons, kleine Flächen
        accent3: "#D77A61",       // für Call-to-Action, Hover, Highlights
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        signature: ['Great Vibes', 'cursive'],
        boston: ['BOSTON CAPS', 'sans-serif'],
        kinddaily: ['KINDDAILY', 'sans-serif'],
        nasa: ['NASA', 'sans-serif'],
        hype: ['HYPE', 'sans-serif'],
      },
      keyframes: {
        codeFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
          '20%, 22%, 24%, 55%': { opacity: 0.3 },
        },
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        rgbGlitch: {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)', transform: 'translate(0)' },
          '20%': { clipPath: 'inset(10% 0 85% 0)', transform: 'translate(-2px, 2px)' },
          '40%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(2px, -2px)' },
          '60%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(-1px, 1px)' },
          '80%': { clipPath: 'inset(30% 0 50% 0)', transform: 'translate(1px, -1px)' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow:
              '0 0 2px #275DAD,'
              + '0 0 4px #275DAD,'
              + '0 0 8px #275DAD,'
              + '0 0 16px #275DAD,'
              + '0 0 32px #275DAD',
            opacity: 1,
      },
          '20%, 22%, 24%, 55%': {
            textShadow: 'none',
            opacity: 0.4,
          },
        },
        floatUp: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.6 },
        },
        float1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-15px, 25px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 10px)' },
        },
      },
      animation: {
        'code-flicker': 'codeFlicker 1.2s infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.8s ease-out forwards',
        glitch: 'glitch 0.4s infinite',
        'rgb-glitch': 'rgbGlitch 1s infinite',
        'neon-flicker': 'neonFlicker 2s infinite',
        'float-up': 'floatUp 3s infinite',
        'pulse-slow': 'pulseSlow 4s infinite ease-in-out',
        'float-1': 'float1 8s infinite ease-in-out alternate',
        'float-2': 'float2 10s infinite ease-in-out alternate-reverse',
        'float-3': 'float3 12s infinite ease-in-out alternate',
      },
    },
  },
  plugins: [],
};
