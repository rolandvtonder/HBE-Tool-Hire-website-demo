import type {ReactNode} from 'react';
import {CONTACT, HOURS, address, mailLink, mapsUrl, telLink, waLink} from '../content';
import {PageHero} from '../components/Blocks';
import {Icon, type IconName} from '../components/Icons';
import {QuoteForm} from '../components/QuoteForm';
import {useReveals} from '../hooks/useReveals';
import {u} from '../lib/url';

function Card({icon, label, children}: {icon: IconName; label: string; children: ReactNode}) {
  return (
    <div data-reveal className="flex gap-5 border-b border-white/15 py-6">
      <span className="grid size-12 shrink-0 place-items-center bg-yellow text-ink">
        <Icon name={icon} size={22} />
      </span>
      <div>
        <h2 className="caps text-concrete">{label}</h2>
        <div className="mt-1 text-[19px]">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Contact & quotes"
        lines={[{t: 'Get a'}, {t: 'quote.', i: true}]}
        body="WhatsApp is the quickest way to reach us. Or call, email, or send the form below — tell us the equipment, the dates and where it’s going."
        crumbs={[
          {label: 'Home', href: '/'},
          {label: 'Contact', href: '/contact/'},
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={waLink()} className="caps flex min-h-12 items-center gap-3 bg-yellow px-6 py-3.5 text-ink hover:bg-white">
            <Icon name="chat" size={18} /> WhatsApp {CONTACT.phoneDisplay}
          </a>
          <a href={telLink} className="caps flex min-h-12 items-center gap-3 bg-white/15 px-6 py-3.5 backdrop-blur-md hover:bg-white/25">
            <Icon name="phone" size={18} /> Call us
          </a>
        </div>
      </PageHero>

      <section className="bg-ink">
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] section-y gap-[var(--stack)]">
          <div>
            <Card icon="chat" label="WhatsApp">
              <a href={waLink()} className="underline-offset-4 hover:underline">
                {CONTACT.phoneDisplay}
              </a>
            </Card>
            <Card icon="phone" label="Phone">
              <a href={telLink} className="underline-offset-4 hover:underline">
                {CONTACT.phoneDisplay}
              </a>
            </Card>
            <Card icon="mail" label="Email">
              <a href={mailLink()} className="break-all underline-offset-4 hover:underline">
                {CONTACT.email}
              </a>
            </Card>
            <Card icon="pin" label="Yard">
              <address className="not-italic">{address()}</address>
              <a href={mapsUrl} target="_blank" rel="noopener" className="caps mt-2 inline-flex items-center gap-2 text-yellow hover:underline">
                Open in Google Maps <Icon name="arrowUpRight" size={16} />
              </a>
            </Card>
            <Card icon="clock" label="Opening hours">
              <dl className="space-y-1">
                {HOURS.map((h) => (
                  <div key={h.days} className="flex flex-wrap justify-between gap-x-6">
                    <dt>{h.days}</dt>
                    <dd className="text-concrete">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <Card icon="truck" label="Delivery">
              Greater Durban &amp; eThekwini.{' '}
              <a href={u('/delivery/')} className="text-yellow underline-offset-4 hover:underline">
                Delivery details
              </a>
            </Card>
          </div>
          <div id="quote" className="scroll-mt-10">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
