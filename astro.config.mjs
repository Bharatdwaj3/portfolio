import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/profile': { target: 'http://localhost:9000', rewrite: (path) => path.replace(/^\/api\/profile/, '/profile') },
        '/api/projects': { target: 'http://localhost:9000', rewrite: (path) => path.replace(/^\/api\/projects/, '/projects') },
        '/api/skills': { target: 'http://localhost:9000', rewrite: (path) => path.replace(/^\/api\/skills/, '/skills') },
      },
    },
  },
  integrations: [react()],
});