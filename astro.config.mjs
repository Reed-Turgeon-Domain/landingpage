import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  // Define the production site URL
  site: 'https://reedturgeon.com',
  // Set the base path for the site (/ means root)
  base: '/',
})