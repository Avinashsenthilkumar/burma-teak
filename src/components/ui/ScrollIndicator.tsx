'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * The hero's "scroll to explore" marker.
 *
 * Decorative, so it is hidden from assistive technology — the content below is
 * reachable by every normal means and a screen reader gains nothing from being
 * told to scroll.
 */
export function ScrollIndicator({
  label = 'Scroll to explore',
  className,
}: {
  label?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn('flex flex-col items-center gap-4', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 1 }}
    >
      <span className="eyebrow [writing-mode:vertical-rl] text-bone/60">{label}</span>
      <span className="relative block h-16 w-px overflow-hidden bg-bone/20">
        {!reduced && (
          <span className="absolute inset-x-0 top-0 block h-full origin-top animate-line-pulse bg-gold" />
        )}
      </span>
    </motion.div>
  );
}
