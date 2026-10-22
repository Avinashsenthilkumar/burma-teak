'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { primaryNav, secondaryNav } from '@/config/navigation';
import { companyConfig } from '@/config/company';
import { useScrolled, useScrollLock, useEscape, usePrefersReducedMotion } from '@/lib/hooks';
import { EASE_CINEMATIC } from '@/lib/motion';
import { Menu, X, Phone } from '@/lib/icons';
import { Wordmark } from './Wordmark';
import { cn } from '@/lib/cn';

/**
 * Site header.
 *
 * Every page opens with a dark full-bleed hero, so the header starts
 * transparent and sitting over the artwork, then transitions to a blurred
 * light bar once the visitor scrolls past it. The mobile menu is a full-screen
 * panel with items that arrive one at a time.
 */
export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(60);
  const [open, setOpen] = useState(false);

  useScrollLock(open);
  useEscape(() => setOpen(false), open);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[120] transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-cinematic',
          // A hero can be bright — misty canopy especially — and bone-on-mist
          // is unreadable, so the transparent state carries a soft scrim.
          // It reads as depth rather than as a bar; `before:` keeps it behind
          // the content without an extra element.
          'before:pointer-events-none before:absolute before:inset-0 before:-z-10',
          'before:bg-gradient-to-b before:from-ink/55 before:via-ink/25 before:to-transparent',
          'before:transition-opacity before:duration-700',
          solid
            ? 'border-b border-forest/10 bg-paper/85 py-3 backdrop-blur-xl before:opacity-0'
            : 'border-b border-transparent bg-transparent py-5 before:opacity-100',
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE_CINEMATIC, delay: 0.2 }}
      >
        <div className="shell flex items-center justify-between gap-8">
          <Link
            href="/"
            aria-label={`${companyConfig.companyName} — home`}
            className={cn(
              'transition-colors duration-700',
              solid ? 'text-forest-deep' : 'text-bone',
            )}
          >
            <Wordmark variant={solid ? 'colour' : 'light'} className="text-base sm:text-lg" />
          </Link>

          <div className="ml-auto flex items-center gap-6 xl:gap-8">
            <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {primaryNav.map((item) => {
              const active =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'link-underline whitespace-nowrap font-sans text-[0.75rem] uppercase tracking-wider2 transition-colors duration-500 xl:text-[0.8125rem]',
                    solid
                      ? active
                        ? 'text-forest-deep'
                        : 'text-forest-mid/70 hover:text-forest-deep'
                      : active
                        ? 'text-bone'
                        : 'text-bone/85 hover:text-bone',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            </nav>

            <div className="flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor="Enquire"
              className={cn(
                'hidden btn shrink-0 whitespace-nowrap px-6 py-3.5 text-[0.7rem] md:inline-flex xl:px-7 xl:text-[0.75rem]',
                solid ? 'btn-primary' : 'btn-ghost-light',
              )}
            >
              Enquire Now
            </Link>

            <a
              href={companyConfig.phoneHref}
              aria-label={`Call ${companyConfig.phone}`}
              className={cn(
                'grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 md:hidden',
                solid
                  ? 'border-forest/20 text-forest-deep'
                  : 'border-bone/30 text-bone',
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'grid h-11 w-11 place-items-center rounded-full border transition-colors duration-500 lg:hidden',
                solid ? 'border-forest/20 text-forest-deep' : 'border-bone/30 text-bone',
              )}
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="on-dark fixed inset-0 z-[110] flex flex-col overflow-y-auto pt-28 lg:hidden"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
        >
          <nav aria-label="Mobile" className="shell flex-1 py-6">
            <ul>
              {primaryNav.map((item, i) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="border-b border-bone/10">
                    <motion.div
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: reduced ? 0 : 0.26 + i * 0.07,
                        duration: 0.7,
                        ease: EASE_CINEMATIC,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className="flex items-baseline justify-between gap-4 py-5"
                      >
                        <span
                          className={cn(
                            'font-display text-4xl sm:text-5xl',
                            active ? 'text-gold' : 'text-bone',
                          )}
                        >
                          {item.label}
                        </span>
                        {item.hint && (
                          <span className="eyebrow shrink-0 text-sand/40">{item.hint}</span>
                        )}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            <motion.div
              className="mt-12 flex flex-wrap gap-x-7 gap-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.8, duration: 0.6 }}
            >
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="link-underline font-sans text-sm text-sand/65"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          </nav>

          <motion.div
            className="shell border-t border-bone/10 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 0.9, duration: 0.6 }}
          >
            <p className="eyebrow mb-3 text-sand/45">Speak to us</p>
            <a href={companyConfig.phoneHref} className="font-display text-2xl text-bone">
              {companyConfig.phone}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
