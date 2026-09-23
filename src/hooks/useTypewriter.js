import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/**
 * Types each phrase out, holds it, deletes it, then moves to the next one.
 * Returns the text currently on screen.
 */
export function useTypewriter(phrases, { typeMs = 70, deleteMs = 35, holdMs = 1800 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    // With reduced motion we simply show the first phrase, no cycling.
    if (prefersReducedMotion()) {
      setText(phrases[0]);
      return undefined;
    }

    const phrase = phrases[index % phrases.length];

    if (!isDeleting && text === phrase) {
      const hold = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(hold);
    }

    if (isDeleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return undefined;
    }

    const tick = setTimeout(
      () =>
        setText((current) =>
          isDeleting
            ? phrase.slice(0, current.length - 1)
            : phrase.slice(0, current.length + 1)
        ),
      isDeleting ? deleteMs : typeMs
    );

    return () => clearTimeout(tick);
  }, [text, isDeleting, index, phrases, typeMs, deleteMs, holdMs]);

  return text;
}
