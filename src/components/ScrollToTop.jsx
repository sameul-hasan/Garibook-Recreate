import { useEffect, useState } from 'react';
import { ArrowUp } from './icons';
import { cx } from '../lib/classes';

/** Fixed button that returns the visitor to the top, once they have scrolled. */
export default function ScrollToTop() {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cx(
        // Sits directly above the live-chat bubble, as on the reference site.
        'fixed right-6 bottom-24 z-90 grid size-12.5 place-items-center rounded-md bg-gb-primary',
        'text-white transition duration-300 ease-gb hover:-translate-y-0.5 hover:bg-gb-primary-dark',
        'lg:right-9',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
