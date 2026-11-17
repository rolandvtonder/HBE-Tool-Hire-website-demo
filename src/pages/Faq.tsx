import type {CSSProperties} from 'react';
import {FAQ_GROUPS, TERMS} from '../content';
import {FaqList, PageHero, QuoteBand, SectionHead} from '../components/Blocks';
import {useReveals} from '../hooks/useReveals';

export function Faq() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="FAQ & hire terms"
        lines={[{t: 'Hire questions,'}, {t: 'answered.', i: true}]}
        body="What to bring, deposits, delivery, fuel and what happens if something breaks — plus a plain-English summary of our hire terms."
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'FAQ & terms', href: '/faq/'},
        ]}
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {[...FAQ_GROUPS.map((g) => g.title), 'Hire terms'].map((t) => (
            <a key={t} href={`#${slug(t)}`} className="caps border border-white/25 px-4 py-2.5 hover:border-yellow hover:text-yellow">
              {t}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="on-paper bg-paper text-ink">
        <div className="wrap section-y space-y-14 lg:space-y-20">
          {FAQ_GROUPS.map((g) => (
            <div key={g.title} id={slug(g.title)} className="grid scroll-mt-10 gap-8 lg:grid-cols-[1fr_1.8fr]">
              <h2 className="display text-[clamp(36px,4vw,64px)]" data-reveal>
                {g.title}
              </h2>
              <div data-reveal>
                <FaqList faqs={g.faqs} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="hire-terms" className="scroll-mt-10 bg-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.8fr] section-y gap-[var(--stack)]">
          <div>
            <SectionHead label="The fine print" dark>
              Hire <span className="it text-yellow">terms</span>
            </SectionHead>
            <p data-reveal className="mt-6 max-w-sm text-concrete">
              A plain-English summary. Your signed hire agreement is the binding document — ask us for a copy any time.
            </p>
          </div>
          <ol className="space-y-0 border-t border-white/15">
            {TERMS.map((t, i) => (
              <li
                key={t}
                data-reveal
                style={{'--d': `${(i % 4) * 0.05}s`} as CSSProperties}
                className="grid grid-cols-[56px_1fr] gap-4 border-b border-white/15 py-5 text-[18px]"
              >
                <span className="display text-[30px] text-yellow">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-white/90">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuoteBand title="Still got" sub="a question?" text="WhatsApp is the quickest way to reach us." />
    </div>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
