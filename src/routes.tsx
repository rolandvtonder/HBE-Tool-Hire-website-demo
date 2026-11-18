import type {ReactNode} from 'react';
import {CATEGORIES, FAQ_GROUPS, type Faq} from './content';
import {About} from './pages/About';
import {Category} from './pages/Category';
import {Contact} from './pages/Contact';
import {Delivery} from './pages/Delivery';
import {Equipment} from './pages/Equipment';
import {Faq as FaqPage} from './pages/Faq';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';

export type Route = {
  path: string;
  title: string;
  description: string;
  image?: string;
  /** Breadcrumb trail for structured data (home is implied). */
  crumbs?: [string, string][];
  faqs?: Faq[];
  /** Extra preloads for the first paint. */
  preload?: string;
  render: () => ReactNode;
};

export const ROUTES: Route[] = [
  {
    path: '/',
    title: 'Tool Hire Durban | Equipment Rentals & Delivery | HBE Tool Hire',
    description:
      'HBE Tool Hire & Rentals: breakers, compactors, generators, concrete mixers, saws, scaffolding and garden tools for hire in Durban. Serviced kit, delivered across eThekwini. WhatsApp 073 771 3494.',
    preload: '/media/hero-poster.webp',
    render: () => <Home />,
  },
  {
    path: '/equipment/',
    title: 'Equipment Hire Durban | All Hire Ranges | HBE Tool Hire',
    description:
      'Browse construction, DIY and garden equipment for hire in Durban: breakers & drills, compactors, generators, concrete mixers, cutting tools, scaffolding, garden and cleaning equipment.',
    image: '/media/cutting.webp',
    crumbs: [['Equipment', '/equipment/']],
    preload: '/media/cutting.webp',
    render: () => <Equipment />,
  },
  ...CATEGORIES.map<Route>((c) => ({
    path: `/equipment/${c.slug}/`,
    title: c.metaTitle,
    description: c.metaDescription,
    image: `/media/${c.image}`,
    crumbs: [
      ['Equipment', '/equipment/'],
      [c.title, `/equipment/${c.slug}/`],
    ],
    faqs: c.faqs,
    preload: `/media/${c.image}`,
    render: () => <Category c={c} />,
  })),
  {
    path: '/delivery/',
    title: 'Tool Hire Delivery Durban & eThekwini | HBE Tool Hire',
    description:
      'Equipment delivery and collection across Greater Durban — Umhlanga, Westville, Pinetown, Hillcrest, Chatsworth, Amanzimtoti and more. Delivery is included in your hire quote.',
    image: '/media/delivery.webp',
    crumbs: [['Delivery', '/delivery/']],
    preload: '/media/delivery.webp',
    render: () => <Delivery />,
  },
  {
    path: '/about/',
    title: 'About HBE Tool Hire | Hamashe Business Enterprise, Durban',
    description:
      'HBE Tool Hire is part of Hamashe Business Enterprise — a 100% black-owned, B-BBEE Level 1 built-environment company in Wiggins, Durban: building, renovations, house remodelling, plumbing, civil engineering and tool hire.',
    image: '/media/about.webp',
    crumbs: [['About us', '/about/']],
    preload: '/media/about.webp',
    render: () => <About />,
  },
  {
    path: '/faq/',
    title: 'Tool Hire FAQ & Hire Terms | HBE Tool Hire Durban',
    description:
      'What you need to hire, deposits, delivery, fuel, breakdowns and damage — answers to common tool hire questions, plus a plain-English summary of our hire terms.',
    crumbs: [['FAQ & terms', '/faq/']],
    faqs: FAQ_GROUPS.flatMap((g) => g.faqs),
    render: () => <FaqPage />,
  },
  {
    path: '/contact/',
    title: 'Contact & Quotes | HBE Tool Hire Durban | 073 771 3494',
    description:
      'Get a tool hire quote from HBE in Durban. WhatsApp or call 073 771 3494, email us, or send the quote form with the equipment, dates and delivery address.',
    crumbs: [['Contact', '/contact/']],
    render: () => <Contact />,
  },
];

export const NOT_FOUND: Route = {
  path: '/404/',
  title: 'Page not found | HBE Tool Hire & Rentals',
  description: 'That page could not be found. Browse tool hire ranges from HBE Tool Hire & Rentals in Durban.',
  render: () => <NotFound />,
};

export const normalize = (p: string) => {
  const clean = p.replace(/index\.html$/, '');
  return clean.endsWith('/') ? clean : `${clean}/`;
};

export const matchRoute = (path: string) => ROUTES.find((r) => r.path === normalize(path)) ?? NOT_FOUND;
