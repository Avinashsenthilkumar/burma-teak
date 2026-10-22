import { companyConfig, resolved } from '@/config/company';
import { siteConfig, absoluteUrl } from '@/config/site';

/**
 * Organization + LocalBusiness schema.
 *
 * Only confirmed values are emitted. Any field still holding a placeholder is
 * omitted from the JSON-LD entirely rather than published as "[EMAIL]" —
 * structured data that lies is worse for SEO than structured data that is
 * merely incomplete.
 */
export function StructuredData() {
  const email = resolved(companyConfig.email);
  const street = resolved(companyConfig.address.street);
  const postalCode = resolved(companyConfig.address.postalCode);
  const lat = resolved(companyConfig.coordinates.latitude);
  const lng = resolved(companyConfig.coordinates.longitude);
  const socials = companyConfig.socialLinks
    .map((s) => resolved(s.href))
    .filter((href): href is string => Boolean(href));

  // Google reads addressRegion as the state, so the district rides along with
  // the locality rather than displacing the state.
  const locality = companyConfig.address.district
    ? `${companyConfig.address.city}, ${companyConfig.address.district} District`
    : companyConfig.address.city;

  const address = {
    '@type': 'PostalAddress',
    ...(street ? { streetAddress: street } : {}),
    addressLocality: locality,
    addressRegion: companyConfig.address.state,
    ...(postalCode ? { postalCode } : {}),
    addressCountry: companyConfig.address.countryCode,
  };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: companyConfig.companyName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: companyConfig.tagline,
    telephone: companyConfig.phone,
    ...(email ? { email } : {}),
    address,
    ...(socials.length ? { sameAs: [...socials, companyConfig.parentUrl] } : { sameAs: [companyConfig.parentUrl] }),
    parentOrganization: {
      '@type': 'Organization',
      name: companyConfig.parentCompany,
      url: companyConfig.parentUrl,
      foundingDate: String(companyConfig.parentEstablished),
    },
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl('/#localbusiness'),
    name: companyConfig.companyName,
    image: absoluteUrl(siteConfig.ogImage),
    url: siteConfig.url,
    telephone: companyConfig.phone,
    ...(email ? { email } : {}),
    address,
    ...(lat && lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: lat,
            longitude: lng,
          },
        }
      : {}),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Tamil Nadu, India' },
      { '@type': 'City', name: companyConfig.address.nearestCity },
      { '@type': 'City', name: companyConfig.address.city },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: 'Teak saplings' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: 'Timber saplings' },
      },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { '@id': absoluteUrl('/#organization') },
    inLanguage: 'en-IN',
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output of our own literals — no user input reaches this.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, localBusiness, website]),
      }}
    />
  );
}
