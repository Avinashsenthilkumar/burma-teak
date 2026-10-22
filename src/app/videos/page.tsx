import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ReelsGallery } from '@/components/video/ReelsGallery';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { Reveal } from '@/components/ui/Reveal';
import { films } from '@/data/videos';
import { companyConfig } from '@/config/company';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Films',
  description:
    'Short films from the Ganesh Nursery teak plantation at Gandarvakottai, near Thanjavur — the saplings, the nursery, standing timber and teak in use.',
  alternates: { canonical: absoluteUrl('/videos') },
};

/**
 * VideoObject schema for each film. Without a published upload date we omit
 * `uploadDate` rather than inventing one — Google would rather have an
 * incomplete record than a fabricated one.
 */
function filmSchema() {
  return films.map((film) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: film.title,
    description: film.description,
    thumbnailUrl: absoluteUrl(film.poster),
    contentUrl: absoluteUrl(film.src),
    inLanguage: 'ta',
    publisher: { '@id': absoluteUrl('/#organization') },
  }));
}

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Film"
        lines={['Walk the rows', 'with us.']}
        lede="Seven short films shot at the nursery and out on the plantation."
        image="/media/posters/teak-plantation.jpg"
        imageAlt="Standing teak in a mature plantation"
      />

      <section className="section bg-paper">
        <div className="shell">
          <Reveal preset="fade-up" className="mb-14 max-w-measure">
            <p className="lede">
              These were filmed at {companyConfig.parentCompany} in {companyConfig.address.city}{' '}
              and shot vertically, for the phone. They are shown here the way they were made,
              rather than cropped into a shape they were never framed for.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-forest-mid/65">
              All seven are narrated in Tamil. Nothing plays until you choose it, and nothing
              plays with sound until you press play. Each film also appears on the page its
              subject belongs to — this is the full index.
            </p>
          </Reveal>

          <ReelsGallery films={films} columns={2} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmSchema()) }}
      />

      <CtaBanner />
    </>
  );
}
