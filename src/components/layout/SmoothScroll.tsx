'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Lenis smooth scrolling.
 *
 * Two deliberate choices:
 *
 *  1. Lenis is never constructed when the visitor prefers reduced motion. It
 *     is not merely disabled — the library's RAF loop never starts, so there
 *     is no idle cost and native scrolling is completely untouched.
 *
 *  2. `syncTouch` is left off. On touch devices the OS scroll physics are
 *     better than anything we would impose, and overriding them is the single
 *     most common way a "premium" site ends up feeling broken on a phone.
 *
 * There is no scroll-jacking anywhere on the site: Lenis eases the same scroll
 * the visitor initiated, it never takes the scroll position away from them.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.08,
      // Exponential ease-out — settles quickly without feeling slippery.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // App Router restores scroll itself, but Lenis keeps its own internal
  // position — without this a route change can leave the two disagreeing.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
