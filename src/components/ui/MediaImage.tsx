'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/cn';

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Wrapper classes — put aspect ratio and rounding here. */
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Intrinsic sizing instead of `fill`. Supply both or neither. */
  width?: number;
  height?: number;
  quality?: number;
  /** Disables the zoom-on-hover affordance. */
  noZoom?: boolean;
};

/**
 * The only image component used on the site.
 *
 * Three states, and none of them ever shows a broken image:
 *   loading — the neutral forest placeholder, gently shimmering
 *   ready   — the photograph fades in over the placeholder
 *   missing — the placeholder simply stays, with a quiet leaf mark
 *
 * The missing state is deliberately indistinguishable from an intentional
 * empty frame. Nothing says "image not found" in the production UI.
 */
export function MediaImage({
  src,
  alt,
  className,
  wrapperClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw',
  priority = false,
  width,
  height,
  quality = 82,
  noZoom = false,
}: MediaImageProps) {
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');
  const intrinsic = typeof width === 'number' && typeof height === 'number';

  return (
    <div
      className={cn('media-frame', !noZoom && 'media-zoom', wrapperClassName)}
      data-state={state}
    >
      {/* Always present beneath the photograph. */}
      <div
        aria-hidden="true"
        className={cn(
          'media-placeholder transition-opacity duration-700 ease-cinematic',
          state === 'loading' && 'media-placeholder-shimmer',
          state === 'ready' && 'opacity-0',
        )}
      >
        {state === 'missing' && <PlaceholderMark />}
      </div>

      {state !== 'missing' && (
        <Image
          src={src}
          alt={alt}
          fill={!intrinsic}
          width={intrinsic ? width : undefined}
          height={intrinsic ? height : undefined}
          sizes={intrinsic ? undefined : sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          onLoad={() => setState('ready')}
          onError={() => setState('missing')}
          className={cn(
            'object-cover transition-opacity duration-[900ms] ease-cinematic',
            intrinsic ? 'h-full w-full' : '',
            state === 'ready' ? 'opacity-100' : 'opacity-0',
            className,
          )}
        />
      )}
    </div>
  );
}

/** A small teak leaf, centred — reads as composition, not as an error. */
function PlaceholderMark() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 text-sand/18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path
          d="M24 43V17M24 17c0-7 5-12 12-13 1 8-3 14-12 13Zm0 7c0-6-4-10-10-11-1 7 3 12 10 11Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
