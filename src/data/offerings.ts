/**
 * Offerings.
 *
 * ---------------------------------------------------------------------------
 * `confirmed: false` items are NOT rendered in production. They are listed
 * here as ready-to-enable drafts — flip `confirmed` to true once the client
 * confirms they actually provide that service, and it appears site-wide.
 *
 * Confirmed entries are supported by Ganesh Nursery's own published
 * description (timber saplings, fruit trees, macadamia, native and indoor
 * plants) and its stated focus on teak saplings from the Thanjavur region.
 * ---------------------------------------------------------------------------
 */

export type Offering = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  imageAlt: string;
  confirmed: boolean;
};

export const offerings: Offering[] = [
  {
    slug: 'teak-saplings',
    title: 'Teak Saplings',
    summary: 'Nursery-raised Burma teak planting stock.',
    body:
      'Teak saplings raised and graded in the nursery, hardened off and ready for the field. Available for individual growers and for plantation-scale planting.',
    image: '/media/products/product-01-saplings.jpg',
    imageAlt: 'Teak saplings growing on in the nursery beds',
    confirmed: true,
  },
  {
    slug: 'timber-saplings',
    title: 'Other Timber Saplings',
    summary: 'Beyond teak — the wider timber range.',
    body:
      'Ganesh Nursery has supplied timber saplings alongside fruit trees, macadamia and native plants since 1980. Growers planting mixed stands can source the full range from one nursery.',
    image: '/media/products/product-02-timber.jpg',
    imageAlt: 'Teak logs stacked and loaded at a timber yard',
    confirmed: true,
  },
  {
    slug: 'plantation-development',
    title: 'Plantation Development',
    summary: 'Land assessed, prepared and planted.',
    body: '[PRODUCT_INFORMATION — confirm scope before publishing]',
    image: '/media/products/product-03-development.jpg',
    imageAlt: 'Young teak rows standing under irrigation',
    confirmed: false,
  },
  {
    slug: 'plantation-consultation',
    title: 'Plantation Consultation',
    summary: 'Spacing, timing and species advice.',
    body: '[PRODUCT_INFORMATION — confirm scope before publishing]',
    image: '/media/products/product-04-consultation.jpg',
    imageAlt: 'Holding a teak sapling among the nursery beds',
    confirmed: false,
  },
  {
    slug: 'cultivation-support',
    title: 'Teak Cultivation Support',
    summary: 'Ongoing care through the growing years.',
    body: '[PRODUCT_INFORMATION — confirm scope before publishing]',
    image: '/media/products/product-05-support.jpg',
    imageAlt: 'A worker irrigating young teak by hand',
    confirmed: false,
  },
];

/** Only the offerings cleared for publication. */
export const publishedOfferings = offerings.filter((o) => o.confirmed);
