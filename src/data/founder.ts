/**
 * The person behind the nursery.
 *
 * ---------------------------------------------------------------------------
 * The client asked to be present across the site. This file is how that is
 * done deliberately rather than by scattering the same headshot everywhere:
 * each appearance has a job, a different photograph, and copy that earns it.
 *
 * `name` and `role` are PLACEHOLDERS. Every component here uses
 * `isPlaceholder()` — until a real name is supplied the photographs and the
 * words carry the section on their own and no bracketed token is ever shown.
 * ---------------------------------------------------------------------------
 */

export const founder = {
  /** PLACEHOLDER — supply the proprietor's name. */
  name: '[FOUNDER_NAME]',
  /** PLACEHOLDER — e.g. 'Proprietor' or 'Founder'. */
  role: '[FOUNDER_ROLE]',

  portrait: '/media/founder/founder-portrait.jpg',
  portraitAlt: 'The proprietor of Ganesh Nursery',
  portraitWide: '/media/founder/founder-wide.jpg',

  /**
   * At Karaweik Palace, Yangon. The photograph is used where the site talks
   * about where Burma teak takes its name from — a real link, which is why it
   * sits on the teak page rather than being used as generic decoration.
   */
  burma: '/media/founder/founder-burma.jpg',
  burmaPortrait: '/media/founder/founder-burma-portrait.jpg',
  burmaAlt: 'The proprietor at Karaweik Palace in Yangon, Myanmar',

  /** Holding a sapling with a grower. */
  nursery: '/media/founder/founder-nursery.jpg',
  nurseryWide: '/media/founder/founder-nursery-wide.jpg',
  nurseryAlt: 'The proprietor with a grower, holding a nursery-raised sapling',
} as const;

/**
 * The homepage statement. Written in the first person because it is attributed
 * to a person; nothing in it claims a figure, a date or a credential.
 */
export const founderStatement = {
  eyebrow: 'The Person Behind It',
  headline: ['Someone has to', 'think in decades.'],
  quote:
    'A nursery can sell you a plant in an afternoon. Teak asks you to care about what that plant becomes forty years from now, when the decision is no longer yours to make. That is the part I take seriously.',
  body: 'Ganesh Nursery has been putting plants into Tamil Nadu soil since 1980. Burma Teak Plant is what happens when that habit is pointed at a tree you will not live to cut.',
};

export const burmaConnection = {
  eyebrow: 'Where The Name Comes From',
  headline: ['Burma set', 'the standard.'],
  body: [
    'Teak takes the name "Burma teak" from the forests of Myanmar, where slow growth, tight grain and clean form set the benchmark the timber trade still measures against.',
    'It is a standard, not a shortcut. The same quality is only reached elsewhere by giving the tree the same time and the same care — which is the whole argument for growing it properly here.',
  ],
  caption: 'Karaweik Palace, Yangon',
};
