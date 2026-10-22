'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { founder, founderStatement } from '@/data/founder';
import { isPlaceholder } from '@/config/company';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * "The person behind it" — the founder's own section.
 *
 * A portrait this size only works if it is doing a job, so it is paired with a
 * statement in his voice and sits on a dark band of its own. That makes the
 * appearance read as a deliberate editorial choice rather than a headshot
 * dropped into a gap.
 *
 * The name and role render only once they are filled in; until then the
 * photograph and the words carry it, and no bracketed placeholder is shown.
 */
export function FounderBand() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const hasName = !isPlaceholder(founder.name);
  const hasRole = !isPlaceholder(founder.role);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={ref} className="on-dark section" aria-labelledby="founder-heading">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <motion.div style={reduced ? undefined : { y }}>
            <MediaImage
              src={founder.portrait}
              alt={founder.portraitAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              wrapperClassName="aspect-[3/4] w-full"
            />
          </motion.div>
          {(hasName || hasRole) && (
            <Reveal preset="fade-up">
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4">
                {hasName && (
                  <p className="font-display text-2xl text-bone">{founder.name}</p>
                )}
                {hasRole && <p className="eyebrow text-gold">{founder.role}</p>}
              </div>
            </Reveal>
          )}
        </div>

        {/* Statement */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
              <span className="h-px w-12 bg-gold" aria-hidden="true" />
              {founderStatement.eyebrow}
            </p>
          </Reveal>

          <AnimatedText
            as="h2"
            id="founder-heading"
            lines={founderStatement.headline}
            className="text-display-md text-bone"
          />

          <Reveal preset="fade-up" delay={0.15}>
            <blockquote className="mt-9 border-l-2 border-gold/60 pl-6">
              <p className="font-display text-2xl italic leading-snug text-bone sm:text-3xl">
                &ldquo;{founderStatement.quote}&rdquo;
              </p>
            </blockquote>
            <p className="mt-7 max-w-measure leading-relaxed text-sand/75">
              {founderStatement.body}
            </p>
            <ButtonLink href="/about" variant="ghost-light" className="mt-10" cursorLabel="Read">
              Our Story
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
