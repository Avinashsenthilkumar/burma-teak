'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { plantationStages } from '@/data/plantation';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * "From Soil to Canopy".
 *
 * Desktop gets horizontal storytelling: a tall section with a sticky viewport
 * inside it, and the stage track translated along X as the page scrolls down.
 * Mobile gets genuine vertical storytelling — not the same thing shrunk.
 *
 * The desktop track is rendered only above `lg`, so phones never evaluate the
 * scroll transforms at all.
 */
export function PlantationJourney() {
  const isDesktop = useIsDesktop();

  return (
    <section className="bg-bone" aria-labelledby="journey-heading">
      <div className="shell pt-section">
        <div className="max-w-3xl">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
              <span className="h-px w-12 bg-teak" aria-hidden="true" />
              The Lifecycle
            </p>
          </Reveal>
          <AnimatedText
            as="h2"
            lines={['From soil', 'to canopy.']}
            className="text-display-lg text-forest-deep"
          />
          <Reveal preset="fade-up" delay={0.15}>
            <p className="lede mt-8 max-w-measure">
              Six stages, spread across a working lifetime. Every one of them is a decision that
              the next stage inherits.
            </p>
          </Reveal>
        </div>
      </div>

      {isDesktop ? <HorizontalTrack /> : <VerticalStack />}
    </section>
  );
}

function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // The distance to travel is measured rather than guessed. A percentage
  // would depend on card width, gap and viewport all at once, and would
  // under- or overshoot at most window sizes.
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      const overflow = track.scrollWidth - viewport.clientWidth;
      setDistance(Math.max(overflow, 0));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // The leading 6% of scroll is dead space so the first card settles before
  // anything starts moving, and the trailing 4% lets the last one rest.
  const x = useTransform(scrollYProgress, [0.06, 0.96], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0.06, 0.96], [0, 1]);

  if (reduced) return <VerticalStack />;

  return (
    <div ref={ref} className="relative mt-24 h-[420svh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"
      >
        <motion.ol ref={trackRef} className="flex w-max gap-8 px-gutter will-change-transform" style={{ x }}>
          {plantationStages.map((stage) => (
            <li key={stage.index} className="w-[clamp(22rem,34vw,30rem)] shrink-0">
              <article className="group">
                <MediaImage
                  src={stage.image}
                  alt={stage.imageAlt}
                  sizes="34vw"
                  wrapperClassName="aspect-[4/5] w-full"
                />
                <div className="mt-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl leading-none text-teak">
                      {stage.index}
                    </span>
                    <span className="h-px flex-1 bg-forest/15" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-forest-deep">{stage.title}</h3>
                  <p className="mt-3 font-display text-lg italic text-teak-dark">
                    {stage.summary}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-forest-mid/75">
                    {stage.detail}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </motion.ol>

        {/* Track progress */}
        <div className="shell mt-14">
          <div className="h-px w-full bg-forest/12">
            <motion.div
              className="h-full origin-left bg-teak"
              style={{ scaleX: progress }}
            />
          </div>
          <p className="eyebrow mt-4 text-forest-mid/50">Scroll to follow the lifecycle</p>
        </div>
      </div>
    </div>
  );
}

function VerticalStack() {
  return (
    <Reveal
      preset="fade-up"
      staggerChildren={0.1}
      as="div"
      className="shell mt-16 space-y-16 pb-section"
    >
      <ol className="space-y-16">
        {plantationStages.map((stage) => (
          <RevealItem as="li" key={stage.index}>
            <article>
              <MediaImage
                src={stage.image}
                alt={stage.imageAlt}
                sizes="(max-width: 768px) 100vw, 60vw"
                wrapperClassName="aspect-[3/2] w-full"
              />
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-4xl leading-none text-teak">
                  {stage.index}
                </span>
                <span className="h-px flex-1 bg-forest/15" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-3xl text-forest-deep">{stage.title}</h3>
              <p className="mt-2 font-display text-lg italic text-teak-dark">{stage.summary}</p>
              <p className="mt-4 leading-relaxed text-forest-mid/75">{stage.detail}</p>
            </article>
          </RevealItem>
        ))}
      </ol>
    </Reveal>
  );
}
