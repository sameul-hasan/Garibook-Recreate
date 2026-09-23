import SectionHeading from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, section } from '../lib/classes';
import { togetherImages } from '../data/content';

export default function PeopleTogether() {
  const scope = useSectionAnimation({ stagger: 0.14 });
  const t = useT();

  return (
    <section className={section} ref={scope}>
      <div className={container}>
        <SectionHeading title={t.together.title} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.together.cards.map((title, i) => (
            <article
              key={title}
              className="group relative isolate overflow-hidden rounded-2xl after:absolute after:inset-0 after:bg-linear-to-b after:from-black/55 after:to-transparent after:to-45% after:content-['']"
              data-reveal
            >
              <img
                src={togetherImages[i]}
                alt={title}
                loading="lazy"
                className="h-65 w-full scale-115 object-cover transition-transform duration-800 ease-gb group-hover:scale-125 sm:h-80 lg:h-[420px]"
                data-parallax="6"
              />
              <h3 className="absolute inset-x-5.5 top-6 z-1 text-title font-bold text-white lg:inset-x-7.5 lg:top-9">
                {title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
