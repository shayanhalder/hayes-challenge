import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_BACKEND': JSON.stringify(process.env.VITE_BACKEND)
  },
  build: {
    outDir: 'dist', // default, ensures output directory is `dist`
  },
})
