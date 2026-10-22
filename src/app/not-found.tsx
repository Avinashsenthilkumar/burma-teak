import Link from 'next/link';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { primaryNav } from '@/config/navigation';

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[88svh] items-center pt-32">
      <div className="shell">
        <p className="eyebrow mb-8 flex items-center gap-4 text-gold">
          <span className="h-px w-12 bg-gold" aria-hidden="true" />
          404
        </p>

        <h1 className="max-w-4xl text-display-lg text-bone">
          This path does not lead anywhere.
        </h1>

        <p className="lede mt-8 max-w-measure">
          The page you were looking for has moved or never existed. Everything else is still
          where you left it.
        </p>

        <div className="mt-12">
          <ButtonLink href="/" variant="gold" cursorLabel="Home">
            Back To Home
          </ButtonLink>
        </div>

        <nav aria-label="Site" className="mt-20 border-t border-bone/15 pt-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline font-sans text-sm uppercase tracking-wider2 text-sand/65"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
