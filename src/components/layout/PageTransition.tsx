'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';

/**
 * Route transition.
 *
 * A curtain sweeps down over the incoming route and lifts away, while the
 * page content settles in behind it.
 *
 * This is an *enter* transition only, keyed on the pathname. The App Router
 * unmounts the old route before an exit animation could finish, so the common
 * `AnimatePresence mode="wait"` pattern either flickers or silently skips —
 * a one-directional curtain is the version that reliably looks intentional.
 * It is also fast: under half a second, so navigation never feels gated.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        key={`curtain-${pathname}`}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[130] origin-top bg-forest-deep"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: EASE_CINEMATIC }}
      />
      <motion.div
        key={`page-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_CINEMATIC, delay: 0.16 }}
      >
        {children}
      </motion.div>
    </>
  );
}
