import type {CSSProperties} from 'react';
import {ABOUT, CREDENTIALS, SITE, waLink} from '../content';
import {CategoryGrid, PageHero, QuoteBand, SectionHead} from '../components/Blocks';
import {Icon} from '../components/Icons';
import {useReveals} from '../hooks/useReveals';
import {u} from '../lib/url';

const d = (i: number, step = 0.08) => ({'--d': `${i * step}s`}) as CSSProperties;

export function About() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow={`About HBE · ${SITE.legalName}`}
        lines={ABOUT.lines}
        body={ABOUT.body}
        image="about.webp"
        alt="Worker in a hi-vis vest running a plate compactor over a building site"
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'About us', href: '/about/'},
        ]}
      >
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Company credentials">
          {CREDENTIALS.map((c) => (
            <li key={c} className="caps flex items-center gap-2 bg-white/10 px-3.5 py-2 backdrop-blur-md">
              <Icon name="check" size={16} className="text-red" /> {c}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Story + logo */}
      <section className="on-paper bg-paper text-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.3fr] section-y gap-[var(--stack)]">
          <div>
            <SectionHead label="Who we are">
              Hamashe <span className="it block text-blue">Business Enterprise</span>
            </SectionHead>
            <img
              data-reveal
              src={u('/media/logo-320.png')}
              srcSet={`${u('/media/logo-320.png')} 1x, ${u('/media/logo-640.png')} 2x`}
              alt="HBE — Hamashe Business Enterprise logo"
              width={220}
              height={226}
              loading="lazy"
              className="mt-10 w-[180px] md:w-[220px]"
            />
          </div>
          <div className="space-y-6 text-[19px] text-stone">
            {ABOUT.story.map((p) => (
              <p key={p.slice(0, 24)} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, vision, approach */}
      <section className="bg-ink">
        <div className="wrap section-y">
          <SectionHead label="What drives us" dark>
            Mission <span className="it text-red">&amp; vision</span>
          </SectionHead>
          <div className="mt-[var(--stack)] grid gap-4 md:grid-cols-3 lg:gap-6">
            {[
              {title: 'Our mission', body: ABOUT.mission, line: 'border-red'},
              {title: 'Our vision', body: ABOUT.vision, line: 'border-blue'},
              {title: 'Our approach', body: ABOUT.approach, line: 'border-white'},
            ].map((b, i) => (
              <div key={b.title} data-reveal style={d(i)} className={`border-t-4 ${b.line} bg-coal p-6 lg:p-8`}>
                <h3 className="caps text-concrete">{b.title}</h3>
                <p className="mt-4 text-[18px] text-white/90">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wider services + project highlights */}
      <section id="services" className="on-paper bg-paper text-ink scroll-mt-24">
        <div className="wrap grid lg:grid-cols-2 section-y gap-[var(--stack)]">
          <div>
            <SectionHead label="Our services">
              More than <span className="it block text-red-deep">tool hire</span>
            </SectionHead>
            <p data-reveal className="mt-6 max-w-lg text-[18px] text-stone">
              Need the job done, not just the tools? We also do renovations, house remodelling, plumbing, building and
              construction across Durban.
            </p>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {ABOUT.services.map((s, i) => (
                <li key={s} data-reveal style={d(i, 0.04)} className="flex items-center gap-3 border-b border-ink/15 py-3 text-[18px] font-semibold">
                  <span className={`size-2.5 shrink-0 ${['bg-red-deep', 'bg-blue', 'bg-ink'][i % 3]}`} aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
            <a
              data-reveal
              href={waLink(`Hi ${SITE.short}, I'd like a quote for a building / renovation job.`)}
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-red-deep px-6 text-[16px] font-bold text-white transition-colors hover:bg-ink"
            >
              <Icon name="chat" size={18} /> Get a building quote
            </a>
          </div>
          <div>
            <SectionHead label="Project highlights">
              Recent <span className="it block text-blue">work</span>
            </SectionHead>
            <ol className="mt-8 border-t border-ink/15">
              {ABOUT.projects.map((p, i) => (
                <li key={p.client} data-reveal style={d(i, 0.06)} className="grid grid-cols-[48px_1fr] gap-4 border-b border-ink/15 py-5">
                  <span className="display text-[30px] text-stone">0{i + 1}</span>
                  <div>
                    <h3 className="text-[19px] font-bold">{p.client}</h3>
                    <p className="text-stone">{p.work}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* People & community */}
      <section className="bg-ink">
        <div className="wrap section-y">
          <SectionHead label="Our people & community" dark>
            Building <span className="it text-blue-bright">skills</span>
          </SectionHead>
          <div className="mt-[var(--stack)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ABOUT.people.map((p, i) => (
              <div key={p.title} data-reveal style={d(i)} className="bg-coal p-6 ring-1 ring-white/10 lg:p-8">
                <h3 className="text-[20px] font-bold">{p.title}</h3>
                <p className="mt-2 text-concrete">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool hire promises + ranges */}
      <section className="bg-ink">
        <div className="wrap pb-[var(--section-y)]">
          <SectionHead label="HBE Tool Hire" dark>
            What you can <span className="it text-red">count on</span>
          </SectionHead>
          <div className="mt-[var(--stack)] grid gap-4 sm:grid-cols-3 lg:gap-6">
            {ABOUT.values.map((v, i) => (
              <div key={v.title} data-reveal style={d(i)} className="border-t-4 border-red bg-coal p-6 lg:p-8">
                <Icon name={(['wrench', 'shield', 'pin'] as const)[i]} size={26} className="text-red" />
                <h3 className="mt-6 text-[22px] font-bold">{v.title}</h3>
                <p className="mt-2 text-concrete">{v.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-[var(--section-y)]">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
