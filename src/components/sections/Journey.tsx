'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { journeyMilestones } from '@/data/journey';
import { isPlaceholder } from '@/config/company';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * "Our Journey" — vertical timeline with a line that draws itself.
 *
 * The spine is a single element scaled on Y against scroll progress, which is
 * cheaper and smoother than animating an SVG path length over a section this
 * tall.
 *
 * Any milestone whose year is still a placeholder shows a quiet marker instead
 * of a date. Unconfirmed body copy is suppressed the same way.
 */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 55%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="section bg-paper" aria-labelledby="journey-heading">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
              <span className="h-px w-12 bg-teak" aria-hidden="true" />
              Our Journey
            </p>
          </Reveal>
          <AnimatedText
            as="h2"
            lines={['Four decades', 'of planting.']}
            className="text-display-lg text-forest-deep"
          />
        </div>

        <div ref={ref} className="relative mt-20 pl-10 sm:pl-16">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[3px] top-2 w-px bg-forest/10 sm:left-[7px]"
          >
            <motion.div
              className="h-full w-full origin-top bg-teak"
              style={reduced ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="space-y-20 sm:space-y-28">
            {journeyMilestones.map((milestone, i) => (
              <Milestone key={milestone.title} milestone={milestone} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Milestone({
  milestone,
  index,
}: {
  milestone: (typeof journeyMilestones)[number];
  index: number;
}) {
  const yearPending = isPlaceholder(milestone.year);
  const bodyPending = isPlaceholder(milestone.body);

  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
    >
      {/* Node */}
      <span
        aria-hidden="true"
        className="absolute -left-10 top-2 grid h-[9px] w-[9px] place-items-center rounded-full bg-teak sm:-left-16 sm:h-[15px] sm:w-[15px] sm:ring-4 sm:ring-paper"
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {yearPending ? (
            <p className="font-sans text-xs uppercase tracking-eyebrow text-forest-mid/35">
              Stage {String(index + 1).padStart(2, '0')}
            </p>
          ) : (
            <p className="font-display text-4xl leading-none text-teak">{milestone.year}</p>
          )}

          <h3 className="mt-4 font-display text-3xl text-forest-deep sm:text-4xl">
            {milestone.title}
          </h3>

          {!bodyPending && (
            <p className="mt-4 max-w-measure leading-relaxed text-forest-mid/75">
              {milestone.body}
            </p>
          )}
        </div>

        <div className="lg:col-span-5">
          <MediaImage
            src={milestone.image}
            alt={milestone.imageAlt}
            sizes="(max-width: 1024px) 100vw, 40vw"
            wrapperClassName="aspect-[3/2] w-full"
          />
        </div>
      </div>
    </motion.li>
  );
}
