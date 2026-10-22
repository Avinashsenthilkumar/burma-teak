'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHasFinePointer, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Desktop custom cursor.
 *
 * Renders nothing at all on touch devices and under reduced-motion — not a
 * hidden element, nothing: no listeners, no springs, no DOM.
 *
 * Any element can drive it by declaring `data-cursor="VIEW"`. When the label
 * is present the ring expands and carries the word; otherwise it stays a small
 * dot. The native cursor is only hidden while this component is genuinely
 * mounted, via a class on <body>, so a failure here can never leave a visitor
 * with no cursor at all.
 */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 });

  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('has-custom-cursor');
    return () => document.body.classList.remove('has-custom-cursor');
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;

      const labelled = target.closest<HTMLElement>('[data-cursor]');
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, summary');

      setLabel(labelled?.dataset.cursor?.trim() || null);
      setInteractive(Boolean(clickable || labelled));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const expanded = Boolean(label);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[140] hidden lg:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/70 bg-bone/10 backdrop-blur-[2px]"
        animate={{
          width: expanded ? 86 : interactive ? 42 : 14,
          height: expanded ? 86 : interactive ? 42 : 14,
          backgroundColor: expanded ? 'rgba(201,162,39,0.92)' : 'rgba(243,237,227,0.12)',
          borderColor: expanded ? 'rgba(201,162,39,0)' : 'rgba(243,237,227,0.7)',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.5 }}
      >
        <motion.span
          className="select-none font-sans text-[0.625rem] font-semibold uppercase tracking-eyebrow text-forest-deep"
          animate={{ opacity: expanded ? 1 : 0, scale: expanded ? 1 : 0.7 }}
          transition={{ duration: 0.22 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
