import SectionHeading from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, cx, section } from '../lib/classes';
import { freedomIcons } from '../data/content';

export default function Freedom() {
  const scope = useSectionAnimation({ stagger: 0.15 });
  const t = useT();

  return (
    <section className={cx(section, 'bg-black')} ref={scope}>
      <div className={container}>
        <SectionHeading title={t.freedom.title} light />

        {/* The frame wipes open, and the photo inside drifts as the page scrolls. */}
        <figure
          className="mt-12 overflow-hidden rounded-2xl"
          data-reveal-clip
        >
          <img
            src="/assets/images/banner/garibook_freedom.webp"
            alt="A Garibook car on an open road"
            loading="lazy"
            className="h-[clamp(220px,40vw,520px)] w-full scale-115 object-cover"
            data-parallax="7"
          />
        </figure>

        <ul className="mt-12 ml-auto grid max-w-[1000px] gap-8.5 md:grid-cols-3 md:gap-10">
          {t.freedom.points.map((point, i) => (
            <li key={point.title} data-reveal>
              <img src={freedomIcons[i]} alt="" aria-hidden="true" height="56" className="h-14 w-auto" />
              <h3 className="mt-6 text-title font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-subhead font-medium text-gb-muted-2">{point.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
