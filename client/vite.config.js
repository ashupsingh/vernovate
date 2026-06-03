import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Suppress noisy ECONNRESET errors when backend restarts mid-request
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            console.warn(`[proxy] ${err.code || err.message} — backend may be restarting`);
            if (res && !res.headersSent) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Backend unavailable, retrying...' }));
            }
          });
        },
      },
    },
  },
})
