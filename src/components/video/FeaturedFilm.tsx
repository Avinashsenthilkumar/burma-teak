'use client';

import { useState } from 'react';
import type { VideoItem } from '@/data/videos';
import { MediaImage } from '@/components/ui/MediaImage';
import { ReelPlayer } from './ReelPlayer';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { Play } from '@/lib/icons';
import { cn } from '@/lib/cn';

/**
 * One film, shown large, embedded in the page it belongs to.
 *
 * The grid treatment is right for browsing a set; it is wrong for a single
 * film that illustrates the section around it. Here the portrait frame runs
 * to roughly two-thirds of viewport height on desktop, which is as large as a
 * 9:16 frame can go before it stops fitting on screen beside its own copy.
 *
 * Still no video is fetched until the viewer opens it — the poster carries
 * the section, exactly as in the grid.
 */
export function FeaturedFilm({
  film,
  eyebrow,
  headline,
  body,
  reverse = false,
  tone = 'light',
}: {
  film: VideoItem;
  eyebrow: string;
  headline: string[];
  body?: string;
  /** Put the film on the right instead of the left. */
  reverse?: boolean;
  tone?: 'light' | 'dark';
}) {
  const [open, setOpen] = useState<number | null>(null);
  const dark = tone === 'dark';

  return (
    <section
      className={cn('section', dark ? 'on-dark' : 'bg-bone')}
      aria-label={`Film: ${film.title}`}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* The film */}
        <div className={cn('lg:col-span-5', reverse && 'lg:order-2 lg:col-start-8')}>
          <button
            type="button"
            onClick={() => setOpen(0)}
            data-cursor="Play"
            aria-label={`Play film: ${film.title}`}
            className="group block w-full text-left"
          >
            <div className="media-frame media-zoom mx-auto aspect-[9/16] w-full max-w-sm lg:h-[72vh] lg:max-w-none lg:w-auto">
              <MediaImage
                src={film.poster}
                alt={film.title}
                noZoom
                sizes="(max-width: 1024px) 100vw, 40vw"
                wrapperClassName="absolute inset-0"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/15 transition-opacity duration-700 group-hover:opacity-75"
              />
              <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                <span className="grid h-20 w-20 place-items-center rounded-full border border-bone/60 bg-ink/30 text-bone backdrop-blur-sm transition-all duration-500 ease-cinematic group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-forest-deep">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </span>
              {film.duration && (
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 rounded-full bg-ink/65 px-3 py-1.5 font-sans text-xs tabular-nums text-bone/90 backdrop-blur-sm"
                >
                  {film.duration}
                </span>
              )}
            </div>
          </button>
        </div>

        {/* The copy */}
        <div className={cn('lg:col-span-6', reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7')}>
          <Reveal preset="fade-in">
            <p
              className={cn(
                'eyebrow mb-9 flex items-center gap-4',
                dark ? 'text-gold' : 'text-teak',
              )}
            >
              <span
                className={cn('h-px w-12', dark ? 'bg-gold' : 'bg-teak')}
                aria-hidden="true"
              />
              {eyebrow}
            </p>
          </Reveal>

          <AnimatedText
            as="h2"
            lines={headline}
            className={cn('text-display-md', dark ? 'text-bone' : 'text-forest-deep')}
          />

          <Reveal preset="fade-up" delay={0.15}>
            <p className="lede mt-8 max-w-measure">{body ?? film.description}</p>
            <p
              className={cn(
                'mt-6 font-sans text-xs uppercase tracking-eyebrow',
                dark ? 'text-sand/50' : 'text-forest-mid/50',
              )}
            >
              {film.duration} · Narrated in {film.language ?? 'Tamil'}
            </p>
          </Reveal>
        </div>
      </div>

      <ReelPlayer
        films={[film]}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
