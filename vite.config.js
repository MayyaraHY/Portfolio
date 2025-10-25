import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/', // serve from GitHub Pages at /Portfolio/
  plugins: [react()],
})
