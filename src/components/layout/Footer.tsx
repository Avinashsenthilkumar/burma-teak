import Link from 'next/link';
import Image from 'next/image';
import { companyConfig, formattedAddress, resolved } from '@/config/company';
import { footerColumns } from '@/config/navigation';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from '@/lib/icons';
import { Wordmark } from './Wordmark';

export function Footer() {
  const year = new Date().getFullYear();
  const email = resolved(companyConfig.email);
  const address = formattedAddress();
  const socials = companyConfig.socialLinks.filter((s) => resolved(s.href));

  return (
    <footer className="on-dark relative overflow-hidden">
      {/* Large footer statement */}
      <div className="shell border-b border-bone/10 py-section">
        <AnimatedText
          as="p"
          lines={['Rooted in nature.', 'Growing for tomorrow.']}
          className="text-display-lg text-bone"
        />
      </div>

      <div className="shell grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
        {/* Brand + contact */}
        <Reveal preset="fade-up" className="lg:col-span-4">
          <Wordmark variant="light" className="text-xl text-bone" showParent />

          <p className="lede mt-7 max-w-sm">{companyConfig.shortDescription}</p>

          <ul className="mt-9 space-y-4">
            <li>
              <a
                href={companyConfig.phoneHref}
                className="group flex items-center gap-3 text-sand/85 transition-colors hover:text-bone"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="link-underline">{companyConfig.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={companyConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sand/85 transition-colors hover:text-bone"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="link-underline">WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
              </a>
            </li>
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-3 text-sand/85 transition-colors hover:text-bone"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="link-underline">{email}</span>
                </a>
              </li>
            )}
            {address.length > 0 && (
              <li className="flex items-start gap-3 text-sand/85">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            )}
          </ul>
        </Reveal>

        {/* Navigation columns */}
        <Reveal
          preset="fade-up"
          staggerChildren={0.08}
          className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5 lg:col-start-6"
        >
          {footerColumns.map((column) => (
            <RevealItem key={column.heading}>
              <h2 className="eyebrow mb-6 text-sand/45">{column.heading}</h2>
              <ul className="space-y-3.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline font-sans text-sm text-sand/80 transition-colors hover:text-bone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>

        {/* Parent brand lockup */}
        <Reveal preset="fade-up" className="lg:col-span-3 lg:col-start-10">
          <h2 className="eyebrow mb-6 text-sand/45">A venture of</h2>
          <a
            href={companyConfig.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col gap-4"
            data-cursor="Visit"
          >
            <span className="inline-flex w-fit items-center justify-center">
              <Image
                src="/media/brand/ganesh-nursery-logo-light.png"
                alt="Ganesh Nursery"
                width={391}
                height={327}
                className="h-auto w-[132px]"
              />
            </span>
            <span className="link-underline font-sans text-sm text-sand/80">
              ganeshnursery.co.in
            </span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-sand/55">
            Supplying timber saplings, fruit trees and native plants from Gandarvakottai,
            near Thanjavur, since{' '}
            {companyConfig.parentEstablished}.
          </p>

          {socials.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-sans text-xs uppercase tracking-wider2 text-sand/65"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-bone/10 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs text-sand/45">
          © {year} {companyConfig.companyName}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="font-sans text-xs text-sand/45 hover:text-sand">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-sans text-xs text-sand/45 hover:text-sand">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
