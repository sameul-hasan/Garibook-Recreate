import CarouselArrows from '../components/CarouselArrows';
import SectionHeading from '../components/SectionHeading';
import { ArrowRight } from '../components/icons';
import { useCarousel } from '../hooks/useCarousel';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { arrowNudge, carouselTrack, container, cx, section } from '../lib/classes';
import { newsrooms } from '../data/content';

export default function Newsroom() {
  const scope = useSectionAnimation({ stagger: 0.1 });
  const { trackRef, prev, next, atStart, atEnd } = useCarousel();
  const t = useT();

  return (
    <section className={section} ref={scope}>
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title={t.press.title} />
          <CarouselArrows onPrev={prev} onNext={next} atStart={atStart} atEnd={atEnd} />
        </div>

        <ul className={carouselTrack} ref={trackRef}>
          {newsrooms.map((item) => (
            <li
              key={item.id}
              className="flex-none basis-[clamp(280px,32vw,420px)] snap-start"
              data-reveal
            >
              {/* Each item keeps the language it was published in. */}
              <article
                lang={item.lang}
                className={cx('h-full', item.lang === 'bn' && 'bangla')}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col"
                >
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="h-[280px] w-full object-cover transition-transform duration-800 ease-gb group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <span className="text-[15px] font-medium text-gb-muted-2">{item.date}</span>
                    <h3 className="mt-3 text-xl/snug font-bold text-gb-ink transition-colors duration-300 ease-gb group-hover:text-gb-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-base/relaxed font-medium text-gb-muted">
                      {item.text}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <img
                        src={item.brand}
                        alt={item.outlet}
                        loading="lazy"
                        className="h-8 w-auto max-w-[164px] object-contain"
                      />
                      <span
                        lang="en"
                        className="inline-flex shrink-0 items-center gap-2 text-[15px] font-bold text-gb-primary"
                      >
                        {t.press.readArticle}
                        <ArrowRight className={cx('size-4', arrowNudge)} />
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
