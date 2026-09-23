import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Minimal scroll-snap carousel controller.
 * Returns a ref for the scrolling track plus prev/next handlers and the
 * disabled state for each arrow.
 */
export function useCarousel() {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({
      atStart: track.scrollLeft <= 2,
      atEnd: track.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    sync();
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      track.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  /** Scrolls by one slide, measured from the first child. */
  const scrollBy = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.firstElementChild;
    const step = slide ? slide.getBoundingClientRect().width + 24 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, []);

  return {
    trackRef,
    prev: () => scrollBy(-1),
    next: () => scrollBy(1),
    ...edges,
  };
}
