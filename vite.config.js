import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is where the site is served from.
//  - Vercel / custom domain / user GitHub Pages (user.github.io) -> '/'
//  - Project GitHub Pages (user.github.io/repo) -> '/repo/'
// The deploy workflow sets BASE_PATH automatically; locally it defaults to '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
