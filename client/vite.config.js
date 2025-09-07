import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react(), eslint()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    };
  } else {
    return {
      plugins: [react()],
      build: {
        outDir: 'dist',
      },
    };
  }
});
