'use client';

import { motion, useScroll } from 'framer-motion';

/**
 * A hairline of gold across the top, showing how far through the page you are.
 *
 * Deliberately no `useSpring`. Binding a spring-backed motion value to `style`
 * is what threw on mount in production:
 *
 *   Failed to execute 'animate' on 'Element':
 *   Offsets must be monotonically non-decreasing
 *     at bindToMotionValue -> addValue -> update -> mount
 *
 * A spring is a running animation, so binding one makes framer-motion hand a
 * generated keyframe set to the Web Animations API. The scroll value is bound
 * directly instead — it is a plain value that is only ever read — and the
 * smoothing that the spring used to provide is done by a CSS transition, which
 * the compositor handles and which cannot fail at runtime.
 *
 * There is no reduced-motion branch: the bar only ever reflects a scroll the
 * visitor is already performing, so it introduces no motion of its own.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[125] h-[2px] origin-left bg-gold transition-transform duration-150 ease-out"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
