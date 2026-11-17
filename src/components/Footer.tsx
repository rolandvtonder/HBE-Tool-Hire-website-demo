import {AREAS, CATEGORIES, CONTACT, HOURS, NAV, SITE, address, mailLink, mapsUrl, telLink, waLink} from '../content';
import {useFitText} from '../hooks/useFitText';
import {Icon} from './Icons';
import {u} from '../lib/url';

export function Footer() {
  const fit = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative bg-ink text-white">
      <div className="hazard h-3" aria-hidden />

      <div className="wrap pt-[var(--section-y)]">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <h2 className="display text-[clamp(48px,7vw,120px)]">
            Need a tool <span className="it block text-yellow">today?</span>
          </h2>
          <div className="flex flex-col justify-end gap-3 md:items-end">
            <a href={waLink()} className="caps flex min-h-12 w-full items-center justify-between gap-6 bg-yellow px-6 py-4 text-ink transition-colors hover:bg-white md:w-80">
              WhatsApp for a quote <Icon name="chat" />
            </a>
            <a href={telLink} className="caps flex min-h-12 w-full items-center justify-between gap-6 bg-white/10 px-6 py-4 transition-colors hover:bg-white/20 md:w-80">
              Call {CONTACT.phoneDisplay} <Icon name="phone" />
            </a>
          </div>
        </div>

        <div className="mt-[var(--section-y)] grid gap-10 border-t border-white/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="caps text-yellow">Contact</h3>
            <ul className="mt-4 space-y-3 text-concrete">
              <li>
                <a href={telLink} className="flex items-start gap-3 hover:text-white">
                  <Icon name="phone" className="mt-1 shrink-0" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={waLink()} className="flex items-start gap-3 hover:text-white">
                  <Icon name="chat" className="mt-1 shrink-0" /> WhatsApp {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailLink()} className="flex items-start gap-3 break-all hover:text-white">
                  <Icon name="mail" className="mt-1 shrink-0" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener" className="flex items-start gap-3 hover:text-white">
                  <Icon name="pin" className="mt-1 shrink-0" /> {address()}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="caps text-yellow">Opening hours</h3>
            <dl className="mt-4 space-y-3 text-concrete">
              {HOURS.map((h) => (
                <div key={h.days}>
                  <dt className="text-white">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Equipment categories">
            <h3 className="caps text-yellow">Equipment hire</h3>
            <ul className="mt-4 space-y-2 text-concrete">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <a href={u(`/equipment/${c.slug}/`)} className="hover:text-white">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <h3 className="caps text-yellow">Company</h3>
            <ul className="mt-4 space-y-2 text-concrete">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={u(n.href)} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[var(--stack)] border-t border-white/15 pt-8">
          <h3 className="caps text-yellow">Delivering across Greater Durban</h3>
          <p className="mt-3 max-w-5xl text-[15px] text-concrete">{AREAS.join(' · ')}</p>
        </div>
      </div>

      <div className="mt-[var(--stack)] overflow-hidden px-[var(--gutter)]" aria-hidden>
        <span ref={fit} className="display inline-block whitespace-nowrap pb-[0.06em] text-yellow">
          HBE Tool Hire
        </span>
      </div>

      <div className="wrap flex flex-col gap-2 pt-6 pb-28 text-[14px] text-concrete md:flex-row md:justify-between md:pb-10">
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {SITE.name} · Durban, KwaZulu-Natal
        </p>
        <p>
          Photos &amp; video:{' '}
          <a href="https://www.pexels.com" target="_blank" rel="noopener" className="underline hover:text-white">
            Pexels
          </a>
        </p>
      </div>
    </footer>
  );
}
