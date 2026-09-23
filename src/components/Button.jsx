import { ArrowRight } from './icons';
import { arrowNudge, cx } from '../lib/classes';

const BASE =
  'group inline-flex items-center justify-between gap-3 rounded-[15px] border-2 px-6 py-4 ' +
  'text-left text-base font-semibold leading-snug sm:px-7 sm:py-[18px] lg:text-xl ' +
  'origin-left transition duration-[555ms] ease-gb hover:scale-[1.03] active:scale-[0.99]';

const VARIANTS = {
  primary:
    'border-gb-primary bg-gb-primary text-white hover:shadow-[0_14px_30px_-12px_rgba(14,82,255,0.7)]',
  yellow:
    'border-gb-yellow bg-gb-yellow text-black hover:border-gb-yellow-dark hover:bg-gb-yellow-dark ' +
    'hover:shadow-[0_14px_30px_-12px_rgba(253,211,0,0.8)]',
};

/**
 * The site's call-to-action button: label on the left, arrow that nudges on
 * hover on the right. Renders as `<a>` when given an href, otherwise as a
 * `<button>` of the given `type`. `wide` matches the fixed-width CTAs on the
 * reference site, which stay full width on small screens.
 */
export default function Button({
  children,
  variant = 'primary',
  wide = false,
  href,
  external = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = cx(BASE, VARIANTS[variant], wide && 'w-full sm:w-[320px]', className);

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className={cx('size-5 shrink-0', arrowNudge)} />
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
