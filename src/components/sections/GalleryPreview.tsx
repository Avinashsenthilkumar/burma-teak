import Link from 'next/link';
import { galleryHighlights } from '@/data/gallery';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';

/** Homepage teaser for the full gallery. */
export function GalleryPreview() {
  return (
    <section className="section bg-bone" aria-labelledby="gallery-preview-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                Gallery
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={['The plantation,', 'in pictures.']}
              className="text-display-md text-forest-deep"
            />
          </div>
          <Reveal preset="fade-up">
            <ButtonLink href="/gallery" variant="outline" cursorLabel="Browse">
              View Full Gallery
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal
          preset="fade-up"
          staggerChildren={0.09}
          className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {galleryHighlights.map((image, i) => (
            <RevealItem
              key={image.id}
              className={i === 0 || i === 3 ? 'lg:col-span-2' : undefined}
            >
              <Link
                href="/gallery"
                data-cursor="View"
                aria-label={`View gallery — ${image.alt}`}
                className="block"
              >
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  wrapperClassName={
                    i === 0 || i === 3 ? 'aspect-[4/3] w-full' : 'aspect-[3/4] w-full'
                  }
                />
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
