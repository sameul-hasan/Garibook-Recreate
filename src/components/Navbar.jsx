import { useEffect, useState } from 'react';
import { navLinks } from '../data/content';
import { useLanguage } from '../i18n/LanguageContext';
import { Close, Globe } from './icons';
import { container, cx } from '../lib/classes';

const NAV_LINK =
  'relative py-1.5 text-[17px] font-medium tracking-[-0.3px] text-gb-ink transition-colors ' +
  'duration-300 ease-gb hover:text-gb-primary focus-visible:text-gb-primary ' +
  "after:absolute after:-bottom-1.5 after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 " +
  'after:rounded-full after:bg-gb-primary after:transition-[width] after:duration-500 ' +
  'after:ease-[cubic-bezier(0.645,0.045,0.355,1)] after:content-[""] hover:after:w-full ' +
  'focus-visible:after:w-full';

export default function Navbar() {
  const { t, language, toggle } = useLanguage();
  const [isSticky, setSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // The reference header pins to the top once the hero starts scrolling away.
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and allow Esc to close while the mobile drawer is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  /** Shows the language you would switch *to*, as on the reference site. */
  const LanguageButton = ({ className = '' }) => (
    <button
      type="button"
      onClick={toggle}
      lang={language}
      aria-label={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      className={cx(
        'items-center gap-2 rounded-lg bg-gb-primary px-3 py-2.5 text-[15px] font-semibold text-white transition duration-300 ease-gb hover:-translate-y-px hover:bg-gb-primary-dark xl:px-3.5',
        className
      )}
    >
      <Globe className="size-4.5" />
      <span>{t.label}</span>
    </button>
  );

  return (
    <header
      className={cx(
        'inset-x-0 top-0 z-100 transition-all duration-300 ease-gb',
        isSticky
          ? 'fixed animate-slide-down bg-white py-3 shadow-[0_8px_20px_rgba(0,0,0,0.1)]'
          : 'absolute py-5'
      )}
    >
      <div className={cx(container, 'flex items-center gap-6')}>
        <a href="/" aria-label="Garibook">
          <img
            src="/assets/images/gaibook-logo.svg"
            alt="Garibook"
            height="44"
            className="h-9 w-auto xl:h-11"
          />
        </a>

        <nav className="ms-auto hidden items-center gap-7 xl:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.key} className={NAV_LINK} href={link.href}>
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-3 xl:ms-0">
          {/* On mobile this lives inside the drawer instead. */}
          <LanguageButton className="hidden xl:inline-flex" />

          <a
            className="rounded-lg bg-gb-primary px-4.5 py-2.5 text-[15px] font-semibold tracking-[-0.4px] text-white transition duration-300 ease-gb hover:-translate-y-px hover:bg-gb-primary-dark xl:px-6.5 xl:py-3 xl:text-[17px]"
            href="/login"
          >
            {t.nav.login}
          </a>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-gb-border bg-white xl:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="gb-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cx(
                'relative mx-auto block h-0.5 w-5 rounded-sm transition duration-300 ease-gb',
                'before:absolute before:left-0 before:-top-1.5 before:block before:h-0.5 before:w-5 before:rounded-sm before:bg-gb-ink before:transition before:duration-300 before:ease-gb before:content-[""]',
                'after:absolute after:left-0 after:top-1.5 after:block after:h-0.5 after:w-5 after:rounded-sm after:bg-gb-ink after:transition after:duration-300 after:ease-gb after:content-[""]',
                isMenuOpen
                  ? 'bg-transparent before:translate-y-1.5 before:rotate-45 after:-translate-y-1.5 after:-rotate-45'
                  : 'bg-gb-ink'
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile off-canvas drawer */}
      <div
        className={cx(
          'fixed inset-0 z-110 bg-gb-ink/45 transition-opacity duration-300 ease-gb sm:block',
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="gb-mobile-nav"
        className={cx(
          'fixed inset-y-0 right-0 z-120 flex w-full flex-col overflow-hidden bg-gb-primary',
          'transition-transform duration-400 ease-gb sm:w-100',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        {...(isMenuOpen ? {} : { inert: '' })}
      >
        <div className="relative z-1 flex items-center justify-end gap-2 px-4 py-1.5">
          <LanguageButton className="inline-flex bg-transparent px-3 hover:translate-y-0 hover:bg-white/15" />
          <button
            type="button"
            className="grid size-8 place-items-center text-white transition-transform duration-300 ease-gb hover:rotate-90"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <Close className="size-4.5" />
          </button>
        </div>

        <nav className="relative z-1 flex flex-col items-center px-4 pt-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-center text-base text-white transition-opacity duration-300 ease-gb hover:opacity-70"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <img
          className="pointer-events-none absolute right-0 bottom-0 w-40"
          src="/assets/images/logo-vector.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
