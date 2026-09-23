import Button from '../components/Button';
import SectionHeading, { MaskedLines } from '../components/SectionHeading';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { useT } from '../i18n/LanguageContext';
import { container, section } from '../lib/classes';
import { DRIVER_APP_URL } from '../data/content';

export default function SmartDriver() {
  const scope = useSectionAnimation();
  const t = useT();

  return (
    <section className={section} ref={scope}>
      <div className={container}>
        <SectionHeading title={t.driver.title} />

        <div className="mt-12 grid items-end gap-6 overflow-hidden rounded-2xl bg-gb-yellow-text lg:grid-cols-2">
          <div className="flex flex-col items-start justify-center px-7 pt-10 lg:px-10 lg:py-14 lg:pl-20">
            {/* Sized to keep the headline on two lines inside the half-width column. */}
            <h3 className="mb-8 text-[clamp(1.75rem,1rem+2.6vw,3.25rem)]/[1.14] font-bold text-gb-primary">
              <MaskedLines text={t.driver.headline} />
            </h3>
            <div data-reveal>
              <Button variant="primary" wide href={DRIVER_APP_URL} external>
                {t.driver.cta}
              </Button>
            </div>
          </div>

          <div className="self-end overflow-hidden text-center">
            <img
              src="/assets/images/app-screen/no_commission_app_screen.png"
              alt="The Garibook Smart Driver app"
              loading="lazy"
              className="mx-auto block max-h-85 w-auto lg:max-h-120"
              data-parallax="5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
