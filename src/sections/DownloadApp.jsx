import Button from '../components/Button';
import { MaskedLines } from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container } from '../lib/classes';
import { APP_DOWNLOAD_URL } from '../data/content';

/**
 * The closing call-to-action: a blue card whose phone mockup deliberately
 * bleeds past the card's top and bottom edges, so the card is `overflow-visible`
 * and the image is absolutely positioned against it.
 *
 * The square window with `object-cover object-top` is what crops the base of
 * the hand, matching the reference.
 */
export default function DownloadApp() {
  const scope = useSectionAnimation();
  const t = useT();

  return (
    <section className="pt-[50px] lg:pt-[70px]" ref={scope}>
      <div className={container}>
        <div
          className="relative overflow-visible rounded-2xl bg-gb-primary px-5 pt-8 pb-[350px] md:px-20 md:py-20 md:pb-20 lg:p-25"
          data-reveal
        >
          {/* Between md and lg the phone sits at the card edge, so the copy is
              capped to the space beside it rather than running underneath. */}
          <div className="relative z-1 md:max-w-[54%] lg:max-w-[620px]">
            <h2 className="text-heading font-bold tracking-[-1px] text-white">
              <MaskedLines text={t.download.title} />
            </h2>
            <p className="mt-4 text-subhead font-medium text-white/90 lg:max-w-[550px]">
              {t.download.subtitle}
            </p>
            <Button className="mt-6" variant="yellow" wide href={APP_DOWNLOAD_URL} external>
              {t.download.cta}
            </Button>
          </div>

          <img
            src="/assets/images/app-screen/app-with-logo.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute right-0 bottom-0 size-[350px] object-cover object-top md:top-11 md:bottom-auto md:size-100 lg:top-[-47px] lg:right-25 lg:size-[531px]"
          />
        </div>
      </div>
    </section>
  );
}
