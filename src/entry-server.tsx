import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import {App} from './App';
import {NOT_FOUND, ROUTES, matchRoute} from './routes';
import {renderHead} from './seo';

/** Used by scripts/prerender.mjs to write one real HTML file per page. */
export function render(path: string) {
  const route = matchRoute(path);
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
  return {html, head: renderHead(route)};
}

export const paths = ROUTES.map((r) => r.path);
export const notFoundPath = NOT_FOUND.path;
export {SITE} from './content';
