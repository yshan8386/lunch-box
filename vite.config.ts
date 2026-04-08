import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()
    , tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://lunch-box-be.onrender.com',  // FastAPI 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
