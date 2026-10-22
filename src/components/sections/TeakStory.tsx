'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { teakTraits } from '@/data/teak';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { EASE_CINEMATIC } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * "Why Burma Teak?"
 *
 * An editorial two-column piece rather than a row of cards: the image column
 * is sticky and cross-fades as each numbered trait takes over the viewport on
 * the right. On narrow screens it collapses to a straightforward stack with
 * its own image per trait, which is the honest mobile answer — a sticky panel
 * on a phone just eats the screen.
 */
export function TeakStory() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const current = teakTraits[active] ?? teakTraits[0];

  return (
    <section className="on-dark section relative" aria-labelledby="teak-heading">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
              <span className="h-px w-12 bg-gold" aria-hidden="true" />
              The Timber
            </p>
          </Reveal>
          <AnimatedText
            as="h2"
            lines={['Why Burma teak?']}
            className="text-display-lg text-bone"
          />
          <Reveal preset="fade-up" delay={0.15}>
            <p className="lede mt-8 max-w-measure">
              Teak earned its reputation over centuries of hard use — in ships, in temple joinery,
              in furniture that outlived the households it was built for. Five qualities explain
              why.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky image column — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-32 aspect-[4/5] w-full overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.07 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.2 : 1.1, ease: EASE_CINEMATIC }}
                >
                  <MediaImage
                    src={current.image}
                    alt={current.imageAlt}
                    noZoom
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    wrapperClassName="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Index counter over the image */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-7">
                <span className="font-display text-6xl leading-none text-bone/90">
                  {current.index}
                </span>
                <span className="eyebrow text-sand/60">
                  {String(teakTraits.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Traits */}
          <ol className="lg:col-start-2">
            {teakTraits.map((trait, i) => (
              <TraitBlock
                key={trait.index}
                index={i}
                total={teakTraits.length}
                onActive={setActive}
                isActive={active === i}
                trait={trait}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TraitBlock({
  trait,
  index,
  total,
  isActive,
  onActive,
}: {
  trait: (typeof teakTraits)[number];
  index: number;
  total: number;
  isActive: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A tight band through the middle of the viewport decides which trait owns
  // the sticky image — wider margins cause two to claim it at once.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });

  // Must run in an effect — setting a parent's state during render is the
  // "cannot update a component while rendering another" warning.
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className={cn(
        'border-t border-bone/12 py-12 transition-opacity duration-700 ease-cinematic lg:py-16',
        'lg:opacity-40',
        isActive && 'lg:opacity-100',
        index === total - 1 && 'border-b',
      )}
    >
      {/* Per-trait image on mobile, where there is no sticky column */}
      <MediaImage
        src={trait.image}
        alt={trait.imageAlt}
        sizes="100vw"
        wrapperClassName="mb-8 aspect-[3/2] w-full lg:hidden"
      />

      <div className="flex items-baseline gap-5">
        <span className="font-sans text-xs tabular-nums tracking-wider2 text-gold">
          {trait.index}
        </span>
        <span className="h-px flex-1 bg-bone/20" aria-hidden="true" />
      </div>

      <h3 className="mt-5 font-display text-4xl text-bone sm:text-5xl">{trait.title}</h3>
      <p className="mt-4 font-display text-xl italic text-gold-soft/90 sm:text-2xl">
        {trait.lede}
      </p>
      <p className="mt-5 max-w-measure leading-relaxed text-sand/75">{trait.body}</p>
    </li>
  );
}
