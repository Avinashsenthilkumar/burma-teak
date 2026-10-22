import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { TeakStory } from '@/components/sections/TeakStory';
import { BurmaConnection } from '@/components/sections/BurmaConnection';
import { FeaturedFilm } from '@/components/video/FeaturedFilm';
import { filmsByPage } from '@/data/videos';
import { GrowthStory } from '@/components/sections/GrowthStory';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Burma Teak',
  description:
    'What makes Burma teak the timber it is — durability, strength, grain, natural resistance and a growing horizon measured in decades.',
  alternates: { canonical: absoluteUrl('/teak') },
  keywords: ['Burma teak', 'teak timber', 'Tectona grandis', 'premium teak plants'],
};

export default function TeakPage() {
  return (
    <>
      <PageHero
        eyebrow="The Timber"
        lines={['The legacy', 'of teak.']}
        lede="Centuries of hard use in ships, temples and furniture built the reputation. The timber earned it."
        image="/media/teak/teak-hero.jpg"
        imageAlt="Sunlight through the crowns of a mature teak stand"
      />

      {/* Species context */}
      <section className="section bg-paper">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                The Species
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={['Tectona', 'grandis.']}
              className="text-display-md text-forest-deep"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal preset="fade-up" delay={0.1}>
              <p className="lede">
                Teak is a large deciduous hardwood native to South and Southeast Asia — broad
                leaves, a straight bole, and heartwood that carries its own protection in the
                form of natural oils and silica.
              </p>
              <p className="mt-6 leading-relaxed text-forest-mid/75">
                &ldquo;Burma teak&rdquo; names the standard the timber trade set long ago for
                slow-grown, tight-grained, well-formed teak. It describes a quality of timber and
                the growing conditions that produce it, not a shortcut: the same standard is only
                reached elsewhere by giving the tree the same time and the same care.
              </p>
              <p className="mt-6 leading-relaxed text-forest-mid/75">
                That is the whole proposition of a managed plantation. You cannot hurry the
                chemistry that makes teak worth having — you can only make sure nothing gets in
                its way.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-12">
            <ParallaxImage
              src="/media/teak/teak-timber.jpg"
              alt="Teak logs stacked and loaded at a timber yard"
              className="mt-8 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-12"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <BurmaConnection />
      <TeakStory />

      <FeaturedFilm
        film={filmsByPage.teak}
        eyebrow="Watch"
        headline={['Timber', 'and time.']}
        body="Teak as finished timber, and the long horizon that produces it — filmed on the plantation and at the yard."
      />

      <GrowthStory />
      <CtaBanner />
    </>
  );
}
