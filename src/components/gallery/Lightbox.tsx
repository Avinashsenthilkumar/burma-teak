'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { GalleryImage } from '@/data/gallery';
import { useEscape, useScrollLock, useSwipe, usePrefersReducedMotion } from '@/lib/hooks';
import { ChevronLeft, ChevronRight, X } from '@/lib/icons';
import { EASE_CINEMATIC } from '@/lib/motion';

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/**
 * Full-screen image viewer.
 *
 * Keyboard: ← → to move, Esc to close, Tab cycles inside the dialog only.
 * Touch: horizontal swipe. Focus is moved into the dialog on open and returned
 * to the thumbnail that opened it on close, which is the part most hand-built
 * lightboxes miss.
 */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const reduced = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [direction, setDirection] = useState(1);

  useScrollLock(open);
  useEscape(onClose, open);

  const go = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      setDirection(delta);
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  const swipe = useSwipe(
    () => go(1),
    () => go(-1),
  );

  // Arrow keys
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  // Focus management
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      // Wait for the dialog to mount before moving focus into it.
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
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
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

  const image = index === null ? null : images[index];

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${images.length}: ${image.alt}`}
          className="fixed inset-0 z-[160] flex flex-col bg-ink/97 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
          {...swipe}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-gutter py-6">
            <p className="font-sans text-sm tabular-nums tracking-wider2 text-sand/70">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-2 text-sand/30">/</span>
              {String(images.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="grid h-12 w-12 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-forest-deep"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={image.id}
                className="relative h-full w-full"
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  priority
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>

          {/* Caption */}
          <div className="px-gutter py-7 text-center">
            <p className="font-display text-xl text-bone">{image.caption ?? image.alt}</p>
            <p className="mt-1 text-xs uppercase tracking-eyebrow text-sand/40 sm:hidden">
              Swipe to browse
            </p>
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
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-forest-deep sm:grid ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
