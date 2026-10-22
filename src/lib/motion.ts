import type { Variants, Transition } from 'framer-motion';

/**
 * The shared motion language.
 *
 * One easing curve and a small set of durations are reused everywhere, which
 * is most of what makes an animated site feel designed rather than assembled.
 * Nothing here bounces, spins or overshoots.
 */

/** The single cinematic curve. Matches `ease-cinematic` in Tailwind. */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;
export const EASE_DRIFT = [0.22, 0.61, 0.36, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  cinematic: 1.5,
} as const;

export const transition = {
  fast: { duration: DURATION.fast, ease: EASE_CINEMATIC },
  base: { duration: DURATION.base, ease: EASE_CINEMATIC },
  slow: { duration: DURATION.slow, ease: EASE_CINEMATIC },
  cinematic: { duration: DURATION.cinematic, ease: EASE_CINEMATIC },
} satisfies Record<string, Transition>;

/** Standard viewport trigger — fires a little before the element is centred. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

// --- Reusable variants ------------------------------------------------------

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: transition.slow },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: transition.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

/** Clip reveal — the wipe used for section imagery. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: DURATION.cinematic, ease: EASE_CINEMATIC },
  },
};

/** Image reveal — mask lifts while the image settles back from a slight zoom. */
export const imageReveal: Variants = {
  hidden: { scale: 1.18, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: EASE_CINEMATIC },
  },
};

/** Line-by-line headline reveal, used with a per-line overflow-hidden wrapper. */
export const lineReveal: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration: 1.05, ease: EASE_CINEMATIC },
  },
};

/** Word-level reveal for shorter display text. */
export const wordReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_CINEMATIC },
  },
};

/** Parent that staggers its children. */
export function stagger(amount = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: amount, delayChildren },
    },
  };
}

/** Variants collapsed to a plain fade — substituted when motion is reduced. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: 'linear' } },
};
