import type { ReactNode } from 'react';
import { PageHero } from './PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { companyConfig, isPlaceholder } from '@/config/company';

export type LegalSection = {
  heading: string;
  paragraphs: (string | ReactNode)[];
  list?: string[];
};

/**
 * Shared shell for the legal pages.
 *
 * Carries a standing notice that these are drafts pending review. They are
 * written to be accurate about how this specific site behaves — what it does
 * and does not collect — rather than being generic boilerplate, but they are
 * not legal advice and the notice says so plainly.
 */
export function LegalPage({
  eyebrow,
  title,
  lines,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lines: string[];
  updated: string;
  sections: LegalSection[];
}) {
  const entity = isPlaceholder(companyConfig.legalName)
    ? companyConfig.companyName
    : companyConfig.legalName;

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        lines={lines}
        image="/media/company/legal-hero.jpg"
        imageAlt="A dense teak stand with heavy undergrowth"
      />

      <section className="section bg-paper">
        <div className="shell max-w-3xl">
          <Reveal preset="fade-up">
            <p className="eyebrow text-forest-mid/50">Last updated — {updated}</p>

            <div className="mt-10 border-l-2 border-teak bg-teak/5 p-6">
              <p className="text-sm leading-relaxed text-forest-mid/80">
                <strong className="text-forest-deep">Draft pending review.</strong> This{' '}
                {title.toLowerCase()} describes how this website actually works, but it has not
                been reviewed by a lawyer and the operating entity&rsquo;s registered details are
                not yet filled in. Have it checked before the site goes live.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 space-y-14">
            {sections.map((section) => (
              <Reveal key={section.heading} preset="fade-up">
                <section>
                  <h2 className="font-display text-3xl text-forest-deep">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="mt-5 leading-relaxed text-forest-mid/80">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-5 space-y-3">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 leading-relaxed text-forest-mid/80"
                        >
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-teak" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}

            <Reveal preset="fade-up">
              <section>
                <h2 className="font-display text-3xl text-forest-deep">Contact</h2>
                <p className="mt-5 leading-relaxed text-forest-mid/80">
                  Questions about this {title.toLowerCase()} can be directed to {entity} on{' '}
                  <a href={companyConfig.phoneHref} className="link-underline text-forest-deep">
                    {companyConfig.phone}
                  </a>
                  , or in writing at {companyConfig.address.city},{' '}
                  {companyConfig.address.district} District, {companyConfig.address.state},{' '}
                  {companyConfig.address.country}.
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
