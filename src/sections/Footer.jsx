import Button from '../components/Button';
import { multiline } from '../components/SectionHeading';
import { ArrowRight } from '../components/icons';
import { useT } from '../i18n/LanguageContext';
import { container } from '../lib/classes';
import { APP_DOWNLOAD_URL, contactInfo, footerHrefs, partners } from '../data/content';

/** Footer link with the yellow underline that wipes in from the right. */
const LINK =
  'relative text-[17px]/loose text-white transition-colors duration-400 ease-gb ' +
  'hover:text-gb-yellow after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 ' +
  'after:bg-gb-yellow after:transition-[width] after:duration-500 ' +
  'after:ease-[cubic-bezier(0.645,0.045,0.355,1)] after:content-[""] ' +
  'hover:after:left-0 hover:after:right-auto hover:after:w-full';

const COLUMN_TITLE = 'mb-5 text-xl font-semibold tracking-[-0.6px] text-white';

export default function Footer() {
  const t = useT();

  return (
    <footer className="relative overflow-hidden bg-black pt-[70px] text-white">
      <div className={container}>
        <div className="grid gap-8 pb-15 md:grid-cols-2 lg:grid-cols-[1.1fr_1.4fr_1.8fr_1.4fr] lg:gap-10">
          {t.footer.columns.map((column, ci) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className={COLUMN_TITLE}>{column.title}</h2>
              <ul className="space-y-2">
                {column.links.map((label, li) => {
                  const href = footerHrefs[ci][li];
                  const external = href.startsWith('http');
                  return (
                    <li key={label}>
                      <a
                        className={LINK}
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={COLUMN_TITLE}>{t.footer.contacts}</h2>
            <ul className="space-y-2">
              <li>
                <a className={LINK} href={`mailto:${contactInfo.email}`} lang="en">
                  {contactInfo.email}
                </a>
              </li>
              <li className="text-base/relaxed text-white/80">{t.footer.address}</li>
              <li>
                <a className={LINK} href={contactInfo.phoneHref}>
                  {t.footer.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-10 pb-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-title font-bold text-white">
              {multiline(t.footer.downloadTitle)}
            </h2>
            <Button variant="primary" href={APP_DOWNLOAD_URL} external className="mt-7">
              {t.download.cta}
            </Button>
          </div>

          <ul className="flex flex-col gap-10 sm:flex-row sm:flex-wrap lg:justify-around">
            {partners.map((partner) => (
              <li key={partner.name}>
                <h2 className="text-title font-bold text-white">{t.footer[partner.key]}</h2>
                <div className="mt-5 inline-flex items-center gap-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    height="72"
                    className="h-18 w-auto object-contain"
                  />
                  <div lang="en">
                    <h3 className="text-lg font-semibold">{partner.name}</h3>
                    <a
                      className="mt-1.5 inline-flex items-center gap-2 font-bold text-gb-yellow-text transition-[gap] duration-300 ease-gb hover:gap-3.5"
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{t.footer.visitWebsite}</span>
                      <ArrowRight className="size-5" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-0 border-t border-white/15" />

        <div className="flex flex-col items-center gap-6 py-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-2 text-center lg:flex-row lg:gap-8">
            <img
              src="/assets/images/Garibook_Logo.svg"
              alt="Garibook"
              height="40"
              className="h-10 w-auto"
            />
            <a className={LINK} href="/terms-and-conditions">
              {t.footer.terms}
            </a>
            <a className={LINK} href="/privacy-policy">
              {t.footer.privacy}
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-center text-[15px] text-white/80 lg:flex-row lg:gap-8">
            <span lang="en">{multiline(t.footer.tradeLicense)}</span>
            <span lang="en">© {new Date().getFullYear()} Garibook.com</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto [scrollbar-color:var(--color-gb-primary)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-gb-primary [&::-webkit-scrollbar]:h-1">
        <img
          src="/assets/images/clients/ssl.png"
          alt="Accepted payment methods"
          loading="lazy"
          className="h-auto max-w-none max-h-16 lg:max-w-full"
        />
      </div>
    </footer>
  );
}
