import { filmsByPage } from '@/data/videos';
import { ReelsGallery } from '@/components/video/ReelsGallery';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';

/** Homepage strip — four films, then the route through to the rest. */
export function VideoPreview() {
  return (
    <section className="section bg-paper" aria-labelledby="video-preview-heading">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal preset="fade-in">
              <p className="eyebrow mb-10 flex items-center gap-4 text-teak">
                <span className="h-px w-12 bg-teak" aria-hidden="true" />
                From The Nursery
              </p>
            </Reveal>
            <AnimatedText
              as="h2"
              lines={['Walk the rows', 'with us.']}
              className="text-display-md text-forest-deep"
            />
            <Reveal preset="fade-up" delay={0.15}>
              <p className="lede mt-7 max-w-measure">
                Short films shot at the nursery and out on the plantation. Three of seven here;
                the rest sit on the pages they belong to.
              </p>
            </Reveal>
          </div>
          <Reveal preset="fade-up">
            <ButtonLink href="/videos" variant="outline" cursorLabel="Watch">
              All Films
            </ButtonLink>
          </Reveal>
        </div>

        <ReelsGallery films={filmsByPage.home} columns={3} className="mt-16" />
      </div>
    </section>
  );
}
