'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ResponsiveVideo } from '@/components/ui/ResponsiveVideo';
import { storyVideo } from '@/data/videos';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * "Every tree has a story."
 *
 * A pinned full-screen video. The section is twice viewport height; the inner
 * panel is `sticky`, so the video holds still while the page scrolls past it,
 * then releases naturally at the end.
 *
 * Pinning is done with CSS `position: sticky` rather than by transforming the
 * page — the visitor keeps full control of the scroll the whole way through,
 * which rules out scroll-jacking by construction.
 */
export function ForestVideo() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 0.42, 0.72]);
  const textY = useTransform(scrollYProgress, [0, 1], ['14%', '-14%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="on-dark relative h-[210svh]"
      aria-labelledby="forest-video-heading"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { scale }}
        >
          <ResponsiveVideo video={storyVideo} background className="h-full w-full" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-ink"
          style={reduced ? { opacity: 0.55 } : { opacity: scrimOpacity }}
        />

        <motion.div
          className="relative flex h-full items-center justify-center px-gutter text-center"
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
        >
          <div>
            <motion.p
              className="eyebrow mb-8 text-gold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_CINEMATIC }}
            >
              The Long View
            </motion.p>
            <h2 id="forest-video-heading" className="text-display-lg text-bone">
              Every tree has a story.
            </h2>
            <p className="lede mx-auto mt-8 max-w-xl text-sand/80">
              Ours begins on prepared ground, in a season chosen carefully, and takes decades to
              finish telling.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
