import Button from '../components/Button';
import { MaskedLines } from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, cx, heading, section } from '../lib/classes';
import { APP_DOWNLOAD_URL, arrivalGallery } from '../data/content';

export default function BookingToArrival() {
  const scope = useSectionAnimation({ stagger: 0.1 });
  const t = useT();

  return (
    <section className={cx(section, 'bg-black')} ref={scope}>
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className={cx(heading, 'max-w-[760px] text-white')}>
            <MaskedLines text={t.arrival.title} />
          </h2>
          <div data-reveal>
            <Button variant="primary" href={APP_DOWNLOAD_URL} external>
              {t.download.cta}
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-5">
          {arrivalGallery.map((item, i) => (
            <figure
              key={item.image}
              className={cx(
                'group overflow-hidden rounded-2xl bg-[#101010]',
                item.span === 'wide' && 'col-span-2'
              )}
              data-reveal
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className={cx(
                  'w-full scale-110 object-cover transition-transform duration-800 ease-gb group-hover:scale-120',
                  item.span === 'wide' ? 'h-[220px] md:h-[300px]' : 'h-[190px] md:h-[300px]'
                )}
                /* Alternating drift keeps the mosaic from moving as one slab. */
                data-parallax={i % 2 === 0 ? 5 : -5}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
