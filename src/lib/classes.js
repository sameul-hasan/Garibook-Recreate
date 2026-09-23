/** Class strings shared across sections, kept in one place. */

export const container = 'mx-auto w-full max-w-gb px-4';

/** Vertical rhythm of a page band: 50px on small screens, 70px from lg up. */
export const section = 'py-[50px] lg:py-[70px]';

export const heading = 'text-heading font-bold text-gb-ink-2';

export const subheading = 'mt-4 text-subhead font-medium text-gb-muted';

/** Arrow that slides forward when its `group` is hovered. */
export const arrowNudge =
  'transition-transform duration-[555ms] ease-gb group-hover:translate-x-1.5 group-hover:scale-110';

/** Horizontal scroll-snap track with the native scrollbar hidden. */
export const carouselTrack =
  'mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 ' +
  '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

/** A card that lifts on hover, used by the newsroom and blog grids. */
export const cardLift =
  'transition duration-450 ease-gb hover:-translate-y-1.5 ' +
  'hover:shadow-[0_26px_50px_-26px_rgba(18,18,18,0.4)]';

/** Joins conditional class names, skipping falsy values. */
export const cx = (...parts) => parts.filter(Boolean).join(' ');
