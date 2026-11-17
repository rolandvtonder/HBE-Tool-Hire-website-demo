/**
 * The site can live at a domain root ("/") or in a sub-folder such as GitHub
 * Pages' "/HBE-Tool-Hire-website-demo/". Every internal link and media path
 * goes through `u()` so both work; routes themselves stay un-prefixed.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const u = (path: string) => (path.startsWith('/') ? BASE + path : path);

export const stripBase = (path: string) => (BASE && path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path);
