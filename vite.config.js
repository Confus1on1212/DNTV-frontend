import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Amikor a fetch azt látja, hogy '/users', átirányítja a backendre
      '/users': {
        target: 'http://2.tcp.eu.ngrok.io:11408', // A backend IP-je és portja
        changeOrigin: true,
        secure: false,
      },
      '/videos': {
        target: 'http://2.tcp.eu.ngrok.io:11408',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://2.tcp.eu.ngrok.io:11408',
        changeOrigin: true,
        secure: false,
      },
      '/feedback': {
        target: 'http://2.tcp.eu.ngrok.io:11408',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})