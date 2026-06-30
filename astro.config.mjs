import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // --- GitHub Pages (TEMPORAR) ----------------------------------------------
  // La mutarea pe domeniu propriu: schimba `site` pe domeniul real
  // si STERGE linia `base`. Restul site-ului se adapteaza automat.
  site: 'https://classick-o.github.io',
  base: '/puturi-foraje-a/', // numele repo-ului de GitHub Pages
  // --------------------------------------------------------------------------
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
