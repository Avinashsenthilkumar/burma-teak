/**
 * stats — the figures shown in the statistics band.
 *
 * ---------------------------------------------------------------------------
 * IMPORTANT: no figure here is invented.
 *
 * A stat renders as a real animated number ONLY when `value` is a number.
 * While `value` is null the card renders in a muted "pending" state showing
 * its placeholder key, so the section still looks composed but makes no claim.
 *
 * To publish a figure: set `value` to the number and `suffix` if needed.
 * ---------------------------------------------------------------------------
 */

import { companyConfig } from './company';

export type Stat = {
  /** Replace-me key, visible only while the figure is pending. */
  key: string;
  label: string;
  /** null = not yet confirmed. Set a number to publish it. */
  value: number | null;
  prefix?: string;
  suffix?: string;
  /** Optional one-line footnote shown under the figure. */
  note?: string;
};

export const stats: Stat[] = [
  {
    key: 'DATA_PLACEHOLDER_01',
    label: 'Acres Under Plantation',
    value: null,
    suffix: '+',
  },
  {
    key: 'DATA_PLACEHOLDER_02',
    label: 'Teak Saplings Cultivated',
    value: null,
    suffix: '+',
  },
  {
    key: 'DATA_PLACEHOLDER_03',
    label: 'Plantations Supported',
    value: null,
    suffix: '+',
  },
  {
    // This one IS confirmed: Ganesh Nursery has supplied saplings since 1980.
    key: 'HERITAGE',
    label: 'Years of Nursery Heritage',
    value: new Date().getFullYear() - companyConfig.parentEstablished,
    suffix: '',
    note: `Ganesh Nursery, established ${companyConfig.parentEstablished}`,
  },
];

/** True when at least one figure is still awaiting real data. */
export const hasPendingStats = stats.some((s) => s.value === null);
