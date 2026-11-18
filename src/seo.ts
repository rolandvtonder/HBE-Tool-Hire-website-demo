import {AREAS, CATEGORIES, CONTACT, HOURS, SITE, mapsUrl} from './content';
import {NOT_FOUND, type Route} from './routes';
import {u} from './lib/url';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p: string) => `${SITE.url}${p}`;
/** JSON-LD inside <script>: keep `</script>` from ever closing it early. */
const ld = (data: object) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const businessId = `${SITE.url}/#business`;

export function localBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: SITE.name,
    alternateName: ['HBE Tool Hire', 'HBE'],
    legalName: SITE.legalName,
    parentOrganization: {'@type': 'Organization', name: SITE.legalName},
    description: 'Tool hire and equipment rentals in Durban, KwaZulu-Natal, with delivery across eThekwini.',
    url: `${SITE.url}/`,
    image: abs(SITE.ogImage),
    logo: abs('/media/logo-640.png'),
    telephone: CONTACT.phoneIntl,
    email: CONTACT.email,
    hasMap: mapsUrl,
    address: {
      '@type': 'PostalAddress',
      ...(CONTACT.street ? {streetAddress: CONTACT.street} : {}),
      ...(CONTACT.postal ? {postalCode: CONTACT.postal} : {}),
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    areaServed: [{'@type': 'City', name: 'Durban'}, {'@type': 'AdministrativeArea', name: 'eThekwini'}, ...AREAS.map((name) => ({'@type': 'Place', name}))],
    openingHoursSpecification: HOURS.filter((h) => h.opens).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {'@type': 'ContactPoint', telephone: CONTACT.phoneIntl, contactType: 'customer service', areaServed: 'ZA', availableLanguage: ['en']},
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Equipment hire',
      itemListElement: CATEGORIES.map((c) => ({
        '@type': 'OfferCatalog',
        name: `${c.title} hire`,
        url: abs(`/equipment/${c.slug}/`),
        itemListElement: c.items.map((it) => ({'@type': 'Offer', itemOffered: {'@type': 'Service', name: `${it.name} hire`, description: it.desc}})),
      })),
    },
  };
}

/** Everything that goes in <head> for one page. */
export function renderHead(route: Route) {
  const url = abs(route.path);
  const image = abs(route.image ?? SITE.ogImage);
  const isHome = route.path === '/';
  const is404 = route === NOT_FOUND;

  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    is404 ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    route.preload && `<link rel="preload" as="image" href="${u(route.preload)}" fetchpriority="high" />`,
  ];

  if (!is404) {
    tags.push(ld(isHome ? {...localBusiness()} : {'@context': 'https://schema.org', '@type': 'WebPage', name: route.title, url, about: {'@id': businessId}}));
    if (isHome) {
      tags.push(ld({'@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: `${SITE.url}/`, inLanguage: 'en-ZA'}));
    }
    if (route.crumbs) {
      const trail: [string, string][] = [['Home', '/'], ...route.crumbs];
      tags.push(
        ld({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: trail.map(([name, p], i) => ({'@type': 'ListItem', position: i + 1, name, item: abs(p)})),
        }),
      );
    }
    if (route.faqs?.length) {
      tags.push(
        ld({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: route.faqs.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}})),
        }),
      );
    }
  }

  return tags.filter(Boolean).join('\n    ');
}
