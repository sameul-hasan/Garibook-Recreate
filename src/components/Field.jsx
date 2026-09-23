import { cx } from '../lib/classes';

/** Shared control styling for the booking widget's inputs and selects. */
export const inputClass =
  'h-10 w-full border-0 border-b border-transparent bg-transparent px-1 py-2 text-base ' +
  'font-semibold text-gb-ink transition-colors duration-300 ease-gb ' +
  'placeholder:font-medium placeholder:text-gb-muted-2 ' +
  'hover:border-gb-border focus:border-gb-primary focus:outline-none';

export const selectClass = cx(
  inputClass,
  'select-chevron cursor-pointer pr-7 invalid:font-medium invalid:text-gb-muted-2'
);

/**
 * The booking grid. Column dividers live here rather than on each field, so
 * they follow the 1 / 2 / 4 column reflow automatically.
 */
export const fieldGrid = cx(
  'grid gap-1 md:grid-cols-2 md:gap-x-6 md:gap-y-2 xl:grid-cols-4',
  '[&>div]:border-b [&>div]:border-gb-border [&>div]:pb-3',
  'md:[&>div]:border-b-0 md:[&>div]:pb-0',
  'md:[&>div:nth-child(odd)]:border-r-2 md:[&>div:nth-child(odd)]:pr-6',
  'xl:[&>div]:border-r-2 xl:[&>div]:pr-6',
  'xl:[&>div:last-child]:border-r-0 xl:[&>div:last-child]:pr-0'
);

/** A labelled booking-widget field: icon + label + control. */
export default function Field({ icon, label, required = true, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-base font-semibold tracking-[-0.4px] text-gb-ink lg:text-lg">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          width="20"
          height="20"
          className="size-5 object-contain"
        />
        <span>
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </span>
      </label>
      {children}
    </div>
  );
}
