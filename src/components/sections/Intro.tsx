import { AnimatedText } from '@/components/ui/AnimatedText';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { companyConfig } from '@/config/company';

/**
 * "More than a tree. A legacy."
 *
 * Split editorial layout — display type holds the left column, the argument
 * runs down the right, and a tall parallax image anchors the composition.
 */
export function Intro() {
  return (
    <section className="section bg-paper" aria-labelledby="intro-heading">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-7">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
              <span className="h-px w-12 bg-teak" aria-hidden="true" />
              Introduction
            </p>
          </Reveal>

          <AnimatedText
            as="h2"
            lines={['More than a tree.', 'A legacy.']}
            className="text-display-lg text-forest-deep"
          />
        </div>

        <div className="flex flex-col justify-end lg:col-span-5">
          <Reveal preset="fade-up" delay={0.1}>
            <p className="lede">
              Burma Teak Plant is the teak venture of {companyConfig.parentCompany} at Gandarvakottai,
              near Thanjavur — a
              nursery that has been putting saplings into Tamil Nadu soil since{' '}
              {companyConfig.parentEstablished}.
            </p>
            <p className="mt-6 text-forest-mid/75">
              Teak is the one thing a nursery sells that does not answer you quickly. A fruit tree
              fruits; a hedge fills in. A teak plantation replies in decades — and by then every
              early decision has either compounded in your favour or quietly cost you.
            </p>
            <p className="mt-6 text-forest-mid/75">
              That long feedback loop is the whole discipline, and it is why we stay involved long
              after the sale would normally have ended.
            </p>

            <ButtonLink href="/about" variant="outline" className="mt-10" cursorLabel="Read">
              Our Story
            </ButtonLink>
          </Reveal>
        </div>

        {/* Full-width anchor image */}
        <div className="lg:col-span-12">
          <ParallaxImage
            src="/media/about/about-main.jpg"
            alt="Mature teak trunks standing close together"
            className="mt-6 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-10"
            sizes="100vw"
            strength={14}
          />
        </div>
      </div>
    </section>
  );
}
