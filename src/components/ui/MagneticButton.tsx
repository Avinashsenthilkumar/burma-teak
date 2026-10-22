'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * Magnetic hover.
 *
 * The element drifts a few pixels toward the pointer and springs back on
 * leave. Strength is deliberately low — at higher values it stops reading as
 * a premium detail and starts reading as a gimmick.
 *
 * Inert on touch devices and under reduced-motion, where it renders as a
 * plain wrapper with no listeners attached at all.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Bound directly rather than through useSpring. A spring is a live
  // animation, so binding one to `style` makes framer-motion hand generated
  // keyframes to the Web Animations API — the call that threw on mount in
  // production. The spring's ease-out and settle are now a CSS transition on
  // both layers, which also means the snap back to centre is still smooth.

  // Children drift slightly less than the wrapper — a small parallax that
  // makes the effect feel like depth rather than translation.
  const innerX = useTransform(x, (v) => v * 0.35);
  const innerY = useTransform(y, (v) => v * 0.35);

  const active = finePointer && !reduced;

  if (!active) {
    return <div className={cn('inline-block', className)}>{children}</div>;
  }

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block transition-transform duration-300 ease-out', className)}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.div
        className="transition-transform duration-300 ease-out"
        style={{ x: innerX, y: innerY }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
