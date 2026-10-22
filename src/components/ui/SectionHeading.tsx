import type { ReactNode } from 'react';
import { AnimatedText } from './AnimatedText';
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  /** One string per visual line — break points stay art-directed. */
  lines: string[];
  lede?: string;
  children?: ReactNode;
  className?: string;
  headingClassName?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  size?: 'lg' | 'md' | 'sm';
};

const SIZE_CLASS = {
  lg: 'text-display-lg',
  md: 'text-display-md',
  sm: 'text-display-sm',
} as const;

export function SectionHeading({
  eyebrow,
  lines,
  lede,
  children,
  className,
  headingClassName,
  align = 'left',
  as = 'h2',
  size = 'md',
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow && (
        <Reveal preset="fade-in">
          <p className="eyebrow mb-7 flex items-center gap-4 opacity-65">
            {align === 'center' && (
              <span className="hidden h-px w-10 bg-current opacity-45 sm:block" aria-hidden="true" />
            )}
            <span>{eyebrow}</span>
            <span className="h-px w-10 bg-current opacity-45" aria-hidden="true" />
          </p>
        </Reveal>
      )}

      <AnimatedText
        as={as}
        lines={lines}
        className={cn(SIZE_CLASS[size], headingClassName)}
      />

      {lede && (
        <Reveal preset="fade-up" delay={0.18}>
          <p className={cn('lede mt-8 max-w-measure', align === 'center' && 'mx-auto')}>{lede}</p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
