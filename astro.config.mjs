import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://y-labo.online',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
