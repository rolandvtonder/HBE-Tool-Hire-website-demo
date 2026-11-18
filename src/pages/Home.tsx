import {useEffect, useRef, type CSSProperties} from 'react';
import {AREAS, CATEGORIES, CREDENTIALS, FEATURED, HOME, SITE, waLink} from '../content';
import {CategoryGrid, QuoteBand, SectionHead, Steps, media} from '../components/Blocks';
import {Icon} from '../components/Icons';
import {useRecede} from '../hooks/useRecede';
import {useReveals} from '../hooks/useReveals';
import {u} from '../lib/url';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

/** The three panels take the logo's letters in turn: H red, B blue, E white. */
const PANEL = [
  {text: 'text-red', button: 'bg-red-deep text-white'},
  {text: 'text-blue-bright', button: 'bg-blue text-white'},
  {text: 'text-white', button: 'bg-white text-ink'},
];

/**
 * Sparks off a grinder in a dark workshop, with the headline, intro and the
 * two main actions. As you scroll on, the film blurs, dims and shrinks back.
 */
function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useRecede(root, stage, video);

  // Make the film play on phones too. iOS only autoplays a video that is
  // muted + inline at the moment play() is called, and Low Power Mode / data
  // saver block autoplay until the first touch — so retry on the first gesture
  // and whenever the tab comes back.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    // Same threshold useRecede pauses at, so the two never fight.
    const onScreen = () => {
      const r = root.current?.getBoundingClientRect();
      return !!r && r.bottom > r.height * 0.02;
    };
    const tryPlay = () => {
      if (v.paused && onScreen()) void v.play().catch(() => {});
    };
    const gestures = ['touchstart', 'pointerdown', 'scroll', 'keydown'] as const;
    const onGesture = tryPlay;
    const onVisible = () => document.visibilityState === 'visible' && tryPlay();

    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('canplay', tryPlay, {once: true});
    gestures.forEach((g) => window.addEventListener(g, onGesture, {passive: true}));
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      v.removeEventListener('canplay', tryPlay);
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <video
          ref={video}
          className="h-full w-full object-cover"
          poster={media('hero-poster.webp')}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
        >
          <source src={media('hero-sm.mp4')} type="video/mp4" media="(max-width: 767px)" />
          <source src={media('hero.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_14_13/0.78),rgb(14_14_13/0.2)_65%),linear-gradient(0deg,rgb(14_14_13/0.6),transparent_45%)]" />

        <div className="wrap absolute inset-0 flex flex-col justify-center pt-20">
          <p className="caps text-red">{HOME.eyebrow}</p>
          <h1 className="display mt-5 text-[clamp(56px,8.4vw,156px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.4)]">
            {HOME.lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? `it ${i < 2 ? 'text-red' : 'text-blue-bright'}` : ''} ${i === 2 ? 'md:pl-[1.2em]' : ''}`}>
                {l.t}{' '}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[520px] text-[18px] text-white/90 md:ml-[clamp(0px,14vw,260px)] md:text-[19px]">{HOME.body}</p>
          <div className="mt-8 flex flex-wrap gap-3 md:ml-[clamp(0px,14vw,260px)]">
            <a href={u('/equipment/')} className="caps flex min-h-12 items-center gap-3 bg-white px-6 py-3.5 text-ink transition-colors hover:bg-red-deep hover:text-white">
              Browse equipment <Icon name="arrow" size={18} />
            </a>
            <a href={waLink()} className="caps flex min-h-12 items-center gap-3 bg-white/15 px-6 py-3.5 text-white backdrop-blur-md transition-colors hover:bg-white/25">
              <Icon name="chat" size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The three most-hired categories: tall panels slide in from the right one
 * after another, each a slow-moving photo with its name and two quick facts.
 */
function Panels() {
  const list = FEATURED.map((s) => CATEGORIES.find((c) => c.slug === s)!);
  return (
    <section aria-labelledby="popular-h" className="relative bg-ink">
      <div className="wrap flex items-end justify-between gap-6 pt-16 pb-6 lg:pt-20 lg:pb-8">
        <h2 id="popular-h" className="caps text-red">
          Popular hire
        </h2>
        <a href={u('/equipment/')} className="caps flex items-center gap-2 text-white/80 hover:text-white">
          All equipment <Icon name="arrow" size={16} />
        </a>
      </div>
      <div data-group className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-sm:h-auto max-sm:grid-cols-1">
        {list.map((c, i) => (
          <a
            key={c.slug}
            href={u(`/equipment/${c.slug}/`)}
            data-slide
            style={d(0.12 + i * 0.16)}
            className="group relative block overflow-hidden bg-steel max-sm:h-[78svh] max-sm:min-h-[520px]"
          >
            <img
              src={media(c.image)}
              alt={c.imageAlt}
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="kenburns absolute inset-0 h-full w-full object-cover"
              style={{animationDelay: `${-i * 6}s`}}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_14_13/0.75),transparent_45%),linear-gradient(0deg,rgb(14_14_13/0.8),transparent_35%)] transition-colors duration-500 group-hover:bg-ink/20" />
            <div className="relative flex h-full flex-col justify-between p-5 pt-24 lg:p-9 lg:pt-28">
              <div>
                <span className={`caps ${PANEL[i].text}`}>0{i + 1}</span>
                <h3 className="display mt-3 text-[clamp(32px,3.8vw,68px)] max-sm:text-[44px] text-white">
                  <span className="block">{c.name[0]}</span>
                  <span className={`it block ${PANEL[i].text}`}>{c.name[1]}</span>
                </h3>
                <dl data-after className="mt-6 space-y-3">
                  {c.panel.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/70">{k}</dt>
                      <dd className="text-[17px] font-semibold text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className={`caps flex items-center gap-2 self-start px-5 py-3 transition-transform group-hover:translate-x-1 ${PANEL[i].button}`}>
                View the range <Icon name="arrow" size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Home() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero />
      <Panels />

      {/* Why HBE */}
      <section className="on-paper bg-paper text-ink">
        <div className="wrap section-y">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <SectionHead label="Why hire from HBE">
              Serviced. Tested. <span className="it block">Ready to work.</span>
            </SectionHead>
            <p data-reveal className="max-w-xl text-[19px] text-stone">
              Tool hire in Durban for builders, contractors and homeowners. Breakers, compactors, generators, mixers, saws,
              scaffolding, garden and cleaning equipment — from a team that answers the phone.
            </p>
          </div>
          <ul data-reveal className="mt-8 flex flex-wrap gap-2" aria-label={`${SITE.legalName} credentials`}>
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex items-center gap-2 bg-white px-3.5 py-2 text-[15px] font-semibold ring-1 ring-ink/10">
                <Icon name="check" size={16} className="text-red-deep" /> {c}
              </li>
            ))}
            <li>
              <a href={u('/about/')} className="flex items-center gap-2 px-3.5 py-2 text-[15px] font-semibold text-blue underline-offset-4 hover:underline">
                Part of {SITE.legalName} <Icon name="arrow" size={16} />
              </a>
            </li>
          </ul>
          <div className="mt-[var(--stack)] grid gap-4 sm:grid-cols-3 lg:gap-6">
            {HOME.promises.map((p, i) => (
              <div key={p.title} data-reveal style={d(i * 0.08)} className="bg-white p-6 ring-1 ring-ink/10 lg:p-8">
                <span className="grid size-12 place-items-center bg-red-deep text-white">
                  <Icon name={(['wrench', 'truck', 'chat'] as const)[i]} size={22} />
                </span>
                <h3 className="mt-6 text-[22px] font-bold">{p.title}</h3>
                <p className="mt-2 text-stone">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All categories */}
      <section className="bg-ink">
        <div className="wrap section-y">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="Equipment hire" dark>
              Eight ranges. <span className="it text-red">One call.</span>
            </SectionHead>
            <a href={u('/equipment/')} data-reveal className="caps flex min-h-12 items-center gap-3 border border-white/30 px-6 py-3 hover:border-red hover:text-red">
              See all equipment <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="mt-[var(--stack)]">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* How hire works */}
      <section className="on-paper bg-paper text-ink">
        <div className="wrap section-y">
          <SectionHead label="How hire works">
            Four steps. <span className="it">No runaround.</span>
          </SectionHead>
          <div className="mt-[var(--stack)]">
            <Steps steps={HOME.steps} />
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="relative overflow-hidden bg-ink">
        <img src={media('delivery.webp')} alt="" width={1600} height={1067} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_14_13/0.95),rgb(14_14_13/0.5))]" />
        <div className="wrap relative grid lg:grid-cols-2 section-y gap-[var(--stack)]">
          <div>
            <SectionHead label="Delivery & collection" dark>
              We bring it <span className="it block text-red">to site.</span>
            </SectionHead>
            <p data-reveal className="mt-8 max-w-lg text-[18px] text-white/85">
              Delivery and collection across Greater Durban and eThekwini. Tell us the address and the date — the delivery cost is
              included in your quote.
            </p>
            <a href={u('/delivery/')} data-reveal className="caps mt-8 inline-flex min-h-12 items-center gap-3 bg-red-deep px-6 py-3.5 text-white hover:bg-white hover:text-ink">
              Delivery details <Icon name="arrow" size={18} />
            </a>
          </div>
          <ul data-reveal className="flex flex-wrap content-end gap-2" aria-label="Delivery areas">
            {AREAS.slice(0, 18).map((a) => (
              <li key={a} className="border border-white/20 bg-ink/40 px-3.5 py-2 text-[15px] backdrop-blur-sm">
                {a}
              </li>
            ))}
            <li className="px-3.5 py-2 text-[15px] text-red">+ more</li>
          </ul>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
