// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // dev-server options
  server: {
    proxy: {
      '/api': 'http://localhost:4000'   // <-- Express runs here
    }
  }
});
