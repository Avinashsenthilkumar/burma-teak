'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { advantages } from '@/data/sustainability';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { useIsDesktop, usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * "Why Choose Us" — large numbered editorial rows, not a three-card grid.
 *
 * On desktop, hovering or focusing a row swaps a floating image panel. The
 * rows are buttons so the behaviour is reachable from the keyboard, not just
 * the mouse. Mobile shows each image inline instead.
 */
export function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const current = advantages[active] ?? advantages[0];

  return (
    <section className="section bg-paper" aria-labelledby="why-heading">
      <div className="shell">
        <div className="max-w-3xl">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
              <span className="h-px w-12 bg-teak" aria-hidden="true" />
              Why Work With Us
            </p>
          </Reveal>
          <AnimatedText
            as="h2"
            lines={['Five reasons', 'growers stay.']}
            className="text-display-lg text-forest-deep"
          />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Rows */}
          <ol className="lg:col-span-7">
            {advantages.map((item, i) => (
              <li key={item.index} className="border-t border-forest/10 last:border-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={`why-body-${item.index}`}
                  className={cn(
                    'group w-full py-9 text-left transition-opacity duration-500 ease-cinematic lg:py-11',
                    isDesktop && active !== i && 'opacity-45',
                  )}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-sans text-xs tabular-nums tracking-wider2 text-teak">
                      {item.index}
                    </span>
                    <h3 className="font-display text-4xl text-forest-deep sm:text-5xl lg:text-6xl">
                      {item.title}
                    </h3>
                  </div>

                  <MediaImage
                    src={item.image}
                    alt={item.imageAlt}
                    sizes="100vw"
                    wrapperClassName="mt-6 aspect-[3/2] w-full lg:hidden"
                  />

                  <p
                    id={`why-body-${item.index}`}
                    className="mt-5 max-w-measure leading-relaxed text-forest-mid/75 lg:ml-[3.25rem]"
                  >
                    {item.body}
                  </p>
                </button>
              </li>
            ))}
          </ol>

          {/* Floating image panel — desktop only */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 aspect-[3/4] w-full overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={current.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE_CINEMATIC }}
                >
                  <MediaImage
                    src={current.image}
                    alt={current.imageAlt}
                    noZoom
                    sizes="40vw"
                    wrapperClassName="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
