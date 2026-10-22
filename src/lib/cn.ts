/**
 * Minimal class-name joiner.
 *
 * Deliberately dependency-free — the project does not need clsx or
 * tailwind-merge for the small amount of conditional styling it does, and
 * every byte of client JS is scrutinised on a site this media-heavy.
 */
export type ClassValue = string | number | null | false | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (!value && value !== 0) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    out.push(String(value));
  };

  inputs.forEach(walk);
  return out.join(' ');
}
