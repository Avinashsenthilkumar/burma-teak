import Image from 'next/image';
import { cn } from '@/lib/cn';
import { companyConfig } from '@/config/company';

/**
 * The Burma Teak Plant lockup: the Ganesh Nursery mark beside its own wordmark.
 *
 * Burma Teak Plant is an endorsed sub-brand, so the parent's mark carries the
 * recognition and the wordmark says whose site you are actually on. Showing
 * the Ganesh Nursery logo alone would leave a visitor on burmateakplant.com
 * looking at a different company's name.
 *
 * Two files, because the logo's wordmark is dark navy: over the transparent
 * header it would disappear against the hero, so `-light` lifts only the
 * darkest pixels to bone and leaves the teal and green alone. `variant`
 * chooses; the header passes whichever matches its current background.
 */
export function Wordmark({
  className,
  variant = 'colour',
  showParent = false,
  markClassName,
}: {
  className?: string;
  /** 'light' over dark backgrounds, 'colour' over paper. */
  variant?: 'colour' | 'light';
  showParent?: boolean;
  markClassName?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-3 sm:gap-4', className)}>
      <Image
        src={
          variant === 'light'
            ? '/media/brand/ganesh-nursery-logo-light.png'
            : '/media/brand/ganesh-nursery-logo.png'
        }
        alt={`${companyConfig.parentCompany} logo`}
        width={391}
        height={327}
        priority
        className={cn('h-10 w-auto shrink-0 sm:h-12', markClassName)}
      />

      <span
        aria-hidden="true"
        className="hidden h-9 w-px shrink-0 bg-current opacity-20 sm:block"
      />

      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3em] leading-[0.95] tracking-tight">
          Burma&nbsp;Teak
        </span>
        <span className="mt-[0.32em] font-sans text-[0.42em] font-medium uppercase tracking-eyebrow opacity-70">
          {showParent ? `By ${companyConfig.parentCompany}` : 'Plantation'}
        </span>
      </span>
    </span>
  );
}

/** The tree mark alone — used as the favicon source and in tight spots. */
export function TeakMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn(className)} fill="none" aria-hidden="true">
      <path d="M20 37V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M20 15c0-7.2 5-12.2 12.2-13C33.3 9.2 28.8 15.8 20 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 23c0-6-4.2-10.2-10.2-11C8.9 18.2 12.6 23.7 20 23Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 37h16"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
