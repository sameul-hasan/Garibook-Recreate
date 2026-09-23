import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

const format = (value) => Math.round(value).toLocaleString('en-US');

/**
 * Counts a number up from zero the first time the element scrolls into view.
 */
export function useCountUp(target, { duration = 2 } = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion()) {
      node.textContent = format(target);
      return undefined;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          node.textContent = format(counter.value);
        },
        scrollTrigger: { trigger: node, start: 'top 90%', once: true },
      });
    }, node);

    return () => ctx.revert();
  }, [target, duration]);

  return ref;
}
