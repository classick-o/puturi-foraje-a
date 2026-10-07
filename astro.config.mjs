import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// --- Domeniu: forajeputurideapa.ro (Cloudflare Pages) ------------------------
// BASE este singura sursa de adevar pentru subpath: il folosesc `base`, helper-ul
// `withBase` si linkurile interne din continut (via plugin-ul de mai jos).
// Pe domeniul propriu site-ul ruleaza la radacina, deci BASE = '/'.
const BASE = '/';
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
  site: 'https://forajeputurideapa.ro',
  base: BASE,
  markdown: {
    rehypePlugins: [rehypeInternalLinks],
  },
  integrations: [sitemap({ filter: (page) => !page.includes('/multumim') }), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
