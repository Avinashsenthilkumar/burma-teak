import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Sustainability } from '@/components/sections/Sustainability';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FeaturedFilm } from '@/components/video/FeaturedFilm';
import { filmsByPage } from '@/data/videos';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sustainability',
  description:
    'Soil health, water management, biodiversity and selective harvesting — how Burma Teak Plant works the land over a timescale measured in decades.',
  alternates: { canonical: absoluteUrl('/sustainability') },
  keywords: ['sustainable teak plantation', 'sustainable forestry', 'responsible plantation'],
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        lines={['Growing', 'with nature.']}
        lede="Over a teak horizon, soil and water are not talking points. They are the asset."
        image="/media/sustainability/sustainability-hero.jpg"
        imageAlt="A dense teak stand in full leaf"
      />

      {/* The argument */}
      <section className="section bg-paper">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                The Long Arithmetic
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={['Patience is a', 'kind of ecology.']}
              className="text-display-md text-forest-deep"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal preset="fade-up" delay={0.1}>
              <p className="lede">
                A teak plantation gives you no opportunity to extract value quickly, and that one
                fact does most of the ecological work on its own.
              </p>
              <p className="mt-6 leading-relaxed text-forest-mid/75">
                If a stand has to stand for decades, you cannot afford to strip the topsoil, drain
                the water table or sterilise the ground it grows in. The practices that look like
                environmental good behaviour are, on this timescale, simply the practices that
                keep the asset working.
              </p>
              <p className="mt-6 leading-relaxed text-forest-mid/75">
                That is the version of sustainability we can actually promise: not a certificate,
                but a set of decisions that happen to align with the land because the economics
                leave no alternative.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-12">
            <ParallaxImage
              src="/media/sustainability/sustainability.jpg"
              alt="Spraying a young teak stand, mist hanging in the rows"
              className="mt-8 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-12"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <Sustainability />

      <FeaturedFilm
        film={filmsByPage.sustainability}
        eyebrow="Watch"
        headline={['Around the', 'nursery.']}
        body="Through the beds at Gandarvakottai — how teak saplings are raised, graded and made ready to travel."
      />

      <CtaBanner />
    </>
  );
}
