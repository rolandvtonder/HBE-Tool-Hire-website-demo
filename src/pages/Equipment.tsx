import {CategoryGrid, PageHero, QuoteBand, SectionHead} from '../components/Blocks';
import {useReveals} from '../hooks/useReveals';

export function Equipment() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Equipment hire · Durban"
        lines={[{t: 'Equipment'}, {t: 'for hire.', i: true}]}
        body="Construction, DIY and garden equipment for hire in Durban — serviced between every hire and delivered across eThekwini. Pick a range to see what’s in it, then ask us for a quote."
        image="cutting.webp"
        alt="Sparks flying from an angle grinder cutting metal"
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'Equipment', href: '/equipment/'},
        ]}
      />

      <section className="bg-ink">
        <div className="wrap section-y">
          <SectionHead label="Our hire ranges" dark>
            Pick a <span className="it text-yellow">range.</span>
          </SectionHead>
          <p data-reveal className="mt-6 max-w-2xl text-[18px] text-concrete">
            Stock changes through the week. If you don’t see what you need, WhatsApp us — we may have it, or we’ll point you to what does the job.
          </p>
          <div className="mt-[var(--stack)]">
            <CategoryGrid showItems />
          </div>
        </div>
      </section>

      <QuoteBand title="Not sure what" sub="you need?" text="Send us a photo of the job and we’ll recommend the right machine." />
    </div>
  );
}
