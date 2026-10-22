import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { aboutIntro, mission, philosophy, values, vision } from '@/data/about';
import { companyConfig, isPlaceholder } from '@/config/company';
import { absoluteUrl } from '@/config/site';
import { FeaturedFilm } from '@/components/video/FeaturedFilm';
import { filmsByPage } from '@/data/videos';
import { founder } from '@/data/founder';
import { FounderBand } from '@/components/sections/FounderBand';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Burma Teak Plant is the teak venture of Ganesh Nursery at Gandarvakottai, near Thanjavur — a nursery supplying timber saplings, fruit trees and native plants since 1980.',
  alternates: { canonical: absoluteUrl('/about') },
};

export default function AboutPage() {
  // If the client supplies a full company description it takes precedence over
  // the lineage copy written here.
  const hasCustomDescription = !isPlaceholder(companyConfig.longDescription);

  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        lines={aboutIntro.headline}
        lede={aboutIntro.lede}
        image="/media/company/about-hero.jpg"
        imageAlt="Teak saplings massed in the nursery beds"
      />

      {/* Narrative */}
      <section className="section bg-paper">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal preset="fade-up">
              <p className="eyebrow mb-8 text-teak">Since {companyConfig.parentEstablished}</p>
              <p className="font-display text-3xl leading-snug text-forest-deep sm:text-4xl">
                {aboutIntro.lede}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal preset="fade-up" delay={0.1}>
              {hasCustomDescription ? (
                <p className="lede">{companyConfig.longDescription}</p>
              ) : (
                aboutIntro.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? 'lede' : 'mt-6 leading-relaxed text-forest-mid/75'}
                  >
                    {paragraph}
                  </p>
                ))
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-12">
            <ParallaxImage
              src={aboutIntro.image}
              alt={aboutIntro.imageAlt}
              className="mt-8 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-12"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="on-dark section">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          {[mission, vision].map((block, i) => (
            <Reveal key={block.title} preset="fade-up" delay={i * 0.1}>
              <div className="border-t border-bone/15 pt-8">
                <p className="eyebrow mb-7 text-gold">{block.title}</p>
                <p className="font-display text-3xl leading-snug text-bone sm:text-4xl">
                  {block.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <div className="shell mt-24">
          <Reveal preset="fade-in">
            <h2 className="eyebrow mb-14 text-sand/50">What we hold to</h2>
          </Reveal>
          <Reveal
            preset="fade-up"
            staggerChildren={0.09}
            className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <RevealItem key={value.title}>
                <div className="border-t border-bone/15 pt-7">
                  <h3 className="font-display text-2xl text-bone">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/75">{value.body}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section bg-bone">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                {philosophy.eyebrow}
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={philosophy.headline}
              className="text-display-md text-forest-deep"
            />
            <Reveal preset="fade-up" delay={0.15}>
              <p className="lede mt-8 max-w-measure">{philosophy.body}</p>
              <ButtonLink href="/plantation" variant="outline" className="mt-10" cursorLabel="See">
                How We Plant
              </ButtonLink>
            </Reveal>
          </div>

          <div className="grid gap-5">
            <ParallaxImage
              src={philosophy.image}
              alt={philosophy.imageAlt}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <MediaImage
              src={founder.nurseryWide}
              alt={founder.nurseryAlt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              wrapperClassName="aspect-[4/3] w-full"
            />
          </div>
        </div>
      </section>

      <FounderBand />

      <FeaturedFilm
        film={filmsByPage.about}
        eyebrow="Watch"
        headline={['The nursery,', 'at work.']}
        body="Plants, people and the day-to-day of growing timber stock."
      />

      {/* Team / company image */}
      <section className="pb-section bg-bone">
        <div className="shell">
          <Reveal preset="clip-reveal">
            <MediaImage
              src="/media/company/team.jpg"
              alt="Nursery workers lifting teak saplings into crates"
              sizes="100vw"
              wrapperClassName="aspect-[3/2] w-full sm:aspect-[21/9]"
            />
          </Reveal>
          <Reveal preset="fade-up">
            <p className="mt-6 max-w-measure text-sm text-forest-mid/60">
              {isPlaceholder(companyConfig.teamInformation)
                ? `The people who raise the stock, walk the land and answer the phone — at Gandarvakottai since ${companyConfig.parentEstablished}.`
                : companyConfig.teamInformation}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
