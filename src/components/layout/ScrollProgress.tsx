'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A hairline of gold across the top, showing how far through the page you are.
 *
 * One motion value, bound for the element's whole life. The earlier version
 * put `reduced ? scrollYProgress : scaleX` into `style`, which swaps the
 * identity of the bound motion value the moment the reduced-motion query
 * resolves, forcing framer-motion to unbind and rebind mid-flight.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[125] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}