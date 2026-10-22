'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  galleryCategories,
  imagesByCategory,
  type GalleryCategory,
  type GalleryImage,
} from '@/data/gallery';
import { MediaImage } from '@/components/ui/MediaImage';
import { Lightbox } from './Lightbox';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Masonry gallery with category filters.
 *
 * Layout uses CSS columns, which gives a true masonry flow without measuring
 * anything in JS. Every tile reserves its real aspect ratio up front, so the
 * column heights never jump as images arrive.
 *
 * Only the first row is eager; everything else is lazy via MediaImage, so a
 * gallery of a hundred photographs still costs one screenful on load.
 */
export function ImageGallery({
  initialCategory = 'all',
  showFilters = true,
  images,
}: {
  initialCategory?: GalleryCategory | 'all';
  showFilters?: boolean;
  images?: GalleryImage[];
}) {
  const [category, setCategory] = useState<GalleryCategory | 'all'>(initialCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const visible = useMemo(
    () => images ?? imagesByCategory(category),
    [images, category],
  );

  return (
    <div>
      {showFilters && (
        <div className="mb-14 flex flex-wrap gap-x-2 gap-y-2" role="group" aria-label="Filter gallery">
          {galleryCategories.map((option) => {
            const active = option.id === category;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setCategory(option.id);
                  setOpenIndex(null);
                }}
                aria-pressed={active}
                className={cn(
                  'rounded-full border px-5 py-2.5 font-sans text-xs uppercase tracking-wider2 transition-colors duration-500',
                  active
                    ? 'border-forest bg-forest text-bone'
                    : 'border-forest/20 text-forest-mid/70 hover:border-forest/50 hover:text-forest-deep',
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-20 text-center font-display text-2xl text-forest-mid/50">
          Nothing in this collection yet.
        </p>
      ) : (
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
          {visible.map((image, i) => (
            <motion.li
              key={image.id}
              className="break-inside-avoid"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{
                duration: 0.9,
                ease: EASE_CINEMATIC,
                delay: reduced ? 0 : (i % 3) * 0.08,
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                data-cursor="View"
                aria-label={`Open image: ${image.alt}`}
                className="group block w-full text-left"
              >
                <MediaImage
                  src={image.src}
                  alt={image.alt}
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  wrapperClassName={cn('w-full', ratioClass(image.ratio))}
                />
                {image.caption && (
                  <span className="mt-3 block font-sans text-xs uppercase tracking-wider2 text-forest-mid/55 transition-colors group-hover:text-forest-deep">
                    {image.caption}
                  </span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      )}

      <Lightbox
        images={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </div>
  );
}

/**
 * Map a numeric ratio onto a fixed Tailwind class.
 * Arbitrary values would need to be interpolated into the class string, which
 * Tailwind cannot see at build time — these four cover the whole gallery.
 */
function ratioClass(ratio: number): string {
  if (ratio >= 1.6) return 'aspect-[16/9]';
  if (ratio >= 1.2) return 'aspect-[4/3]';
  if (ratio >= 0.95) return 'aspect-square';
  return 'aspect-[3/4]';
}
