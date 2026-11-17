# HBE Tool Hire & Rentals — website

Multi-page marketing site for HBE Tool Hire & Rentals, Durban. Vite + React + TypeScript + Tailwind v4, with Lenis smooth scrolling. Every page is **prerendered to real HTML** at build time for search engines.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # builds + prerenders every page into dist/
npm run preview   # serves dist/ locally
npm run lint      # type check
```

`dist/` is a plain static site. Upload it to any static host (Netlify, Cloudflare Pages, Vercel, cPanel `public_html`). The host should serve `404.html` for unknown URLs (most do automatically).

### GitHub Pages demo

`.github/workflows/deploy.yml` builds and publishes the site to GitHub Pages on every push to `main`. It's served at `https://rolandvtonder.github.io/HBE-Tool-Hire-website-demo/`. One-time setup: in the repo go to **Settings → Pages → Source: GitHub Actions**.

The workflow builds with `BASE_PATH=/<repo-name>/` so the site works from that sub-folder. Every internal link and media path goes through `u()` in `src/lib/url.ts`. On a real domain, build without `BASE_PATH`.

## Pages

| URL | Page |
| --- | --- |
| `/` | Home: video hero, 3 sliding category panels, why HBE, all ranges, how hire works, delivery |
| `/equipment/` | All hire ranges |
| `/equipment/<range>/` | 8 range pages (breakers, compactors, generators, concrete, cutting, scaffolding, garden, cleaning) |
| `/delivery/` | Delivery & collection, areas served |
| `/about/` | About HBE |
| `/faq/` | FAQs + hire terms summary |
| `/contact/` | Contact details + quote form (sends via WhatsApp or email) |

## SEO built in

- Unique title, meta description, canonical URL, Open Graph and Twitter tags per page
- Google structured data: `LocalBusiness` (address, phone, hours, areas served, hire catalogue), `BreadcrumbList`, `FAQPage`
- `sitemap.xml` and `robots.txt` generated on build
- One H1 per page, local keywords ("… hire Durban", eThekwini suburbs), fast static HTML, WebP images, `lang="en-ZA"`

## Before going live — replace the placeholders

All copy lives in **`src/content.ts`**. Search it for `PLACEHOLDER`:

1. **Domain:** `SITE.url`. It's used for canonical URLs, the sitemap and the structured data.
2. **Email:** `CONTACT.email`.
3. **Street address + postal code:** `CONTACT.street`, `CONTACT.postal`.
4. **Opening hours:** `HOURS`.
5. **Equipment lists:** `items` in each of the `CATEGORIES`. These are a typical range; list what you actually stock.
6. **About story:** `ABOUT.story`.
7. **FAQ answers and hire terms:** `FAQ_GROUPS`, `TERMS`. Match these to your real deposit, ID and payment policies.

Then:

- **Logo:** the "HBE" yellow block is a text logo in `src/components/Site.tsx` (`Wordmark`). Send the real logo and swap it in. Also replace `public/favicon.svg`.
- **Photos & video:** they're free Pexels stock in `public/media/`. Replace them with your own photos using the same filenames.
- **Google Business Profile:** create or claim one with the same name, phone and address. It matters more for local search than anything on the site.
- Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## Notes

- The folder name contains `&`, which breaks npm's Windows shims, so the npm scripts call `node node_modules/...` directly.
- The quote form has no server. It opens WhatsApp or the visitor's email app with the request written out. To receive form submissions directly by email, connect a form service (e.g. Formspree) in `src/components/QuoteForm.tsx`.
