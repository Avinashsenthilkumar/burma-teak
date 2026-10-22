'use client';

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { growthPhases } from '@/data/plantation';
import { MediaImage } from '@/components/ui/MediaImage';
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * Seedling → mature teak, scrubbed by scroll.
 *
 * The four phases cross-fade as the visitor scrolls through a pinned panel,
 * with a growing vertical stem drawn alongside. The panel also responds to
 * pointer position — the canopy and the light layer drift a few pixels, which
 * gives the composition depth without any 3D.
 *
 * All of the pointer work is skipped on touch devices and under
 * reduced-motion, where this becomes four stacked images.
 */
export function GrowthStory() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const finePointer = useHasFinePointer();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Pointer drift
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 90, damping: 24, mass: 0.7 };
  const driftX = useSpring(px, spring);
  const driftY = useSpring(py, spring);
  const lightX = useTransform(driftX, (v) => v * -1.8);
  const lightY = useTransform(driftY, (v) => v * -1.8);

  const onPointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!finePointer || reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width - 0.5) * 22);
    py.set(((event.clientY - rect.top) / rect.height - 0.5) * 16);
  };

  const stemScale = useTransform(scrollYProgress, [0.08, 0.92], [0.06, 1]);

  if (reduced) return <StaticGrowth />;

  return (
    <section
      ref={ref}
      className="on-dark relative h-[380svh]"
      aria-labelledby="growth-heading"
      onMouseMove={onPointerMove}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Phase images */}
        {growthPhases.map((phase, i) => (
          <PhaseLayer
            key={phase.label}
            index={i}
            total={growthPhases.length}
            progress={scrollYProgress}
            driftX={driftX}
            driftY={driftY}
            phase={phase}
          />
        ))}

        {/* Light bloom that answers the pointer */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(201,162,39,0.16),transparent_70%)]"
          style={{ x: lightX, y: lightY }}
        />

        <div aria-hidden="true" className="absolute inset-0 bg-ink/55" />

        {/* Copy + stem */}
        <div className="shell relative flex h-full items-center">
          <div className="flex w-full items-stretch gap-10">
            {/* Growing stem */}
            <div className="hidden w-px shrink-0 bg-bone/12 sm:block">
              <motion.div
                className="h-full w-full origin-bottom bg-gold"
                style={{ scaleY: stemScale }}
              />
            </div>

            <div className="max-w-2xl">
              <p className="eyebrow mb-8 text-gold">Growth</p>
              <h2 id="growth-heading" className="text-display-md text-bone">
                Seedling to standing timber.
              </h2>

              <ol className="mt-12 space-y-7">
                {growthPhases.map((phase, i) => (
                  <PhaseLabel
                    key={phase.label}
                    index={i}
                    total={growthPhases.length}
                    progress={scrollYProgress}
                    phase={phase}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseLayer({
  phase,
  index,
  total,
  progress,
  driftX,
  driftY,
}: {
  phase: (typeof growthPhases)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  driftX: MotionValue<number>;
  driftY: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  // Overlap the fades slightly so there is never a bare frame between phases.
  const opacity = useTransform(
    progress,
    [start - span * 0.35, start + span * 0.18, end - span * 0.18, end + span * 0.35],
    index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, end], [1.1, 1.0]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute -inset-6" style={{ x: driftX, y: driftY, scale }}>
        <MediaImage
          src={phase.image}
          alt={phase.imageAlt}
          sizes="100vw"
          noZoom
          wrapperClassName="absolute inset-0"
        />
      </motion.div>
    </motion.div>
  );
}

function PhaseLabel({
  phase,
  index,
  total,
  progress,
}: {
  phase: (typeof growthPhases)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const opacity = useTransform(
    progress,
    [start - span * 0.4, start + span * 0.2, end - span * 0.2, end + span * 0.4],
    [0.28, 1, 1, 0.28],
  );
  const x = useTransform(progress, [start - span * 0.4, start + span * 0.2], [-14, 0]);

  return (
    <motion.li style={{ opacity, x }} className="flex items-baseline gap-5">
      <span className="w-16 shrink-0 font-sans text-[0.6875rem] uppercase tracking-eyebrow text-gold">
        {phase.age}
      </span>
      <span>
        <span className="block font-display text-2xl text-bone sm:text-3xl">{phase.label}</span>
        <span className="mt-1 block text-sm text-sand/70">{phase.caption}</span>
      </span>
    </motion.li>
  );
}

/** Reduced-motion fallback: the same story, told as a plain stack. */
function StaticGrowth() {
  return (
    <section className="on-dark section" aria-labelledby="growth-heading">
      <div className="shell">
        <p className="eyebrow mb-8 text-gold">Growth</p>
        <h2 id="growth-heading" className="text-display-md text-bone">
          Seedling to standing timber.
        </h2>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2">
          {growthPhases.map((phase) => (
            <li key={phase.label}>
              <MediaImage
                src={phase.image}
                alt={phase.imageAlt}
                sizes="(max-width: 640px) 100vw, 45vw"
                wrapperClassName="aspect-[4/3] w-full"
              />
              <p className="eyebrow mt-5 text-gold">{phase.age}</p>
              <h3 className={cn('mt-2 font-display text-2xl text-bone')}>{phase.label}</h3>
              <p className="mt-2 text-sm text-sand/70">{phase.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
