'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const springConfig = { stiffness: 180, damping: 18, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  // Children drift slightly less than the wrapper — a small parallax that
  // makes the effect feel like depth rather than translation.
  const innerX = useTransform(sx, (v) => v * 0.35);
  const innerY = useTransform(sy, (v) => v * 0.35);

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
      className={cn('inline-block', className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <motion.div style={{ x: innerX, y: innerY }}>{children}</motion.div>
    </motion.div>
  );
}
