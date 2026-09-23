import { useState } from 'react';
import CarouselArrows from '../components/CarouselArrows';
import SectionHeading from '../components/SectionHeading';
import { Play } from '../components/icons';
import { useCarousel } from '../hooks/useCarousel';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { carouselTrack, container, cx, section } from '../lib/classes';
import { passengerStories } from '../data/content';

/**
 * The passenger stories are YouTube videos. The poster frame is that video's
 * own thumbnail; the iframe is only mounted once someone presses play, so no
 * third-party script loads on first paint.
 */
export default function PassengerStories() {
  const scope = useSectionAnimation({ stagger: 0.1 });
  const { trackRef, prev, next, atStart, atEnd } = useCarousel();
  const [playing, setPlaying] = useState(null);
  const t = useT();

  return (
    <section className={cx(section, 'bg-gb-primary-tint')} ref={scope}>
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            className="max-w-[820px]"
            title={t.passengers.title}
            subtitle={t.passengers.subtitle}
          />
          <CarouselArrows onPrev={prev} onNext={next} atStart={atStart} atEnd={atEnd} />
        </div>

        <ul className={carouselTrack} ref={trackRef}>
          {passengerStories.map((story) => (
            <li
              key={story.videoId}
              className="flex-none basis-[clamp(280px,32vw,420px)] snap-start"
              data-reveal
            >
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                  {playing === story.videoId ? (
                    <iframe
                      className="size-full"
                      src={`https://www.youtube-nocookie.com/embed/${story.videoId}?autoplay=1&rel=0`}
                      title={`${story.name} — Garibook passenger story`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(story.videoId)}
                      className="size-full cursor-pointer"
                      aria-label={`${t.passengers.watch}: ${story.name}`}
                    >
                      <img
                        src={story.thumb}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-800 ease-gb group-hover:scale-105"
                      />
                      <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors duration-400 ease-gb group-hover:bg-black/40">
                        <span className="grid size-16 place-items-center rounded-full bg-white/95 text-gb-primary shadow-lg transition-transform duration-400 ease-gb group-hover:scale-110">
                          <Play className="ml-1 size-6" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gb-ink">{story.name}</h3>
                  <p className="mt-1 font-bold text-gb-muted-2">{story.occupation}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
