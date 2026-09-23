import { useLayoutEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import SectionHeading, { multiline } from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, cx, heading, section, subheading } from '../lib/classes';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { rideIcons, serviceFeatures, serviceTabIds } from '../data/content';

const TAB =
  'rounded-full border px-4.5 py-2.5 text-sm font-semibold transition duration-300 ease-gb sm:px-6.5 sm:py-3 sm:text-base';

const CARD =
  'group flex flex-col justify-center overflow-hidden rounded-xl p-7 transition duration-500 ease-gb sm:min-h-[330px] sm:p-9';

function RidesPanel() {
  const scope = useSectionAnimation({ stagger: 0.12 });
  const t = useT();

  return (
    <div ref={scope}>
      <SectionHeading title={t.services.ridesTitle} className="mb-10" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {t.services.rides.map((service, i) => (
          <article
            key={service.title}
            className={cx(
              CARD,
              i === 0
                ? 'is-featured bg-gb-primary shadow-[0_24px_50px_-24px_rgba(14,82,255,0.6)]'
                : 'bg-gb-primary-soft hover:-translate-y-1 hover:bg-gb-primary hover:shadow-[0_24px_50px_-24px_rgba(14,82,255,0.6)]'
            )}
            data-reveal
          >
            <div className="relative z-1 after:absolute after:top-0 after:-left-9 after:-z-1 after:h-[86px] after:w-0 after:rounded-r-xl after:bg-white after:transition-[width] after:duration-500 after:ease-gb after:content-[''] group-[.is-featured]:after:w-30 group-hover:after:w-30">
              <img
                src={rideIcons[i]}
                alt=""
                aria-hidden="true"
                height="72"
                className="h-18 w-auto transition-[margin] duration-500 ease-gb group-[.is-featured]:ml-5 group-hover:ml-5"
              />
            </div>
            <h3 className="mt-7 text-[22px]/tight font-bold transition-colors duration-500 ease-gb group-[.is-featured]:text-white group-hover:text-white">
              {service.title}
            </h3>
            <p className="mt-3 text-base/relaxed font-medium text-gb-muted transition-colors duration-500 ease-gb group-[.is-featured]:text-white group-hover:text-white">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * The Business / Club / VMS tabs share this split layout. Their copy stays in
 * English in both languages, exactly as on the reference site.
 */
function FeaturePanel({ feature, learnMore }) {
  const scope = useSectionAnimation();

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12" ref={scope} lang="en">
      <div className="lg:pr-5">
        <h3 className={heading} data-reveal>
          {multiline(feature.title)}
        </h3>
        <p className={subheading} data-reveal>
          {feature.description}
        </p>
        <div data-reveal>
          <Button variant="primary" href={feature.href} className="mt-8">
            {learnMore}
          </Button>
        </div>
      </div>
      <div data-reveal>
        <img
          src={feature.image}
          alt={feature.title.replace('\n', ' ')}
          loading="lazy"
          className="h-80 w-full rounded-2xl object-cover lg:h-[460px]"
        />
      </div>
    </div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('rides');
  const panel = useRef(null);
  const t = useT();

  // Cross-fade the panel whenever the visitor switches tab.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !panel.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, panel);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section className={section}>
      <div className={container}>
        <SectionHeading title={t.services.title} />

        <div className="mt-7 flex flex-wrap gap-3" role="tablist" aria-label={t.services.title}>
          {serviceTabIds.map((id, i) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              className={cx(
                TAB,
                activeTab === id
                  ? 'border-gb-primary bg-gb-primary text-white'
                  : 'border-gb-border bg-white text-gb-ink hover:-translate-y-0.5 hover:border-gb-primary hover:text-gb-primary'
              )}
              onClick={() => setActiveTab(id)}
            >
              {t.services.tabs[i]}
            </button>
          ))}
        </div>

        <div className="mt-12" ref={panel}>
          {activeTab === 'rides' ? (
            <RidesPanel key={t.code} />
          ) : (
            <FeaturePanel
              key={activeTab}
              feature={serviceFeatures[activeTab]}
              learnMore={t.services.learnMore}
            />
          )}
        </div>
      </div>
    </section>
  );
}
