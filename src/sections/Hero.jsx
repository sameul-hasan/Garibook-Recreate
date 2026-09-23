import { useLayoutEffect, useRef } from 'react';
import Button from '../components/Button';
import { multiline } from '../components/SectionHeading';
import { useTypewriter } from '../hooks/useTypewriter';
import { useT } from '../i18n/LanguageContext';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { container, cx } from '../lib/classes';
import { APP_DOWNLOAD_URL } from '../data/content';

/**
 * GSAP animation #1 — the hero. An entrance timeline plays the headline,
 * supporting copy and CTA in on first paint; a second, scrubbed timeline
 * drifts the whole block upward and fades it out as the hero scrolls away.
 */
export default function Hero() {
  const root = useRef(null);
  const t = useT();
  const typed = useTypewriter(t.heroPhrases);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
        .from('[data-hero-title]', { y: 40, opacity: 0 })
        .from('[data-hero-text]', { y: 30, opacity: 0 }, '-=0.6')
        .from('[data-hero-cta]', { y: 24, opacity: 0, scale: 0.96 }, '-=0.55');

      gsap.to('[data-hero-drift]', {
        y: -70,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 55%', scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    // Deep bottom padding: the booking widget overlaps this section.
    <section
      className="relative bg-white bg-[radial-gradient(120%_90%_at_85%_0%,rgba(14,82,255,0.07)_0%,rgba(255,255,255,0)_60%)] pt-[100px] pb-[220px] md:pt-[120px] lg:pt-[190px] lg:pb-[320px]"
      ref={root}
    >
      <div
        className={cx(container, 'grid items-start gap-5 lg:grid-cols-2 lg:gap-10')}
        data-hero-drift
      >
        <div>
          {/* min-height reserves two lines so the typewriter never reflows the layout */}
          <h1
            className="min-h-[2.4em] text-display font-bold text-gb-ink lg:min-h-[2.3em]"
            data-hero-title
          >
            {multiline(typed)}
            <span
              className="ml-1.5 inline-block h-[0.85em] w-[3px] animate-blink bg-gb-primary align-[-0.08em]"
              aria-hidden="true"
            />
          </h1>
        </div>

        <div className="lg:pt-3">
          <p className="text-lead font-medium text-gb-muted-2" data-hero-text>
            {t.heroSubtitle}
          </p>
          <div data-hero-cta>
            <Button className="mt-8" variant="yellow" wide href={APP_DOWNLOAD_URL} external>
              {t.download.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
