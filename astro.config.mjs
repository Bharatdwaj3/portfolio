// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/profile': { target: 'http://localhost:9001', rewrite: (path) => path.replace(/^\/api\/profile/, '') },
        '/api/projects': { target: 'http://localhost:9003', rewrite: (path) => path.replace(/^\/api\/projects/, '') },
        '/api/skills': { target: 'http://localhost:9002', rewrite: (path) => path.replace(/^\/api\/skills/, '') },
      },
    },
  },
  integrations: [react()],
});
