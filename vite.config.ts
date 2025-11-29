import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: './client',
  publicDir: '../Frontend-Full/public',
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './Frontend-Full/src'),
      'next/link': path.resolve(__dirname, './client/shims/next-link.tsx'),
      'next/head': path.resolve(__dirname, './client/shims/next-head.tsx'),
      'next/router': path.resolve(__dirname, './client/shims/next-router.tsx'),
      'src/config-global': path.resolve(__dirname, './client/config.ts'),
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    exclude: ['@next/font'],
  },
});
