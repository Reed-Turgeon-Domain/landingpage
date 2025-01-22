/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        // Portrait breakpoints
        'portrait-mobile': {'raw': '(orientation: portrait) and (min-width: 480px)'},
        'portrait-tablet': {'raw': '(orientation: portrait) and (min-width: 834px)'},
        'portrait-laptop': {'raw': '(orientation: portrait) and (min-width: 1440px)'},
        
        // Landscape breakpoints
        'landscape-mobile': {'raw': '(orientation: landscape) and (min-width: 768px)'},
        'landscape-tablet': {'raw': '(orientation: landscape) and (min-width: 1024px)'},
        'landscape-desktop': {'raw': '(orientation: landscape) and (min-width: 1440px)'},
      },
    },
  },
  plugins: [],
} 