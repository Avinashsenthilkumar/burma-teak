'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MediaImage } from '@/components/ui/MediaImage';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * Inner-page hero.
 *
 * Every page opens dark and full-bleed, which is what lets the header start
 * transparent site-wide and keeps the transition between pages coherent.
 * Shorter than the homepage hero on purpose — these pages have work to do
 * below the fold.
 */
export function PageHero({
  eyebrow,
  lines,
  lede,
  image,
  imageAlt,
}: {
  eyebrow: string;
  lines: string[];
  lede?: string;
  image: string;
  imageAlt: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex min-h-[68svh] items-end overflow-hidden pb-16 pt-40 sm:min-h-[72svh] sm:pb-20"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { scale }}
      >
        <MediaImage
          src={image}
          alt={imageAlt}
          priority
          noZoom
          sizes="100vw"
          wrapperClassName="absolute inset-0"
        />
      </motion.div>

      <div aria-hidden="true" className="scrim-bottom absolute inset-0 -z-10 grain" />

      <motion.div className="shell" style={reduced ? undefined : { y, opacity }}>
        <motion.p
          className="eyebrow mb-8 flex items-center gap-4 text-gold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.35 }}
        >
          <span className="h-px w-12 bg-gold" aria-hidden="true" />
          {eyebrow}
        </motion.p>

        <h1 className="max-w-5xl text-display-lg text-bone">
          {lines.map((line, i) => (
            <span key={line} className="line-mask">
              <motion.span
                className="block"
                initial={{ y: reduced ? 0 : '112%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 1.15,
                  ease: EASE_CINEMATIC,
                  delay: reduced ? 0 : 0.45 + i * 0.12,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {lede && (
          <motion.p
            className="lede mt-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.75 }}
          >
            {lede}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
