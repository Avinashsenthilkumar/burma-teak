'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ResponsiveVideo } from '@/components/ui/ResponsiveVideo';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { LeafParticles } from '@/components/layout/LeafParticles';
import { heroVideo } from '@/data/videos';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * The hero.
 *
 * The opening sequence is choreographed rather than faded: the scrim lifts,
 * then the label, then the headline line by line from behind its mask, then
 * the supporting line, then the buttons. Each step overlaps the one before it
 * so it reads as one continuous movement instead of five separate ones.
 *
 * On scroll the whole thing drifts upward at half speed and dims, so the
 * section below appears to slide over it.
 */

const HEADLINE = ['Rooted in nature.', 'Built for generations.'];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Everything after the preloader's curtain has cleared.
  const base = 0.35;
  const step = (n: number) => ({
    duration: 1,
    ease: EASE_CINEMATIC,
    delay: reduced ? 0 : base + n * 0.14,
  });

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex h-[100svh] min-h-[600px] flex-col justify-end overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background media */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { scale: mediaScale }}
      >
        <ResponsiveVideo
          video={heroVideo}
          background
          priority
          className="h-full w-full"
          objectPosition="object-center"
        />
      </motion.div>

      {/* Readability scrim — fades in rather than being there from frame one */}
      <motion.div
        aria-hidden="true"
        className="scrim-bottom absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
      />

      <LeafParticles className="-z-10" />

      {/* Content */}
      <motion.div
        className="shell pb-24 pt-40 sm:pb-28 lg:pb-32"
        style={reduced ? undefined : { y, opacity }}
      >
        <div className="max-w-5xl">
          <motion.p
            className="eyebrow mb-8 flex items-center gap-4 text-gold"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={step(0)}
          >
            <span className="h-px w-12 bg-gold" aria-hidden="true" />
            Burma Teak Plantation
          </motion.p>

          <h1 className="text-display-xl text-bone">
            {HEADLINE.map((line, i) => (
              <span key={line} className="line-mask">
                <motion.span
                  className="block"
                  initial={{ y: reduced ? 0 : '112%', opacity: reduced ? 0 : 1 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 1.25,
                    ease: EASE_CINEMATIC,
                    delay: reduced ? 0 : base + 0.18 + i * 0.13,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="lede mt-9 max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={step(4)}
          >
            Premium teak cultivation rooted in quality, sustainability and long-term value —
            grown at Gandarvakottai with the care of a nursery established in 1980.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={step(5)}
          >
            <MagneticButton>
              <ButtonLink href="/plantation" variant="gold" cursorLabel="Explore">
                Explore Our Plantation
              </ButtonLink>
            </MagneticButton>
            <MagneticButton>
              <ButtonLink href="/contact" variant="ghost-light" cursorLabel="Talk">
                Get In Touch
              </ButtonLink>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator className="absolute bottom-10 right-gutter hidden lg:flex" />
    </section>
  );
}
