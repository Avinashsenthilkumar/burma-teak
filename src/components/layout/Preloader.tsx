'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';
import { Wordmark } from './Wordmark';

const SESSION_KEY = 'btp:intro-seen';
const MIN_DURATION = 1250;

/**
 * First-visit loading screen.
 *
 * Shown once per session, never again on navigation — a loader that reappears
 * is the fastest way to make a premium site feel like an obstacle. It is also
 * skipped entirely under reduced-motion, and it self-dismisses on a timer as
 * well as on `load`, so a stalled asset can never trap the visitor behind it.
 */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Private browsing can throw on sessionStorage — treat as unseen.
    }
    if (seen) return;

    setActive(true);
    document.body.classList.add('overflow-hidden');

    const started = Date.now();
    let raf = 0;

    const tick = () => {
      const elapsed = Date.now() - started;
      // Ease toward 100 rather than ticking linearly — reads as real work.
      const ratio = Math.min(elapsed / MIN_DURATION, 1);
      setProgress(Math.round((1 - Math.pow(1 - ratio, 3)) * 100));
      if (ratio < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setActive(false);
      document.body.classList.remove('overflow-hidden');
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
    };

    // Whichever comes last: the minimum beat, or the window load event.
    // A hard ceiling guarantees we never hold the page hostage.
    const minTimer = window.setTimeout(() => {
      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', finish, { once: true });
    }, MIN_DURATION);
    const ceiling = window.setTimeout(finish, 3200);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(minTimer);
      window.clearTimeout(ceiling);
      window.removeEventListener('load', finish);
      document.body.classList.remove('overflow-hidden');
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-forest-deep"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            className="flex flex-col items-center gap-10"
          >
            <LeafDraw />
            <Wordmark variant="light" className="text-xl text-bone sm:text-2xl" />
          </motion.div>

          <div className="absolute bottom-12 left-0 right-0 px-gutter">
            <div className="mx-auto flex max-w-shell items-end justify-between">
              <span className="eyebrow text-sand/50">Burma Teak Plant</span>
              <span className="font-display text-3xl tabular-nums text-bone/80">
                {progress.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="mx-auto mt-4 h-px w-full max-w-shell overflow-hidden bg-bone/15">
              <motion.div
                className="h-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A teak leaf drawn by stroke, then quietly filled. */
function LeafDraw() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-20 w-20 text-gold"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M60 108V44M60 44c0-19 13-32 32-34 3 21-9 36-32 34Zm0 18c0-16-11-27-27-29-2 18 8 31 27 29Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE_CINEMATIC }}
      />
    </svg>
  );
}
