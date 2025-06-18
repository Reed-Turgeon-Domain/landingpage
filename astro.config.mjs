import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  // Define the production site URL
  site: 'https://reedturgeon.com',
  // Set the base path for the site (/ means root)
  base: '/',
})