import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    host: true,       // listen on 0.0.0.0 so ngrok can reach it
    allowedHosts: true, // allow all external hosts (ngrok, etc.)
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('motion')) {
              return 'vendor-motion';
            }
            if (id.includes('react-dom') || id.includes('react/') || id.includes('react\\')) {
              return 'vendor-framework';
            }
            if (id.includes('lenis') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
          }
        }
      }
    }
  }
})
