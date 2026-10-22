import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { PlantationJourney } from '@/components/sections/PlantationJourney';
import { ForestVideo } from '@/components/sections/ForestVideo';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FeaturedFilm } from '@/components/video/FeaturedFilm';
import { filmsByPage } from '@/data/videos';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Plantation',
  description:
    'From land preparation to future harvest — how a teak plantation is established, tended and brought to maturity.',
  alternates: { canonical: absoluteUrl('/plantation') },
  keywords: ['teak plantation', 'plantation development', 'teak cultivation'],
};

const considerations = [
  {
    title: 'Soil & drainage',
    body: 'Teak wants deep, well-drained ground. Waterlogged or shallow soil shows up as poor form years later, when it is far too late to fix.',
  },
  {
    title: 'Rainfall & season',
    body: 'Planting is timed to the rains. Get the timing right and the first season does most of the establishment work for you.',
  },
  {
    title: 'Spacing',
    body: 'Spacing decides canopy, light and girth. It is set once, at planting, and every later decision inherits it.',
  },
  {
    title: 'Protection',
    body: 'Grazing and fire are the two things most likely to end a young plantation. Both are cheaper to prevent than to recover from.',
  },
];

export default function PlantationPage() {
  return (
    <>
      <PageHero
        eyebrow="The Process"
        lines={['From soil', 'to canopy.']}
        lede="Six stages, spread across a working lifetime — and a set of decisions that the next stage always inherits."
        image="/media/plantation/plantation-hero.jpg"
        imageAlt="Young teak rows standing under irrigation"
      />

      <PlantationJourney />
      <ForestVideo />

      {/* Site considerations */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="max-w-3xl">
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                Before You Plant
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={['Four things worth', 'settling first.']}
              className="text-display-md text-forest-deep"
            />
            <Reveal preset="fade-up" delay={0.15}>
              <p className="lede mt-8 max-w-measure">
                We would rather tell you a site is wrong than sell into it. These are the
                questions we work through with every grower before a single sapling is ordered.
              </p>
            </Reveal>
          </div>

          <Reveal
            preset="fade-up"
            staggerChildren={0.09}
            className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2"
          >
            {considerations.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="border-t border-forest/12 pt-7">
                  <span className="font-sans text-xs tabular-nums tracking-wider2 text-teak">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-3xl text-forest-deep">{item.title}</h3>
                  <p className="mt-3 max-w-measure leading-relaxed text-forest-mid/75">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <FeaturedFilm
        film={filmsByPage.plantation}
        eyebrow="Watch"
        headline={['Inside a', 'teak plantation.']}
        body="Standing teak, canopy and undergrowth — what a plantation looks like once it has had time to become forest."
        reverse
        tone="dark"
      />

      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
