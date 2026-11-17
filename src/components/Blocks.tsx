import {useRef, type CSSProperties, type ReactNode} from 'react';
import {CATEGORIES, waLink, type Category, type Faq, type Line} from '../content';
import {useRecede} from '../hooks/useRecede';
import {Icon} from './Icons';
import {u} from '../lib/url';

export const media = (f: string) => u(`/media/${f}`);

/** Display headline from data: `i` lines are italic and yellow. */
export function Lines({lines, accent = 'text-yellow'}: {lines: Line[]; accent?: string}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? `it ${accent}` : ''}`}>
          {l.t}
          {i < lines.length - 1 && <span className="sr-only"> </span>}
        </span>
      ))}
    </>
  );
}

export type Crumb = {label: string; href: string};

/**
 * Inner-page hero: photo (or plain ink) behind a big condensed headline,
 * breadcrumbs above, intro below. Recedes on scroll like the home hero.
 */
export function PageHero({
  eyebrow,
  lines,
  body,
  image,
  alt,
  crumbs,
  children,
}: {
  eyebrow: string;
  lines: Line[];
  body?: string;
  image?: string;
  alt?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useRecede(root, stage);

  return (
    <section ref={root} className="relative flex min-h-[600px] overflow-hidden bg-ink md:min-h-[82svh]">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {image ? (
          <>
            <img src={media(image)} alt={alt ?? ''} width={1600} height={1067} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_14_13/0.85),rgb(14_14_13/0.35)_70%),linear-gradient(0deg,rgb(14_14_13/0.7),transparent_40%)]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgb(255_194_14/0.18),transparent_55%)]" />
        )}
      </div>

      <div className="wrap relative flex w-full flex-col justify-end pt-32 pb-12 sm:pb-16 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="caps flex flex-wrap items-center gap-x-3 gap-y-1 text-white/75">
            {crumbs.map((c, i) => (
              <li key={c.href} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden>/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-yellow">
                    {c.label}
                  </span>
                ) : (
                  <a href={u(c.href)} className="hover:text-white">
                    {c.label}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="caps text-yellow">{eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(52px,8vw,148px)] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
          <Lines lines={lines} />
        </h1>
        {body && <p className="mt-8 max-w-[560px] text-[18px] text-white/90 md:text-[19px]">{body}</p>}
        {children}
      </div>
    </section>
  );
}

/** Small tracked label + big headline used to open a content section. */
export function SectionHead({label, children, dark = false}: {label: string; children: ReactNode; dark?: boolean}) {
  return (
    <div data-reveal>
      <p className={`caps ${dark ? 'text-yellow' : 'text-stone'}`}>{label}</p>
      <h2 className="display mt-4 text-[clamp(40px,5.4vw,92px)]">{children}</h2>
    </div>
  );
}

export function CategoryCard({c, i = 0, showItems = false}: {c: Category; i?: number; showItems?: boolean}) {
  return (
    <a
      href={u(`/equipment/${c.slug}/`)}
      data-reveal
      style={{'--d': `${(i % 4) * 0.06}s`} as CSSProperties}
      className="group relative flex flex-col overflow-hidden bg-coal text-white ring-1 ring-white/10 transition-shadow hover:ring-yellow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={media(c.image)}
          alt={c.imageAlt}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 caps bg-ink/75 px-2.5 py-1 text-[11px] text-yellow">0{i + 1}</span>
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="display text-[clamp(30px,2.4vw,40px)]">
          {c.name[0]} <span className="it text-yellow">{c.name[1]}</span>
        </h3>
        <p className="mt-3 text-concrete">{c.short}</p>
        {showItems && (
          <ul className="mt-4 space-y-1.5 text-[15px] text-white/85">
            {c.items.map((it) => (
              <li key={it.name} className="flex gap-2">
                <Icon name="check" size={16} className="mt-1 shrink-0 text-yellow" /> {it.name}
              </li>
            ))}
          </ul>
        )}
        <span className="caps mt-auto flex items-center gap-2 pt-6 text-yellow">
          View range <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

export function CategoryGrid({only, showItems}: {only?: string[]; showItems?: boolean}) {
  const list = only ? CATEGORIES.filter((c) => only.includes(c.slug)) : CATEGORIES;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
      {list.map((c) => (
        <CategoryCard key={c.slug} c={c} i={CATEGORIES.indexOf(c)} showItems={showItems} />
      ))}
    </div>
  );
}

export function FaqList({faqs, tone = 'paper'}: {faqs: Faq[]; tone?: 'paper' | 'ink'}) {
  const line = tone === 'paper' ? 'border-ink/15' : 'border-white/15';
  const muted = tone === 'paper' ? 'text-stone' : 'text-concrete';
  return (
    <div className={`border-t ${line}`}>
      {faqs.map((f) => (
        <details key={f.q} className={`group border-b ${line}`}>
          <summary className="flex min-h-14 items-center justify-between gap-6 py-5 text-[19px] font-semibold md:text-[21px]">
            {f.q}
            <Icon name="plus" size={22} className="faq-plus shrink-0 transition-transform duration-300" />
          </summary>
          <p className={`max-w-3xl pb-6 ${muted}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Numbered steps on a 4-up grid. */
export function Steps({steps, tone = 'paper'}: {steps: {title: string; body: string}[]; tone?: 'paper' | 'ink'}) {
  const muted = tone === 'paper' ? 'text-stone' : 'text-concrete';
  const line = tone === 'paper' ? 'border-ink' : 'border-yellow';
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className={`border-t-4 ${line} pt-6`}>
          <span className="display text-[56px] leading-none">0{i + 1}</span>
          <h3 className="mt-4 text-[21px] font-bold">{s.title}</h3>
          <p className={`mt-2 ${muted}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Yellow call-to-action band used near the end of most pages. */
export function QuoteBand({title = 'Tell us the job.', sub = 'We’ll find the tool.', text}: {title?: string; sub?: string; text?: string}) {
  return (
    <section className="on-yellow bg-yellow text-ink">
      <div className="wrap grid md:grid-cols-[1.4fr_1fr] md:items-end section-y gap-[var(--stack)]">
        <h2 className="display text-[clamp(46px,6.4vw,112px)]" data-reveal>
          {title} <span className="it block">{sub}</span>
        </h2>
        <div className="flex flex-col gap-3" data-reveal style={{'--d': '0.1s'} as CSSProperties}>
          {text && <p className="mb-2 text-[18px]">{text}</p>}
          <a href={waLink()} className="caps flex min-h-12 items-center justify-between gap-6 bg-ink px-6 py-4 text-white transition-colors hover:bg-steel">
            WhatsApp for a quote <Icon name="chat" />
          </a>
          <a href={u('/contact/')} className="caps flex min-h-12 items-center justify-between gap-6 border-2 border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-white">
            Use the quote form <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
