import type {CSSProperties} from 'react';
import {ABOUT} from '../content';
import {CategoryGrid, PageHero, QuoteBand, SectionHead} from '../components/Blocks';
import {Icon} from '../components/Icons';
import {useReveals} from '../hooks/useReveals';

export function About() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="About HBE · Durban"
        lines={ABOUT.lines}
        body={ABOUT.body}
        image="about.webp"
        alt="Worker in a hi-vis vest running a plate compactor over a building site"
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'About us', href: '/about/'},
        ]}
      />

      <section className="on-paper bg-paper text-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.3fr] section-y gap-[var(--stack)]">
          <SectionHead label="Our story">
            Tool hire, <span className="it block">done properly.</span>
          </SectionHead>
          <div className="space-y-6 text-[19px] text-stone">
            {ABOUT.story.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap section-y">
          <SectionHead label="What you can count on" dark>
            Three <span className="it text-yellow">promises</span>
          </SectionHead>
          <div className="mt-[var(--stack)] grid gap-4 sm:grid-cols-3 lg:gap-6">
            {ABOUT.values.map((v, i) => (
              <div key={v.title} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className="border-t-4 border-yellow bg-coal p-6 lg:p-8">
                <Icon name={(['wrench', 'shield', 'pin'] as const)[i]} size={26} className="text-yellow" />
                <h3 className="mt-6 text-[22px] font-bold">{v.title}</h3>
                <p className="mt-2 text-concrete">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap pb-[var(--section-y)]">
          <SectionHead label="What we hire" dark>
            The <span className="it text-yellow">ranges</span>
          </SectionHead>
          <div className="mt-[var(--stack)]">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
