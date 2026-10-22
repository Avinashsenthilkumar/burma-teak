'use client';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * Drifting teak leaves over the hero.
 *
 * Twelve of them, CSS-animated — no JS loop, no canvas, no inline styles. The
 * variation comes from picking out of fixed class lists by index, which keeps
 * every value in the stylesheet where Tailwind can see it, and renders
 * identically on server and client so there is no hydration mismatch.
 *
 * Kept deliberately sparse and low-contrast. A snowstorm of particles is the
 * clearest sign that a site is trying too hard.
 */

const POSITIONS = [
  'left-[4%]', 'left-[14%]', 'left-[23%]', 'left-[31%]',
  'left-[42%]', 'left-[49%]', 'left-[58%]', 'left-[66%]',
  'left-[74%]', 'left-[81%]', 'left-[89%]', 'left-[95%]',
];

const DURATIONS = [
  '[animation-duration:19s]', '[animation-duration:26s]', '[animation-duration:22s]',
  '[animation-duration:30s]', '[animation-duration:17s]', '[animation-duration:24s]',
];

const DELAYS = [
  '[animation-delay:-2s]', '[animation-delay:-7s]', '[animation-delay:-11s]',
  '[animation-delay:-15s]', '[animation-delay:-4s]', '[animation-delay:-19s]',
];

const SIZES = ['h-3 w-3', 'h-4 w-4', 'h-5 w-5', 'h-3.5 w-3.5'];

const OPACITIES = ['text-sand/50', 'text-sand/70', 'text-sand/35'];

export function LeafParticles({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {POSITIONS.map((position, i) => (
        <span
          key={position}
          className={cn(
            'absolute bottom-[-12vh] block animate-leaf-drift',
            position,
            DURATIONS[i % DURATIONS.length],
            DELAYS[i % DELAYS.length],
            OPACITIES[i % OPACITIES.length],
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className={cn(SIZES[i % SIZES.length])}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2c4.5 1.4 7 5 7 9.2 0 5-3.2 9-7 10.8-3.8-1.8-7-5.8-7-10.8C5 7 7.5 3.4 12 2Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
