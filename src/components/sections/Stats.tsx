import { stats } from '@/config/stats';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

/**
 * The statistics band.
 *
 * Figures that have not been supplied render as a muted em-dash with their
 * replacement key beneath, rather than as an invented number. The section
 * still reads as composed, and nothing on it is a claim we cannot stand behind.
 */
export function Stats() {
  return (
    <section className="on-dark bg-forest py-section" aria-labelledby="stats-heading">
      <div className="shell">
        <Reveal preset="fade-in">
          <h2 id="stats-heading" className="eyebrow mb-16 text-gold">
            By the numbers
          </h2>
        </Reveal>

        <Reveal
          preset="fade-up"
          staggerChildren={0.12}
          className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.key}>
              <div className="border-t border-bone/15 pt-7">
                {stat.value === null ? (
                  <PendingFigure statKey={stat.key} />
                ) : (
                  <p className="font-display text-display-md leading-none text-bone">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                )}

                <p className="mt-5 font-sans text-sm uppercase tracking-wider2 text-sand/75">
                  {stat.label}
                </p>
                {stat.note && <p className="mt-2 text-xs text-sand/45">{stat.note}</p>}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function PendingFigure({ statKey }: { statKey: string }) {
  return (
    <p className="font-display text-display-md leading-none text-bone/25" title="Awaiting figures">
      <span aria-hidden="true">—</span>
      <span className="sr-only">Figure not yet published</span>
      {/* Visible to the developer in the markup, invisible as a claim. */}
      <span className="sr-only">{statKey}</span>
    </p>
  );
}
