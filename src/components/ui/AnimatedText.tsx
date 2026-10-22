'use client';

import { motion } from 'framer-motion';
import { lineReveal, reducedVariants, stagger, VIEWPORT, wordReveal } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';

type AnimatedTextProps = {
  /** One string per visual line. Lines are revealed in sequence. */
  lines: string[];
  as?: Tag;
  /** Set when a section points `aria-labelledby` at this heading. */
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Reveal word by word within each line instead of line by line. */
  byWord?: boolean;
};

/**
 * Editorial headline reveal.
 *
 * Each line sits inside an overflow-hidden mask and slides up from beneath it,
 * which reads far more deliberate than a fade. The whole thing degrades to a
 * single fade under `prefers-reduced-motion`.
 *
 * Lines are supplied explicitly rather than measured at runtime — that keeps
 * the break points art-directed instead of accidental, and avoids a layout
 * read on every resize.
 */
export function AnimatedText({
  lines,
  as = 'h2',
  id,
  className,
  lineClassName,
  delay = 0,
  stagger: staggerAmount = 0.1,
  byWord = false,
}: AnimatedTextProps) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return (
      <motion.div
        variants={reducedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <Tag id={id} className={cn(className)}>
          {lines.map((line, i) => (
            <span key={i} className={cn('block', lineClassName)}>
              {line}
            </span>
          ))}
        </Tag>
      </motion.div>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      variants={stagger(staggerAmount, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn('line-mask', lineClassName)}>
          {byWord ? (
            <span className="inline-flex flex-wrap gap-x-[0.28em]">
              {line.split(' ').map((word, w) => (
                <motion.span key={w} className="inline-block" variants={wordReveal}>
                  {word}
                </motion.span>
              ))}
            </span>
          ) : (
            <motion.span className="block" variants={lineReveal}>
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </MotionTag>
  );
}
