import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signin: resolve(__dirname, 'sign-in.html'),
        workspaces: resolve(__dirname, 'workspaces.html'),
        showcase: resolve(__dirname, 'showcase.html'),
      },
    },
  },
});
