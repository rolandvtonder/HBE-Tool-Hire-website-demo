import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // "/" for a normal domain; the GitHub Pages workflow sets BASE_PATH to the repo sub-folder.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Photos and the hero film live in public/media and are served as-is.
    target: 'es2020',
  },
});
