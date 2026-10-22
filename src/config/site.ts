import { companyConfig } from './company';

export const siteConfig = {
  name: companyConfig.companyName,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://burmateakplant.com',
  title: 'Burma Teak Plant — Premium Teak Plantation & Saplings',
  titleTemplate: '%s | Burma Teak Plant',
  description:
    'Premium Burma teak cultivation from Gandarvakottai, near Thanjavur, Tamil Nadu. Teak saplings, plantation development and long-term cultivation support, grown with the care of a nursery established in 1980.',
  locale: 'en_IN',
  /**
   * SEO themes, used to shape page copy and metadata keywords.
   * Kept short on purpose — these describe the business, they are not stuffing.
   */
  keywords: [
    'Burma teak plants',
    'teak plantation',
    'teak saplings',
    'teak saplings Thanjavur',
    'teak saplings Gandarvakottai',
    'teak saplings Pudukkottai',
    'teak cultivation',
    'sustainable teak plantation',
    'plantation development',
    'premium timber',
  ],
  ogImage: '/api/og',
  twitterHandle: undefined as string | undefined,
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
