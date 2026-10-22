/**
 * companyConfig — the single source of truth for company information.
 *
 * ---------------------------------------------------------------------------
 * HOW TO READ THIS FILE
 * ---------------------------------------------------------------------------
 * Values are either CONFIRMED or PLACEHOLDER.
 *
 *  - CONFIRMED values come from Ganesh Nursery's published information.
 *  - PLACEHOLDER values are wrapped in square brackets, e.g. '[EMAIL]'.
 *
 * Anything still in brackets is NOT displayed as fact anywhere on the site.
 * The `isPlaceholder()` helper below is used throughout the UI to hide or
 * soften unconfirmed values, so the site never publishes invented details.
 *
 * To go live: replace the bracketed strings with real values. Nothing else
 * needs to change.
 * ---------------------------------------------------------------------------
 */

export const PLACEHOLDER_PATTERN = /^\[.*\]$/;

/** True when a config value is still an unfilled placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || PLACEHOLDER_PATTERN.test(value.trim());
}

/** Returns the value only if it has been filled in, otherwise `undefined`. */
export function resolved(value: string | undefined | null): string | undefined {
  return isPlaceholder(value) ? undefined : (value as string);
}

export const companyConfig = {
  // --- Identity ------------------------------------------------------------
  /** CONFIRMED — the venture name. */
  companyName: 'Burma Teak Plant',
  legalName: '[LEGAL_ENTITY_NAME]',
  /** CONFIRMED — Burma Teak Plant is the premium timber arm of Ganesh Nursery. */
  parentCompany: 'Ganesh Nursery',
  parentUrl: 'https://ganeshnursery.co.in',
  /** CONFIRMED — Ganesh Nursery has supplied saplings since 1980. */
  parentEstablished: 1980,
  /** PLACEHOLDER — the year the teak venture itself began. */
  foundedYear: '[FOUNDED_YEAR]',

  tagline: 'Rooted in Nature. Built for Generations.',
  shortDescription:
    'Premium Burma teak cultivation rooted in quality, sustainability and long-term value.',
  /**
   * PLACEHOLDER — the full "about" paragraph the client should write.
   * Until it is supplied, the About page falls back to the lineage copy in
   * src/data/about.ts, which states only what is confirmed.
   */
  longDescription: '[COMPANY_DESCRIPTION]',

  // --- Contact -------------------------------------------------------------
  /** CONFIRMED — published by Ganesh Nursery. */
  phone: '+91 99431 19955',
  phoneHref: 'tel:+919943119955',
  /** CONFIRMED — same number is used for WhatsApp. */
  whatsapp: '+91 99431 19955',
  whatsappHref: 'https://wa.me/919943119955',
  /** PLACEHOLDER — no email address is published yet. */
  email: '[EMAIL]',

  /**
   * The nursery is at Gandarvakottai, a taluk town in Pudukkottai district.
   * Its 613xxx PIN falls in the Thanjavur postal region, which is why the two
   * names travel together and why the business is searched for as "Thanjavur".
   *
   * `city` is the real postal town and is what goes into the address and the
   * LocalBusiness schema. `nearestCity` is the market it is known by, used in
   * copy and SEO — never presented as the postal address.
   */
  address: {
    /** PLACEHOLDER — street or door line not published yet. */
    street: '[STREET_ADDRESS]',
    /** CONFIRMED. */
    city: 'Gandarvakottai',
    district: 'Pudukkottai',
    state: 'Tamil Nadu',
    country: 'India',
    countryCode: 'IN',
    /** CONFIRMED — Ghandarvakottai S.O. */
    postalCode: '613301',
    /** The town growers search for; ~30km away, in the neighbouring district. */
    nearestCity: 'Thanjavur',
  },

  /** PLACEHOLDER — fill in to enable the map and LocalBusiness geo schema. */
  coordinates: {
    latitude: '[LATITUDE]',
    longitude: '[LONGITUDE]',
  },

  /** CONFIRMED — Ganesh Nursery's published opening description is not detailed. */
  hours: '[OPENING_HOURS]',

  // --- Social --------------------------------------------------------------
  socialLinks: [
    { label: 'Instagram', href: '[INSTAGRAM_URL]' },
    { label: 'Facebook', href: '[FACEBOOK_URL]' },
    { label: 'YouTube', href: '[YOUTUBE_URL]' },
    { label: 'LinkedIn', href: '[LINKEDIN_URL]' },
  ],

  // --- Scale ---------------------------------------------------------------
  // Deliberately unfilled. See src/config/stats.ts — the statistics section
  // renders a "figures pending" state rather than inventing numbers.
  acreage: '[ACREAGE]',
  treesCultivated: '[TREES_CULTIVATED]',
  experienceYears: '[EXPERIENCE_YEARS]',
  teamInformation: '[TEAM_INFORMATION]',
} as const;

export type CompanyConfig = typeof companyConfig;

/** Address formatted for display, skipping any unfilled lines. */
export function formattedAddress(): string[] {
  const a = companyConfig.address;
  return [
    resolved(a.street),
    a.city,
    [a.district && `${a.district} District`, a.state].filter(Boolean).join(', '),
    [resolved(a.postalCode), a.country].filter(Boolean).join(' '),
  ]
    .filter((line): line is string => Boolean(line && line.trim()))
    .map((line) => line.trim());
}

/** "Gandarvakottai, near Thanjavur" — the form used in body copy. */
export function locationPhrase(): string {
  const a = companyConfig.address;
  return a.nearestCity ? `${a.city}, near ${a.nearestCity}` : a.city;
}

/** Years of lineage behind the venture — confirmed, so safe to display. */
export function parentHeritageYears(): number {
  return new Date().getFullYear() - companyConfig.parentEstablished;
}
