import { useEffect, useId, useRef, useState } from 'react';
import { Chat, Close, Minus, Send } from './icons';
import { cx } from '../lib/classes';

/* Deliberately sets no width: each field picks its own, and a `w-full` here
   would win the cascade against the narrow dialling-code select. */
const FIELD =
  'rounded border border-gb-border px-3 py-2.5 text-[15px] text-gb-ink ' +
  'transition-colors duration-200 ease-gb placeholder:text-gb-muted-2 ' +
  'focus:border-gb-primary focus:outline-none';

const DIAL_CODES = ['+880', '+91', '+971', '+966', '+44', '+1'];

/**
 * Recreation of the live-chat widget the reference site floats in the corner.
 *
 * It is presentation only — there is no support backend here, so submitting
 * acknowledges locally and nothing leaves the page.
 */
export default function LiveChat() {
  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', dial: '+880', phone: '', query: '' });
  const firstField = useRef(null);
  const uid = useId();

  useEffect(() => {
    if (!isOpen) return undefined;
    firstField.current?.focus();
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={`${uid}-panel`}
        aria-label={isOpen ? 'Close live chat' : 'Open live chat'}
        className={cx(
          'fixed right-5 bottom-5 z-90 grid size-14 place-items-center rounded-full bg-gb-primary',
          'text-white shadow-[0_8px_24px_-6px_rgba(14,82,255,0.7)] transition duration-300 ease-gb',
          'hover:scale-105 hover:bg-gb-primary-dark lg:right-8',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <Chat className="size-6" />
      </button>

      <div
        id={`${uid}-panel`}
        role="dialog"
        aria-label="Garibook live chat support"
        className={cx(
          'fixed right-4 bottom-4 z-95 flex w-[min(320px,calc(100vw-2rem))] flex-col',
          'overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_-12px_rgba(18,18,18,0.45)]',
          'transition duration-300 ease-gb lg:right-8 lg:bottom-5',
          isOpen
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible translate-y-4 scale-95 opacity-0'
        )}
        {...(isOpen ? {} : { inert: '' })}
      >
        <header className="flex items-center justify-between bg-gb-primary px-4 py-3">
          <span className="grid size-10 place-items-center rounded-full bg-white">
            <img src="/assets/images/garibook-pin.svg" alt="Garibook" className="h-5.5 w-auto" />
          </span>
          <div className="flex items-center gap-4 text-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Minimise chat"
              className="transition-opacity duration-200 ease-gb hover:opacity-70"
            >
              <Minus className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="transition-opacity duration-200 ease-gb hover:opacity-70"
            >
              <Close className="size-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4">
          <h2 className="text-center text-[13px] font-bold text-gb-ink">
            Welcome to Garibook Live Chat Support Service!
          </h2>

          {isSent ? (
            <p
              role="status"
              className="mt-6 rounded bg-gb-primary-soft p-4 text-center text-[15px] font-medium text-gb-primary"
            >
              Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} — this is a UI
              recreation, so your message stays on this page.
            </p>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                ref={firstField}
                className={cx(FIELD, 'w-full')}
                type="text"
                placeholder="Enter your name"
                aria-label="Your name"
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                required
              />

              <div className="flex gap-2">
                <select
                  className={cx(FIELD, 'select-chevron w-24 shrink-0 pr-6')}
                  aria-label="Country dialling code"
                  value={form.dial}
                  onChange={(e) => update({ dial: e.target.value })}
                >
                  {DIAL_CODES.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  className={cx(FIELD, 'min-w-0 flex-1')}
                  type="tel"
                  placeholder="Enter your mobile number"
                  aria-label="Your mobile number"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  required
                />
              </div>

              <textarea
                className={cx(FIELD, 'h-28 w-full resize-none')}
                placeholder="Write your query here"
                aria-label="Your query"
                value={form.query}
                onChange={(e) => update({ query: e.target.value })}
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  aria-label="Send message"
                  className="grid size-10 place-items-center rounded-full bg-gb-primary text-white transition duration-300 ease-gb hover:scale-105 hover:bg-gb-primary-dark"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        <footer className="bg-gb-primary py-1.5 text-center text-[10px] font-bold text-white">
          Powered by <span className="text-white">iDESK</span>
          <span className="text-[#27d17c]">360</span>
        </footer>
      </div>
    </>
  );
}
