/**
 * Writes one fully rendered HTML file per page into dist/, plus 404.html,
 * sitemap.xml and robots.txt — so every page is real HTML for search engines.
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const {render, paths, notFoundPath, SITE} = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const page = (path) => {
  const {html, head} = render(path);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
};

for (const p of paths) {
  const out = join(dist, p, 'index.html');
  mkdirSync(dirname(out), {recursive: true});
  writeFileSync(out, page(p));
  console.log('  prerendered', p);
}
writeFileSync(join(dist, '404.html'), page(notFoundPath));
console.log('  prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : p.split('/').length > 3 ? '0.8' : '0.7'}</priority></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log('  wrote sitemap.xml + robots.txt');

rmSync(join(root, 'dist-ssr'), {recursive: true, force: true});
