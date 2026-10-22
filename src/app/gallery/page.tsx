import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ImageGallery } from '@/components/gallery/ImageGallery';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { galleryImages } from '@/data/gallery';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'The plantation, the nursery and the trees — photographs of teak cultivation at Gandarvakottai, near Thanjavur.',
  alternates: { canonical: absoluteUrl('/gallery') },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        lines={['The plantation,', 'in pictures.']}
        lede={`${galleryImages.length} photographs across the nursery, the land and the trees.`}
        image="/media/gallery/plantation/plantation-02.jpg"
        imageAlt="Sunlight breaking through the crowns of mature teak"
      />

      <section className="section bg-paper">
        <div className="shell">
          <ImageGallery />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
