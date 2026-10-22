'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { sustainabilityPillars } from '@/data/sustainability';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { iconMap } from '@/lib/icons';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * "Growing with nature."
 *
 * The backdrop crossfades from a young planting into a closed canopy as the
 * visitor scrolls, so the section argues its point visually before the copy
 * gets a chance to: the same ground, decades apart.
 */
export function Sustainability() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const youngOpacity = useTransform(scrollYProgress, [0.1, 0.55], [1, 0]);
  const matureOpacity = useTransform(scrollYProgress, [0.2, 0.65], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section ref={ref} className="on-dark relative isolate" aria-labelledby="sustain-heading">
      {/* Earth → canopy backdrop */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-0" style={reduced ? undefined : { scale: bgScale }}>
          <motion.div
            className="absolute inset-0"
            style={reduced ? { opacity: 0 } : { opacity: youngOpacity }}
          >
            <MediaImage
              src="/media/sustainability/sustainability-young.jpg"
              alt=""
              noZoom
              sizes="100vw"
              wrapperClassName="absolute inset-0"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            style={reduced ? { opacity: 1 } : { opacity: matureOpacity }}
          >
            <MediaImage
              src="/media/sustainability/sustainability-mature.jpg"
              alt=""
              noZoom
              sizes="100vw"
              wrapperClassName="absolute inset-0"
            />
          </motion.div>
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/72" />
      </div>

      <div className="shell py-section">
        <div className="max-w-3xl">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
              <span className="h-px w-12 bg-gold" aria-hidden="true" />
              Sustainability
            </p>
          </Reveal>
          <AnimatedText
            as="h2"
            lines={['Growing', 'with nature.']}
            className="text-display-lg text-bone"
          />
          <Reveal preset="fade-up" delay={0.15}>
            <p className="lede mt-8 max-w-measure">
              Over a teak horizon, soil and water are not sustainability talking points. They are
              the asset. Degrade them and the plantation quietly stops working, whatever the
              planting plan said.
            </p>
          </Reveal>
        </div>

        <Reveal
          preset="fade-up"
          staggerChildren={0.08}
          className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sustainabilityPillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <RevealItem key={pillar.title}>
                <div className="border-t border-bone/15 pt-7">
                  <Icon className="h-6 w-6 text-gold" aria-hidden="true" strokeWidth={1.25} />
                  <h3 className="mt-5 font-display text-2xl text-bone">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/75">{pillar.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>

        <Reveal preset="fade-up" className="mt-16">
          <ButtonLink href="/sustainability" variant="ghost-light" cursorLabel="Read">
            How We Work The Land
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
