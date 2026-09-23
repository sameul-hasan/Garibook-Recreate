import BookingWidget from './BookingWidget';
import { MaskedLines } from '../components/SectionHeading';
import { useCountUp } from '../hooks/useCountUp';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, cx } from '../lib/classes';
import { stats } from '../data/content';

function Stat({ value, suffix, label }) {
  const ref = useCountUp(value);
  return (
    <li data-reveal>
      <h3 className="text-stat font-bold text-gb-yellow-text">
        <span ref={ref}>0</span>
        {suffix}
      </h3>
      <span className="mt-1.5 block text-subhead font-semibold text-white">{label}</span>
    </li>
  );
}

/**
 * GSAP animation #2 — the numbers count up from zero the first time this
 * band scrolls into view (see `useCountUp`), alongside a staggered reveal.
 */
export default function StatsBand() {
  const scope = useSectionAnimation({ stagger: 0.15 });
  const t = useT();

  return (
    <section className="relative" ref={scope}>
      {/* The booking card straddles the hero and this band. */}
      <div className={cx(container, 'relative z-5 -mt-[220px] lg:-mt-[255px]')}>
        <BookingWidget />
      </div>

      <div className="relative -mt-15 overflow-hidden bg-linear-[270deg,#0e53ff,#0038c4] pt-35 pb-30 lg:-mt-[90px] lg:pt-45 lg:pb-[150px]">
        <div className={container}>
          <h2 className="max-w-[900px] text-display font-bold text-white">
            <MaskedLines text={t.stats.title} />
          </h2>

          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6.5 sm:flex sm:flex-wrap sm:justify-end sm:gap-8 lg:mt-14 lg:gap-12">
            {stats.map((stat, i) => (
              <Stat key={t.stats.labels[i]} {...stat} label={t.stats.labels[i]} />
            ))}
          </ul>
        </div>

        {/* Looping skyline strip with the sedan idling on it. */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[78px] w-[400%] animate-city bg-[url(/assets/images/vector/frame_1.png)] bg-[length:auto_100%] bg-repeat-x"
          aria-hidden="true"
        />
        <img
          className="pointer-events-none absolute -bottom-4 left-2.5 z-2 w-[150px] lg:left-11 lg:w-[234px]"
          src="/assets/images/vector/sedan.gif"
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
