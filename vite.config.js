import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Amikor a fetch azt látja, hogy '/users', átirányítja a backendre
      '/users': {
        target: 'http://192.168.9.105:4000', // A backend IP-je és portja
        changeOrigin: true,
        secure: false,
      }
    }
  }
})