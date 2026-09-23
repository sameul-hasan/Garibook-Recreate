import { Fragment } from 'react';
import { cx, heading, subheading } from '../lib/classes';

/** Splits a string on "\n" into lines separated by <br />. */
export const multiline = (text) =>
  text.split('\n').map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

/**
 * Renders each line of a heading inside its own clipped row, so the lines can
 * wipe up from behind their own edge one after another.
 */
export function MaskedLines({ text }) {
  return text.split('\n').map((line) => (
    <span key={line} className="block overflow-hidden pb-[0.08em]">
      <span className="block" data-reveal-mask>
        {line}
      </span>
    </span>
  ));
}

/**
 * Section title + optional supporting paragraph.
 * `title` may contain "\n" for the deliberate line breaks used on the site.
 */
export default function SectionHeading({ title, subtitle, light = false, className = '' }) {
  return (
    <header className={className}>
      <h2 className={cx(heading, light && 'text-white')}>
        <MaskedLines text={title} />
      </h2>
      {subtitle && (
        <p className={cx(subheading, light && 'text-white/70')} data-reveal>
          {subtitle}
        </p>
      )}
    </header>
  );
}
