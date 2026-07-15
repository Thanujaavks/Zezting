import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://h2iy23zjkq.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
    },
  },
})
