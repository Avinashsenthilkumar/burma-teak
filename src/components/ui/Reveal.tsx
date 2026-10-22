'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import {
  clipReveal,
  fadeIn,
  fadeUp,
  fadeUpLarge,
  reducedVariants,
  scaleIn,
  slideLeft,
  slideRight,
  stagger,
  VIEWPORT,
} from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

const PRESETS = {
  'fade-in': fadeIn,
  'fade-up': fadeUp,
  'fade-up-lg': fadeUpLarge,
  'slide-left': slideLeft,
  'slide-right': slideRight,
  'scale-in': scaleIn,
  'clip-reveal': clipReveal,
} satisfies Record<string, Variants>;

export type RevealPreset = keyof typeof PRESETS;

type RevealProps = {
  children: ReactNode;
  /** Which motion preset to use. */
  preset?: RevealPreset;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of animating this element itself. */
  staggerChildren?: number;
  /** Replay every time it enters the viewport. Off by default. */
  repeat?: boolean;
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'footer';
};

/**
 * The workhorse scroll-reveal wrapper.
 *
 * Collapses to a plain fade when the visitor prefers reduced motion, so the
 * content still appears — it simply stops travelling.
 */
export function Reveal({
  children,
  preset = 'fade-up',
  className,
  delay = 0,
  staggerChildren,
  repeat = false,
  as = 'div',
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = reduced
    ? reducedVariants
    : staggerChildren !== undefined
      ? stagger(staggerChildren, delay)
      : PRESETS[preset];

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={repeat ? { ...VIEWPORT, once: false } : VIEWPORT}
      transition={staggerChildren === undefined && !reduced ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

/** A child of a staggering `Reveal`. Inherits the parent's timing. */
export function RevealItem({
  children,
  className,
  preset = 'fade-up',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  as?: RevealProps['as'];
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag className={cn(className)} variants={reduced ? reducedVariants : PRESETS[preset]}>
      {children}
    </MotionTag>
  );
}
