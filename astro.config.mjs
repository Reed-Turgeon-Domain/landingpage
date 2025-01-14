import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import partytown from '@astrojs/partytown' // optimizing third-party scripts

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    partytown({
      config: {
        // Forward specific functions from main thread to web worker
        // In this case, forwarding dataLayer.push for Google Tag Manager
        forward: ['dataLayer.push'],
      },
    }),
  ],
  // Define the production site URL
  site: 'https://reedturgeon.com',
  // Set the base path for the site (/ means root)
  base: '/',
})