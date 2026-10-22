import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { companyConfig, formattedAddress, locationPhrase, resolved } from '@/config/company';
import { absoluteUrl } from '@/config/site';
import { Mail, MapPin, MessageCircle, Phone } from '@/lib/icons';
import { MediaImage } from '@/components/ui/MediaImage';
import { founder } from '@/data/founder';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Speak to Burma Teak Plant about teak saplings, plantation development and cultivation support at Gandarvakottai, near Thanjavur, Tamil Nadu.',
  alternates: { canonical: absoluteUrl('/contact') },
};

export default function ContactPage() {
  const email = resolved(companyConfig.email);
  const address = formattedAddress();
  const mapEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={['Start a', 'conversation.']}
        lede="Tell us about the land, the timeline and what you want it to become. We will tell you honestly whether teak is the right answer."
        image="/media/company/contact-hero.jpg"
        imageAlt="A teak stand in full leaf"
      />

      <section className="section bg-paper">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Details */}
          <div className="lg:col-span-4">
            <Reveal preset="fade-up">
              <h2 className="font-display text-3xl text-forest-deep">Reach us directly</h2>

              <ul className="mt-10 space-y-8">
                <li>
                  <p className="eyebrow mb-3 text-forest-mid/50">Phone</p>
                  <a
                    href={companyConfig.phoneHref}
                    className="link-underline inline-flex items-center gap-3 font-display text-2xl text-forest-deep"
                  >
                    <Phone className="h-5 w-5 text-teak" aria-hidden="true" />
                    {companyConfig.phone}
                  </a>
                </li>

                <li>
                  <p className="eyebrow mb-3 text-forest-mid/50">WhatsApp</p>
                  <a
                    href={companyConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-3 text-lg text-forest-deep"
                  >
                    <MessageCircle className="h-5 w-5 text-teak" aria-hidden="true" />
                    {companyConfig.whatsapp}
                  </a>
                </li>

                {email && (
                  <li>
                    <p className="eyebrow mb-3 text-forest-mid/50">Email</p>
                    <a
                      href={`mailto:${email}`}
                      className="link-underline inline-flex items-center gap-3 text-lg text-forest-deep"
                    >
                      <Mail className="h-5 w-5 text-teak" aria-hidden="true" />
                      {email}
                    </a>
                  </li>
                )}

                {address.length > 0 && (
                  <li>
                    <p className="eyebrow mb-3 text-forest-mid/50">Where we are</p>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-teak" aria-hidden="true" />
                      <address className="not-italic text-lg leading-relaxed text-forest-deep">
                        {address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </div>
                  </li>
                )}
              </ul>

              <div className="mt-12 border-t border-forest/12 pt-8">
                <MediaImage
                  src={founder.portrait}
                  alt={founder.portraitAlt}
                  sizes="(max-width: 640px) 60vw, 18vw"
                  wrapperClassName="mb-6 aspect-[3/4] w-40"
                />
                <p className="text-sm leading-relaxed text-forest-mid/70">
                  Burma Teak Plant is a venture of {companyConfig.parentCompany}, {locationPhrase()} —
                  supplying timber saplings, fruit trees and native plants since{' '}
                  {companyConfig.parentEstablished}.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal preset="fade-up" delay={0.1}>
              <AnimatedText
                as="h2"
                lines={['Send an enquiry.']}
                className="text-display-sm text-forest-deep"
              />
              <p className="lede mt-5 max-w-measure">
                A phone number or an email is enough — whichever you prefer we use.
              </p>
            </Reveal>

            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-bone pb-section" aria-label="Location">
        <div className="shell">
          {mapEmbed ? (
            <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
              <iframe
                src={mapEmbed}
                title={`${companyConfig.companyName} location map`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5 border border-forest/12 bg-paper p-10 sm:p-14">
              <MapPin className="h-7 w-7 text-teak" aria-hidden="true" strokeWidth={1.25} />
              <h2 className="font-display text-3xl text-forest-deep">
                {companyConfig.address.city}, {companyConfig.address.state}
              </h2>
              <p className="max-w-measure text-forest-mid/70">
                Visits are welcome by arrangement — call ahead and we will make sure someone is
                on site to walk you through the nursery.
              </p>
              {/*
                The embedded map appears automatically once
                NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL is set in .env.local.
                No map is shown rather than a guessed pin.
              */}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
