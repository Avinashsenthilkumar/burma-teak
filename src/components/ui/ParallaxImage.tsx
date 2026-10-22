'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MediaImage } from './MediaImage';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How far the image drifts, in percent of its own height. */
  strength?: number;
  sizes?: string;
  priority?: boolean;
  /** Also lift a mask as the image enters. */
  reveal?: boolean;
};

/**
 * Image with scroll parallax.
 *
 * The inner image is oversized by `strength`% so the drift never exposes an
 * edge — a common failure in hand-rolled parallax. Drift is disabled entirely
 * under reduced-motion, where the image renders normally.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  strength = 12,
  sizes = '(max-width: 768px) 100vw, 55vw',
  priority = false,
  reveal = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // The inner layer is overscanned by a fixed 10% top and bottom, so drift is
  // capped at ±10% and an edge can never be exposed.
  const drift = Math.min(Math.max(strength, 0), 20) / 2;
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn('media-frame', className)}
      initial={reveal && !reduced ? { clipPath: 'inset(12% 0% 12% 0%)' } : undefined}
      whileInView={reveal && !reduced ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={cn('absolute inset-x-0', reduced ? 'inset-y-0' : '-inset-y-[10%]')}
        style={reduced ? undefined : { y }}
      >
        <MediaImage
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          noZoom
          wrapperClassName="absolute inset-0"
        />
      </motion.div>
    </motion.div>
  );
}
