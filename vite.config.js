import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Betöltjük a .env fájlokat a process.cwd() könyvtárból
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        // A proxy a környezeti változóból olvassa be a célt
        '/users': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/videos': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/admin': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/feedback': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})