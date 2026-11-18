import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {CONTACT, SITE, telLink, waLink} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {lockScroll, startScroll} from '../lib/scroll';
import {Footer} from './Footer';
import {Icon} from './Icons';
import {Menu} from './Menu';
import {u} from '../lib/url';

/** The HBE / Hamashe Business Enterprise logo (it has its own black square) plus the trading name. */
export function Wordmark({compact = false}: {compact?: boolean}) {
  return (
    <span className="flex items-center gap-3 bg-ink/70 backdrop-blur-md sm:pr-4">
      <img
        src={u('/media/logo-160.png')}
        srcSet={`${u('/media/logo-160.png')} 1x, ${u('/media/logo-320.png')} 2x`}
        alt=""
        width={54}
        height={55}
        className="block size-[54px]"
      />
      {!compact && (
        <span className="caps hidden leading-tight text-white sm:block">
          Tool Hire
          <br />& Rentals
        </span>
      )}
    </span>
  );
}

/** Layout shared by every page: brand, menu button, menu, quote button, footer. */
export function Site({path, children}: {path: string; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => startScroll(reduced), [reduced]);

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus({preventScroll: true});
  }, []);

  const onContact = path === '/contact/';

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <a
        href={u('/')}
        aria-label={`${SITE.name} — home`}
        className="vt-brand fixed top-4 left-[var(--edge)] z-[55] rounded-sm drop-shadow-[0_2px_14px_rgb(0_0_0/0.35)] md:top-6"
      >
        <Wordmark />
      </a>

      <button
        ref={menuBtn}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`vt-menu caps fixed top-4 right-[var(--edge)] z-[55] flex min-h-11 items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-6 ${
          open ? 'bg-ink text-white' : 'bg-ink/55 text-white hover:bg-ink/80'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <Icon name="plus" size={18} className={`transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`} />
      </button>

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>

      <Footer />

      {/* Fixed actions: call (phones only) and the main quote button. */}
      <div
        inert={open}
        className={`vt-cta fixed right-[var(--edge)] bottom-4 z-[55] flex items-stretch gap-2 transition-opacity duration-300 md:bottom-6 ${open ? 'opacity-0' : 'opacity-100'}`}
      >
        <a
          href={telLink}
          aria-label={`Call ${CONTACT.phoneDisplay}`}
          className="grid min-h-12 min-w-12 place-items-center bg-ink text-red shadow-lg ring-1 ring-white/15 md:hidden"
        >
          <Icon name="phone" />
        </a>
        <a
          href={onContact ? waLink() : u('/contact/')}
          className={`caps flex min-h-12 items-center gap-3 px-6 py-3.5 shadow-[0_10px_30px_rgb(0_0_0/0.3)] transition-colors duration-300 md:px-8 md:py-4 ${
            open ? 'bg-paper text-ink' : 'bg-red-deep text-white hover:bg-white hover:text-ink'
          }`}
        >
          {onContact ? (
            <>
              <Icon name="chat" size={18} /> WhatsApp <em className="normal-case">us</em>
            </>
          ) : (
            <>
              Get a <em className="normal-case">quote</em> <Icon name="arrow" size={18} />
            </>
          )}
        </a>
      </div>

      <Menu open={open} path={path} onClose={close} />
      <div className="grain" aria-hidden />
    </>
  );
}
