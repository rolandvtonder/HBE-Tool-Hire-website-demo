import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {CONTACT, NAV, telLink, waLink} from '../content';
import {Icon} from './Icons';
import {u} from '../lib/url';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, safety yellow, concrete paper); the paper one stays and holds the
 * items. Hovering an item ripples it like heat shimmer off hot tarmac — an
 * SVG turbulence + displacement filter animated per frame.
 */
export function Menu({open, path, onClose}: {open: boolean; path: string; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 8).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const id = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → yellow → paper, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away scrim */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-yellow')} style={delay(1)} />
      <nav className={slab('on-paper flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-8 text-ink md:px-10')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {NAV.map((item, i) => {
            const active = item.href === path || (item.href !== '/' && path.startsWith(item.href));
            return (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={u(item.href)}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  // Only keyboard focus ripples — not the focus we move in on open.
                  onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(i)}
                  onBlur={() => setHover(-1)}
                  className={`display relative inline-flex items-center gap-3 py-1 text-[clamp(34px,3.4vw,52px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {active && <span className="inline-block size-3 bg-yellow ring-2 ring-ink" aria-hidden />}
                  <span className={active ? 'it' : ''}>{item.label}</span>
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-stone">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-stone">Talk to us</p>
          <div className="mt-3 flex flex-col gap-2">
            <a href={waLink()} className="flex min-h-11 items-center gap-3 font-semibold hover:underline">
              <Icon name="chat" /> WhatsApp {CONTACT.phoneDisplay}
            </a>
            <a href={telLink} className="flex min-h-11 items-center gap-3 font-semibold hover:underline">
              <Icon name="phone" /> Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
