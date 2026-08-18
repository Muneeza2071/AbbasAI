import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8081,
    allowedHosts: true,
    proxy: { '/api': 'http://127.0.0.1:3000' },
  },
  preview: { host: true, port: 8081, allowedHosts: true },
  build: { outDir: 'dist-web' },
});
