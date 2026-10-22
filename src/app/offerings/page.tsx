import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FeaturedFilm } from '@/components/video/FeaturedFilm';
import { filmsByPage } from '@/data/videos';
import { founder } from '@/data/founder';
import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { publishedOfferings } from '@/data/offerings';
import { companyConfig } from '@/config/company';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Offerings',
  description:
    'Teak saplings and timber saplings raised at Gandarvakottai, near Thanjavur, by Ganesh Nursery, supplied to individual growers and to plantations.',
  alternates: { canonical: absoluteUrl('/offerings') },
  keywords: ['teak saplings', 'teak plants', 'timber saplings', 'teak saplings Thanjavur'],
};

export default function OfferingsPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Supply"
        lines={['Stock that starts', 'the plantation right.']}
        lede="The quality of a plantation is decided in its first season. It begins with the sapling."
        image="/media/products/products-hero.jpg"
        imageAlt="A teak sapling carrying broad young leaves"
      />

      <section className="section bg-paper">
        <div className="shell">
          <ol className="space-y-24 lg:space-y-32">
            {publishedOfferings.map((offering, i) => (
              <li key={offering.slug}>
                <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                    <MediaImage
                      src={offering.image}
                      alt={offering.imageAlt}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      wrapperClassName="aspect-[4/3] w-full"
                    />
                  </div>

                  <div>
                    <Reveal preset="fade-in">
                      <p className="eyebrow mb-7 flex items-center gap-4 text-teak">
                        <span className="h-px w-10 bg-teak" aria-hidden="true" />
                        {String(i + 1).padStart(2, '0')}
                      </p>
                    </Reveal>
                    <AnimatedText
                      as="h2"
                      lines={[offering.title]}
                      className="text-display-sm text-forest-deep"
                    />
                    <Reveal preset="fade-up" delay={0.12}>
                      <p className="mt-4 font-display text-xl italic text-teak-dark">
                        {offering.summary}
                      </p>
                      <p className="mt-5 max-w-measure leading-relaxed text-forest-mid/75">
                        {offering.body}
                      </p>
                      <ButtonLink
                        href="/contact"
                        variant="outline"
                        className="mt-9"
                        cursorLabel="Enquire"
                      >
                        Enquire About This
                      </ButtonLink>
                    </Reveal>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          {/*
            Services such as plantation development and consultation are drafted
            in src/data/offerings.ts with `confirmed: false` and are deliberately
            not published until the client confirms the scope. Flip the flag and
            they appear here automatically.
          */}
          <Reveal preset="fade-up" className="mt-24 grid items-center gap-10 border-t border-forest/12 pt-12 sm:grid-cols-5">
            <MediaImage
              src={founder.nursery}
              alt={founder.nurseryAlt}
              sizes="(max-width: 640px) 100vw, 30vw"
              wrapperClassName="aspect-square w-full sm:col-span-2"
            />
            <p className="max-w-measure leading-relaxed text-forest-mid/75 sm:col-span-3">
              Planting at scale, or not sure which species suits your land? Call us on{' '}
              <a href={companyConfig.phoneHref} className="link-underline text-forest-deep">
                {companyConfig.phone}
              </a>{' '}
              and we will talk it through before you commit to anything.
            </p>
          </Reveal>
        </div>
      </section>

      <FeaturedFilm
        film={filmsByPage.offerings}
        eyebrow="Watch"
        headline={['The planting', 'stock itself.']}
        body="A close look at a sapling ready for the field — leaf, stem and root collar."
        reverse
      />

      <CtaBanner />
    </>
  );
}
