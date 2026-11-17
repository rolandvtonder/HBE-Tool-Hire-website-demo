import type {CSSProperties} from 'react';
import {AREAS, DELIVERY} from '../content';
import {PageHero, QuoteBand, SectionHead, Steps} from '../components/Blocks';
import {Icon} from '../components/Icons';
import {useReveals} from '../hooks/useReveals';

export function Delivery() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Delivery & collection · eThekwini"
        lines={[{t: 'Delivered'}, {t: 'to your site.', i: true}]}
        body="Stay on the job — we’ll bring the equipment to you and collect it when you’re done, anywhere across Greater Durban."
        image="delivery.webp"
        alt="Worker standing on the back of a loaded delivery truck"
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'Delivery', href: '/delivery/'},
        ]}
      />

      <section className="on-paper bg-paper text-ink">
        <div className="wrap section-y">
          <SectionHead label="How delivery works">
            Drop-off <span className="it">to pick-up</span>
          </SectionHead>
          <div className="mt-[var(--stack)]">
            <Steps steps={DELIVERY.steps} />
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.5fr] section-y gap-[var(--stack)]">
          <div>
            <SectionHead label="Where we deliver" dark>
              Greater <span className="it block text-yellow">Durban</span>
            </SectionHead>
            <p data-reveal className="mt-6 max-w-md text-[18px] text-concrete">
              We deliver across eThekwini — from the CBD and Berea to the North Coast, the Upper Highway and the South Coast. Not on
              the list? Ask us.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Delivery areas">
            {AREAS.map((a, i) => (
              <li
                key={a}
                data-reveal
                style={{'--d': `${(i % 9) * 0.03}s`} as CSSProperties}
                className="flex items-center gap-3 border-b border-white/10 py-2 text-[17px]"
              >
                <Icon name="pin" size={16} className="shrink-0 text-yellow" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-paper bg-paper text-ink">
        <div className="wrap grid lg:grid-cols-2 section-y gap-[var(--stack)]">
          <SectionHead label="Good to know">
            Before <span className="it">we arrive</span>
          </SectionHead>
          <ul className="space-y-5">
            {DELIVERY.notes.map((n, i) => (
              <li key={n} data-reveal style={{'--d': `${i * 0.06}s`} as CSSProperties} className="flex gap-4 text-[18px]">
                <span className="grid size-9 shrink-0 place-items-center bg-yellow">
                  <Icon name="check" size={18} />
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteBand title="Book a" sub="delivery." text="Send the site address, the date and what you need — we’ll quote hire and delivery together." />
    </div>
  );
}
