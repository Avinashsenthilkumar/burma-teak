'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MediaImage } from '@/components/ui/MediaImage';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * The closing statement.
 *
 * Full-bleed plantation image, one line of display type, two routes onward.
 * The image drifts and settles as the section arrives, so the band reads as a
 * deliberate full stop rather than a banner bolted to the bottom of the page.
 */
export function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex min-h-[85svh] items-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <motion.div
        className="absolute -inset-y-[10%] inset-x-0 -z-10"
        style={reduced ? undefined : { scale, y }}
      >
        <MediaImage
          src="/media/plantation/plantation-cta.jpg"
          alt=""
          noZoom
          priority={false}
          sizes="100vw"
          wrapperClassName="absolute inset-0"
        />
      </motion.div>

      <div aria-hidden="true" className="scrim-full absolute inset-0 -z-10 grain" />

      <div className="shell py-section text-center">
        <motion.h2
          id="cta-heading"
          className="mx-auto max-w-4xl text-display-lg text-bone"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
        >
          Plant something that outlives you.
        </motion.h2>

        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_CINEMATIC, delay: 0.2 }}
        >
          <MagneticButton>
            <ButtonLink href="/contact" variant="gold" cursorLabel="Talk">
              Start A Conversation
            </ButtonLink>
          </MagneticButton>
          <MagneticButton>
            <ButtonLink href="/about" variant="ghost-light" cursorLabel="Read">
              Explore Our Story
            </ButtonLink>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
