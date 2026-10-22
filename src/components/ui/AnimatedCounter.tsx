'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_DRIFT } from '@/lib/motion';
import { cn } from '@/lib/cn';

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up once, when it first enters view.
 *
 * `aria-live` is intentionally absent and the final value is exposed to
 * assistive technology immediately — a screen reader should hear the number,
 * not a stream of intermediate ones.
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_DRIFT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}
