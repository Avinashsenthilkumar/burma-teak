'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { VideoItem } from '@/data/videos';
import { MediaImage } from '@/components/ui/MediaImage';
import { ReelPlayer } from './ReelPlayer';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';
import { Play } from '@/lib/icons';
import { cn } from '@/lib/cn';

/**
 * The films, shown as what they are: portrait reels.
 *
 * Each card is a 9:16 frame holding the real poster frame pulled from the
 * footage. No video is fetched until the viewer opens one — seven films at
 * 5-22MB each would otherwise be a catastrophic page weight, and `preload`
 * is never set on the thumbnails for the same reason.
 *
 * The grid is capped at three across even on wide screens: portrait cards get
 * very tall very quickly, and four across leaves a row that scrolls past the
 * bottom of most laptops.
 */
export function ReelsGallery({
  films,
  columns = 3,
  className,
}: {
  films: VideoItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  // A 9:16 tile gets tall fast. At two columns on a 1440px viewport each tile
  // would be ~700px wide and so ~1240px tall — taller than the screen. So on
  // desktop the frame is height-led (`h-[Nvh] w-auto`) and the aspect ratio
  // sets its width; below `lg` it stays width-led and fills its column.
  const gridCols =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
        : 'grid-cols-2 lg:grid-cols-3';

  const frameSize =
    columns === 2
      ? 'aspect-[9/16] w-full lg:mx-auto lg:h-[76vh] lg:w-auto'
      : columns === 3
        ? 'aspect-[9/16] w-full lg:mx-auto lg:h-[62vh] lg:w-auto'
        : 'aspect-[9/16] w-full';

  return (
    <div className={cn(className)}>
      <ul className={cn('grid gap-x-5 gap-y-10 sm:gap-x-6', gridCols)}>
        {films.map((film, i) => (
          <motion.li
            key={film.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{
              duration: 0.8,
              ease: EASE_CINEMATIC,
              delay: reduced ? 0 : (i % 3) * 0.08,
            }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              data-cursor="Play"
              className="group block w-full text-left"
              aria-label={`Play film: ${film.title}`}
            >
              {/* The portrait frame */}
              <div className={cn('media-frame media-zoom', frameSize)}>
                <MediaImage
                  src={film.poster}
                  alt={film.title}
                  noZoom
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 32vw"
                  wrapperClassName="absolute inset-0"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/15 transition-opacity duration-700 group-hover:opacity-80"
                />

                {/* Play affordance */}
                <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-bone/60 bg-ink/30 text-bone backdrop-blur-sm transition-all duration-500 ease-cinematic group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-forest-deep sm:h-16 sm:w-16">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </span>

                {/* Duration chip */}
                {film.duration && (
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 rounded-full bg-ink/65 px-2.5 py-1 font-sans text-[0.6875rem] tabular-nums text-bone/90 backdrop-blur-sm"
                  >
                    {film.duration}
                  </span>
                )}

                {/* Title over the foot of the frame */}
                <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="block font-display text-lg leading-tight text-bone sm:text-xl">
                    {film.title}
                  </span>
                  {film.language && (
                    <span className="mt-1.5 block font-sans text-[0.625rem] uppercase tracking-eyebrow text-sand/60">
                      {film.language}
                    </span>
                  )}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-forest-mid/70">
                {film.description}
              </p>
            </button>
          </motion.li>
        ))}
      </ul>

      <ReelPlayer
        films={films}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </div>
  );
}
