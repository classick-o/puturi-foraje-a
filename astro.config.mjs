import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// --- GitHub Pages (TEMPORAR) ------------------------------------------------
// Subpath-ul sub care ruleaza site-ul. Este singura sursa de adevar:
// il folosesc si `base`, si helper-ul `withBase`, si linkurile interne din
// continut (via plugin-ul de mai jos). La mutarea pe domeniu propriu:
// schimba `site` pe domeniul real si seteaza BASE = '/'.
const BASE = '/puturi-foraje-a/';
// ---------------------------------------------------------------------------

// Prefixeaza automat linkurile interne din Markdown (ex: /servicii/...) cu BASE,
// ca sa functioneze pe GitHub Pages fara sa scriem subpath-ul de mana in continut.
function rehypeInternalLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = node.properties?.href;
        if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
          node.properties.href = BASE + href.replace(/^\/+/, '');
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://classick-o.github.io',
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeInternalLinks],
  },
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
