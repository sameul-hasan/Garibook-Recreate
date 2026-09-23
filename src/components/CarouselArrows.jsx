import { ArrowLeft, ArrowRight } from './icons';

const ARROW =
  'grid size-13 place-items-center rounded-full border border-gb-border bg-white text-gb-ink ' +
  'transition duration-400 ease-gb enabled:hover:scale-105 enabled:hover:bg-gb-ink ' +
  'enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40 lg:size-16';

export default function CarouselArrows({ onPrev, onNext, atStart, atEnd, className = '' }) {
  return (
    <div className={`inline-flex gap-3 ${className}`}>
      <button type="button" className={ARROW} onClick={onPrev} disabled={atStart} aria-label="Previous">
        <ArrowLeft className="size-5.5" />
      </button>
      <button type="button" className={ARROW} onClick={onNext} disabled={atEnd} aria-label="Next">
        <ArrowRight className="size-5.5" />
      </button>
    </div>
  );
}
