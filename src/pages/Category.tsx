import type {CSSProperties} from 'react';
import {CATEGORIES, waLink, type Category as Cat} from '../content';
import {CategoryCard, FaqList, PageHero, QuoteBand, SectionHead} from '../components/Blocks';
import {Icon} from '../components/Icons';
import {useReveals} from '../hooks/useReveals';
import {u} from '../lib/url';

export function Category({c}: {c: Cat}) {
  const ref = useReveals<HTMLDivElement>();
  const idx = CATEGORIES.indexOf(c);
  const related = [1, 2, 3].map((k) => CATEGORIES[(idx + k) % CATEGORIES.length]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow={`${c.title} hire · Durban & eThekwini`}
        lines={[{t: c.name[0]}, {t: `${c.name[1]} hire`, i: true}]}
        body={c.short}
        image={c.image}
        alt={c.imageAlt}
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'Equipment', href: '/equipment/'},
          {label: c.title, href: `/equipment/${c.slug}/`},
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waLink(`Hi HBE, I'd like a quote for ${c.title.toLowerCase()} hire.`)} className="caps flex min-h-12 items-center gap-3 bg-red-deep px-6 py-3.5 text-white hover:bg-white hover:text-ink">
            <Icon name="chat" size={18} /> Quote on WhatsApp
          </a>
          <a href="#range" className="caps flex min-h-12 items-center gap-3 bg-white/15 px-6 py-3.5 backdrop-blur-md hover:bg-white/25">
            See the range <Icon name="arrow" size={18} className="rotate-90" />
          </a>
        </div>
      </PageHero>

      <section id="range" className="on-paper scroll-mt-10 bg-paper text-ink">
        <div className="wrap section-y">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <SectionHead label="What’s in the range">
              {c.name[0]} <span className="it">{c.name[1]}</span>
            </SectionHead>
            <p data-reveal className="max-w-2xl text-[18px] text-stone">
              {c.intro}
            </p>
          </div>

          <ul className="mt-[var(--stack)] border-t border-ink/15">
            {c.items.map((it, i) => (
              <li
                key={it.name}
                data-reveal
                style={{'--d': `${i * 0.05}s`} as CSSProperties}
                className="grid gap-4 border-b border-ink/15 py-8 md:grid-cols-[80px_1.1fr_1.4fr_auto] md:items-center md:gap-8"
              >
                <span className="display text-[34px] text-stone">0{i + 1}</span>
                <h3 className="display text-[clamp(30px,2.6vw,44px)]">{it.name}</h3>
                <div>
                  <p className="text-stone">{it.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Good for">
                    {it.uses.map((u) => (
                      <li key={u} className="bg-ink/5 px-2.5 py-1 text-[14px] font-medium">
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 md:flex-col">
                  <a
                    href={waLink(`Hi HBE, is the ${it.name} available? I'd like a quote.`)}
                    className="caps flex min-h-11 items-center justify-center gap-2 bg-ink px-5 py-3 text-white hover:bg-steel"
                  >
                    <Icon name="chat" size={16} /> Quote
                  </a>
                  <a
                    href={u(`/contact/?item=${encodeURIComponent(it.name)}`)}
                    className="caps flex min-h-11 items-center justify-center gap-2 border-2 border-ink px-5 py-2.5 hover:bg-ink hover:text-white"
                  >
                    Quote form
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-stone">Availability changes daily — ask us what’s in the yard. Rates on request.</p>
        </div>
      </section>

      <section className="on-blue bg-blue text-white">
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] section-y gap-[var(--stack)]">
          <h2 className="display text-[clamp(40px,5vw,84px)]" data-reveal>
            Before <span className="it">you hire</span>
          </h2>
          <ul className="grid gap-6 sm:grid-cols-3">
            {c.tips.map((t, i) => (
              <li key={t} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className="border-t-4 border-white pt-5 text-[18px] font-medium">
                <Icon name="shield" size={22} className="mb-3" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-paper bg-paper text-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.6fr] section-y gap-[var(--stack)]">
          <SectionHead label="Questions">
            {c.title.split(' & ')[0]} <span className="it block">FAQs</span>
          </SectionHead>
          <div data-reveal>
            <FaqList faqs={c.faqs} />
            <a href={u('/faq/')} className="caps mt-8 inline-flex items-center gap-2 underline-offset-4 hover:underline">
              More hire questions & terms <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap section-y">
          <SectionHead label="Also for hire" dark>
            Other <span className="it text-red">ranges</span>
          </SectionHead>
          <div className="mt-[var(--stack)] grid gap-4 sm:grid-cols-3 lg:gap-5">
            {related.map((r) => (
              <CategoryCard key={r.slug} c={r} i={CATEGORIES.indexOf(r)} />
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
