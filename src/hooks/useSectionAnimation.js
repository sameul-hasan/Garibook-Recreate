import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * One scroll-animation scope per section. Returns a ref to spread on the
 * section element; everything inside is driven by data attributes:
 *
 *   data-reveal        fade + rise, staggered in DOM order
 *   data-reveal-mask   wipes up from behind its own clip edge (headings)
 *   data-reveal-clip   image wipe, revealed top to bottom (large banners)
 *   data-parallax="8"  drifts by ±N% of its height while the section scrolls
 *
 * Every animation is skipped — with the element left in its final state —
 * when the visitor prefers reduced motion.
 */
export function useSectionAnimation({ y = 48, stagger = 0.12, start = 'top 82%' } = {}) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const reveals = root.querySelectorAll('[data-reveal]');
    const masks = root.querySelectorAll('[data-reveal-mask]');
    const clips = root.querySelectorAll('[data-reveal-clip]');
    const parallax = root.querySelectorAll('[data-parallax]');

    if (prefersReducedMotion()) {
      gsap.set([...reveals, ...masks], { opacity: 1, y: 0 });
      gsap.set(clips, { clipPath: 'inset(0% 0% 0% 0%)' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (masks.length) {
        gsap.from(masks, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: root, start, once: true },
        });
      }

      if (reveals.length) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger,
            scrollTrigger: { trigger: root, start, once: true },
          }
        );
      }

      clips.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });

      // Scrubbed parallax: the element drifts against the scroll direction
      // across the whole time its frame is on screen.
      parallax.forEach((el) => {
        const distance = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -distance },
          {
            yPercent: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return scope;
}
