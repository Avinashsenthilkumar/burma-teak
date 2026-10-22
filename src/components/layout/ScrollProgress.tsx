'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

/** A hairline of gold across the top, showing how far through the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = usePrefersReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[125] h-[2px] origin-left bg-gold"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
}
