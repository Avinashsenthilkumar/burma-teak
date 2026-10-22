'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { VideoItem } from '@/data/videos';
import { useEscape, useScrollLock, useSwipe, usePrefersReducedMotion } from '@/lib/hooks';
import { ChevronLeft, ChevronRight, X } from '@/lib/icons';
import { EASE_CINEMATIC } from '@/lib/motion';

type ReelPlayerProps = {
  films: VideoItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/**
 * Full-screen player for the 9:16 films.
 *
 * The video is sized by `aspect-ratio: 9/16` and capped by available height,
 * so it is shown whole at its real proportions — letterboxed against the
 * backdrop rather than cropped. Cropping a vertical film to fit a landscape
 * window would cut the burned-in captions in half.
 *
 * These films carry narration, so playback starts unmuted with native
 * controls. Autoplay-with-sound is refused by every browser, so the video is
 * loaded paused and the viewer's click on the play control starts it — which
 * is also the correct behaviour: nothing on this site makes noise unasked.
 *
 * Keyboard: left/right to move between films, Esc to close, Tab trapped
 * inside. Touch: horizontal swipe.
 */
export function ReelPlayer({ films, index, onClose, onIndexChange }: ReelPlayerProps) {
  const open = index !== null;
  const reduced = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [failed, setFailed] = useState(false);

  useScrollLock(open);
  useEscape(onClose, open);

  const go = useCallback(
    (delta: number) => {
      if (index === null || films.length === 0) return;
      onIndexChange((index + delta + films.length) % films.length);
    },
    [index, films.length, onIndexChange],
  );

  const swipe = useSwipe(
    () => go(1),
    () => go(-1),
  );

  const film = index === null ? null : films[index];

  // A new film means a fresh element state.
  useEffect(() => {
    setFailed(false);
  }, [film?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Let the video element have the space bar for play/pause.
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      const id = window.setTimeout(() => dialogRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
    opener.current?.focus?.();
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), video, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && film && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${film.title} — film ${index + 1} of ${films.length}`}
          className="fixed inset-0 z-[160] flex flex-col bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
          {...swipe}
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-gutter py-5">
            <p className="font-sans text-sm tabular-nums tracking-wider2 text-sand/70">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-2 text-sand/30">/</span>
              {String(films.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close film"
              className="grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-forest-deep"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            {films.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}

            <motion.div
              key={film.id}
              className="relative h-full max-h-full w-auto"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
            >
              {/* The 9:16 frame. Height-led so the whole film is always visible. */}
              <div className="relative mx-auto h-full max-h-full overflow-hidden rounded-sm bg-forest-deep aspect-[9/16]">
                {failed ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={film.poster}
                      alt={film.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-ink/70 p-8 text-center">
                      <p className="max-w-xs text-sm leading-relaxed text-sand/80">
                        This film could not be loaded. The poster frame is shown instead.
                      </p>
                    </div>
                  </>
                ) : (
                  <video
                    ref={videoRef}
                    key={film.id}
                    className="absolute inset-0 h-full w-full object-contain"
                    poster={film.poster}
                    controls
                    playsInline
                    preload="metadata"
                    onError={() => setFailed(true)}
                    aria-label={film.title}
                  >
                    <source src={film.src} type="video/mp4" />
                    Your browser cannot play this film.
                  </video>
                )}
              </div>
            </motion.div>
          </div>

          {/* Caption */}
          <div className="shrink-0 px-gutter py-5 text-center">
            <h2 className="font-display text-xl text-bone sm:text-2xl">{film.title}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-sand/70">
              {film.description}
            </p>
            {film.language && (
              <p className="mt-2 text-xs uppercase tracking-eyebrow text-sand/40">
                Narrated in {film.language}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous film' : 'Next film'}
      className={`absolute top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-forest-deep sm:grid ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
