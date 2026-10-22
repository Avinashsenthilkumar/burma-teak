import { MediaImage } from '@/components/ui/MediaImage';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { founder, burmaConnection } from '@/data/founder';

/**
 * "Where the name comes from" — the Burma connection, on the teak page.
 *
 * This is the one place the proprietor's photograph is more than presence:
 * it was taken at Karaweik Palace in Yangon, which makes it the natural
 * illustration for a section about where Burma teak takes its name.
 *
 * The copy deliberately stops at what is true of the species and the trade.
 * It does not claim a sourcing relationship, an import route or a visit for
 * business — none of that is confirmed, and a photograph is not evidence of it.
 */
export function BurmaConnection() {
  return (
    <section className="on-dark section" aria-labelledby="burma-heading">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <figure>
            <MediaImage
              src={founder.burmaPortrait}
              alt={founder.burmaAlt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              wrapperClassName="aspect-[3/4] w-full"
            />
            <figcaption className="mt-4 font-sans text-xs uppercase tracking-eyebrow text-sand/50">
              {burmaConnection.caption}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal preset="fade-in">
            <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
              <span className="h-px w-12 bg-gold" aria-hidden="true" />
              {burmaConnection.eyebrow}
            </p>
          </Reveal>

          <AnimatedText
            as="h2"
            id="burma-heading"
            lines={burmaConnection.headline}
            className="text-display-md text-bone"
          />

          <Reveal preset="fade-up" delay={0.15}>
            {burmaConnection.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0 ? 'lede mt-9 max-w-measure' : 'mt-6 max-w-measure leading-relaxed text-sand/75'
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
