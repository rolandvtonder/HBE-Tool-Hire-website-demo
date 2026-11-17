import {useEffect, useId, useRef, useState, type FormEvent, type ReactNode} from 'react';
import {mailLink, waLink} from '../content';
import {Icon} from './Icons';

type Values = {name: string; phone: string; email: string; items: string; start: string; duration: string; how: string; site: string; notes: string};
type Key = keyof Values;

const EMPTY: Values = {name: '', phone: '', email: '', items: '', start: '', duration: '1 day', how: 'Collect from yard', site: '', notes: ''};
const LABELS: Record<Key, string> = {
  name: 'Your name',
  phone: 'Phone number',
  email: 'Email',
  items: 'Equipment needed',
  start: 'Hire start date',
  duration: 'How long',
  how: 'Collect or deliver',
  site: 'Delivery address / suburb',
  notes: 'Anything else',
};

function validate(v: Values): Partial<Record<Key, string>> {
  const e: Partial<Record<Key, string>> = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name so we know who to ask for.';
  if (v.phone.replace(/\D/g, '').length < 9) e.phone = 'Enter a phone number we can reach you on, e.g. 073 771 3494.';
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Check the email address — it should look like name@example.co.za.';
  if (v.items.trim().length < 3) e.items = 'Tell us what equipment you need (or describe the job).';
  if (!v.start) e.start = 'Choose the date you need it from.';
  if (v.how === 'Deliver to site' && v.site.trim().length < 3) e.site = 'Enter the site address or suburb for delivery.';
  return e;
}

function compose(v: Values) {
  return [
    'Hi HBE, I’d like a hire quote.',
    '',
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    `Equipment: ${v.items}`,
    `From: ${v.start} (${v.duration})`,
    `${v.how}${v.how === 'Deliver to site' ? `: ${v.site}` : ''}`,
    v.notes && `Notes: ${v.notes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Quote request. There is no server: "Send on WhatsApp" opens WhatsApp with
 * the request written out, "Send by email" opens the visitor's mail app.
 * Errors show under each field once it's been left, and in a focused summary
 * after a failed submit.
 */
export function QuoteForm() {
  const uid = useId();
  const [v, setV] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState('');
  const summary = useRef<HTMLDivElement>(null);
  const errors = validate(v);
  const shown = (k: Key) => (touched[k] || submitted) && errors[k];

  // Prefill from ?item= links on the equipment pages.
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get('item');
    if (item) setV((s) => ({...s, items: item}));
  }, []);

  const set = (k: Key) => (e: {target: {value: string}}) => setV((s) => ({...s, [k]: e.target.value}));
  const blur = (k: Key) => () => setTouched((t) => ({...t, [k]: true}));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      setStatus('');
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
    const text = compose(v);
    if (via === 'email') {
      window.location.href = mailLink(`Hire quote — ${v.items.slice(0, 60)}`, text);
      setStatus('Your email app should open with the request written out — just press send.');
    } else {
      window.open(waLink(text), '_blank', 'noopener');
      setStatus('WhatsApp should open with your request written out — just press send. We’ll reply as soon as we can.');
    }
  };

  const id = (k: Key) => `${uid}-${k}`;
  const field = (k: Key, input: ReactNode, opts: {required?: boolean; hint?: string} = {}) => (
    <div>
      <label htmlFor={id(k)} className="block font-semibold">
        {LABELS[k]} {opts.required ? <span aria-hidden className="text-[#a33a00]">*</span> : <span className="font-normal text-stone">(optional)</span>}
      </label>
      {opts.hint && (
        <p id={`${id(k)}-hint`} className="mt-1 text-[15px] text-stone">
          {opts.hint}
        </p>
      )}
      <div className="mt-2">{input}</div>
      {shown(k) && (
        <p id={`${id(k)}-err`} className="mt-2 flex items-start gap-2 text-[15px] font-medium text-[#a33a00]">
          <Icon name="alert" size={18} className="mt-0.5 shrink-0" /> {errors[k]}
        </p>
      )}
    </div>
  );
  const describe = (k: Key, hint = false) =>
    [hint && `${id(k)}-hint`, shown(k) && `${id(k)}-err`].filter(Boolean).join(' ') || undefined;
  const box = (k: Key) =>
    `block min-h-12 w-full border-2 bg-white px-4 py-3 text-[17px] text-ink outline-none transition-colors focus:border-ink ${
      shown(k) ? 'border-[#a33a00]' : 'border-ink/20'
    }`;

  const errorList = Object.entries(errors) as [Key, string][];

  return (
    <form noValidate onSubmit={onSubmit} className="on-paper space-y-6 bg-paper p-6 text-ink md:p-10" aria-labelledby={`${uid}-title`}>
      <div>
        <h2 id={`${uid}-title`} className="display text-[clamp(36px,3.6vw,56px)]">
          Request a <span className="it">quote</span>
        </h2>
        <p className="mt-2 text-stone">Fields marked * are required. We’ll reply with availability and a price.</p>
      </div>

      {submitted && errorList.length > 0 && (
        <div ref={summary} tabIndex={-1} role="alert" className="border-l-4 border-[#a33a00] bg-white p-5 outline-none">
          <p className="font-bold">Please fix {errorList.length === 1 ? 'this' : `these ${errorList.length}`} before sending:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline">
                  {LABELS[k]}
                </a>{' '}
                — {msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {field(
          'name',
          <input id={id('name')} name="name" autoComplete="name" value={v.name} onChange={set('name')} onBlur={blur('name')} required aria-invalid={!!shown('name')} aria-describedby={describe('name')} className={box('name')} />,
          {required: true},
        )}
        {field(
          'phone',
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} required aria-invalid={!!shown('phone')} aria-describedby={describe('phone')} className={box('phone')} />,
          {required: true},
        )}
      </div>

      {field(
        'email',
        <input id={id('email')} name="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} onBlur={blur('email')} aria-invalid={!!shown('email')} aria-describedby={describe('email')} className={box('email')} />,
      )}

      {field(
        'items',
        <textarea id={id('items')} name="items" rows={3} value={v.items} onChange={set('items')} onBlur={blur('items')} required aria-invalid={!!shown('items')} aria-describedby={describe('items', true)} className={box('items')} />,
        {required: true, hint: 'e.g. “Plate compactor and a petrol generator” — or describe the job and we’ll suggest.'},
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {field(
          'start',
          <input id={id('start')} name="start" type="date" value={v.start} onChange={set('start')} onBlur={blur('start')} required aria-invalid={!!shown('start')} aria-describedby={describe('start')} className={box('start')} />,
          {required: true},
        )}
        {field(
          'duration',
          <select id={id('duration')} name="duration" value={v.duration} onChange={set('duration')} className={box('duration')}>
            {['1 day', '2–3 days', 'Weekend', '1 week', '2 weeks', 'Longer / not sure'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>,
        )}
      </div>

      <fieldset>
        <legend className="font-semibold">{LABELS.how}</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {['Collect from yard', 'Deliver to site'].map((o) => (
            <label key={o} className={`flex min-h-12 items-center gap-3 border-2 bg-white px-4 py-3 ${v.how === o ? 'border-ink' : 'border-ink/20'}`}>
              <input type="radio" name="how" value={o} checked={v.how === o} onChange={set('how')} className="size-5 accent-ink" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      {v.how === 'Deliver to site' &&
        field(
          'site',
          <input id={id('site')} name="site" autoComplete="street-address" value={v.site} onChange={set('site')} onBlur={blur('site')} required aria-invalid={!!shown('site')} aria-describedby={describe('site')} className={box('site')} />,
          {required: true},
        )}

      {field('notes', <textarea id={id('notes')} name="notes" rows={3} value={v.notes} onChange={set('notes')} className={box('notes')} />)}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button type="submit" name="via" value="whatsapp" className="caps flex min-h-12 flex-1 items-center justify-center gap-3 bg-ink px-6 py-4 text-white transition-colors hover:bg-steel">
          <Icon name="chat" size={18} /> Send on WhatsApp
        </button>
        <button type="submit" name="via" value="email" className="caps flex min-h-12 flex-1 items-center justify-center gap-3 border-2 border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-white">
          <Icon name="mail" size={18} /> Send by email
        </button>
      </div>

      <p role="status" aria-live="polite" className={status ? 'flex items-start gap-2 bg-white p-4 font-medium' : 'sr-only'}>
        {status && <Icon name="check" size={20} className="mt-0.5 shrink-0" />}
        {status}
      </p>
    </form>
  );
}
