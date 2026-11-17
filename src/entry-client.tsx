import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {App} from './App';
import {matchRoute} from './routes';
import {stripBase} from './lib/url';
import './index.css';

const path = stripBase(location.pathname);
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
);

// Built pages arrive prerendered — hydrate them. In dev the root is empty.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  document.title = matchRoute(path).title;
  createRoot(root).render(app);
}
