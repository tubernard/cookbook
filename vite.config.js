import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), eslint()],
  root: 'client',
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
  },
});
