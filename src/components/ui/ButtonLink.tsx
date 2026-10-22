import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from '@/lib/icons';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost-light';

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  outline: 'btn-outline',
  'ghost-light': 'btn-ghost-light',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  /** Cursor label shown by the custom cursor on hover. */
  cursorLabel?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  withArrow = true,
  cursorLabel,
  external = false,
}: ButtonLinkProps) {
  const classes = cn('btn', VARIANT_CLASS[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        data-cursor={cursorLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cursor={cursorLabel}>
      {content}
    </Link>
  );
}
