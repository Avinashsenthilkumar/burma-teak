'use client';

import { useEffect, useRef, useState } from 'react';
import type { VideoItem } from '@/data/videos';
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks';
import { MediaImage } from './MediaImage';
import { cn } from '@/lib/cn';

type ResponsiveVideoProps = {
  video: VideoItem;
  className?: string;
  /** Background videos autoplay muted and loop; feature videos do not. */
  background?: boolean;
  controls?: boolean;
  /** Only the hero should set this. */
  priority?: boolean;
  objectPosition?: string;
};

/**
 * Video with an honest fallback.
 *
 * The poster image is rendered first and stays until the video has genuinely
 * started playing. If the .mp4 is absent — which is the normal state until the
 * client supplies footage — the poster simply remains and nothing visibly
 * fails. Phones get `mobileSrc` when one exists, and never the desktop encode.
 *
 * Under `prefers-reduced-motion` the video is not loaded at all: the poster is
 * the experience, which is both the accessible answer and the fast one.
 */
export function ResponsiveVideo({
  video,
  className,
  background = false,
  controls = false,
  priority = false,
  objectPosition,
}: ResponsiveVideoProps) {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Choose the encode once we know the viewport, so phones never fetch the
  // desktop file and then discard it. The two encodes can differ in shape as
  // well as in weight — the desktop loops are a landscape crop of a portrait
  // source — so the poster has to follow the same branch.
  const source = isDesktop ? video.src : (video.mobileSrc ?? video.src);
  const poster = isDesktop ? video.poster : (video.mobilePoster ?? video.poster);

  useEffect(() => {
    setPlaying(false);
    setFailed(false);
  }, [source]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !background || reduced || failed) return;
    // Autoplay can still be refused (low power mode, data saver). If it is,
    // we keep the poster rather than showing a stalled black rectangle.
    const attempt = el.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setFailed(true));
    }
  }, [background, reduced, failed, source]);

  const showVideo = !reduced && !failed;

  return (
    <div className={cn('media-frame grain', className)}>
      <MediaImage
        src={poster}
        alt={video.title}
        priority={priority}
        noZoom
        sizes="100vw"
        wrapperClassName={cn(
          'absolute inset-0 transition-opacity duration-1000 ease-cinematic',
          playing && 'opacity-0',
        )}
        className={objectPosition}
      />

      {showVideo && (
        <video
          ref={ref}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-cinematic',
            playing ? 'opacity-100' : 'opacity-0',
            objectPosition,
          )}
          poster={poster}
          playsInline
          muted={background}
          loop={background}
          controls={controls}
          preload={priority ? 'auto' : 'metadata'}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
          onStalled={() => setFailed(true)}
          aria-label={video.title}
        >
          <source src={source} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
