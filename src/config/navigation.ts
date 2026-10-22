export type NavItem = {
  label: string;
  href: string;
  /** Short line shown beside the item in the full-screen mobile menu. */
  hint?: string;
};

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/', hint: 'The beginning' },
  { label: 'About', href: '/about', hint: 'Who we are' },
  { label: 'Teak', href: '/teak', hint: 'Why Burma teak' },
  { label: 'Plantation', href: '/plantation', hint: 'From soil to canopy' },
  { label: 'Sustainability', href: '/sustainability', hint: 'Growing with nature' },
  { label: 'Gallery', href: '/gallery', hint: 'The plantation in pictures' },
  { label: 'Contact', href: '/contact', hint: 'Start a conversation' },
];

/** Secondary links that appear in the footer and the mobile menu footer. */
export const secondaryNav: NavItem[] = [
  { label: 'Video Gallery', href: '/videos' },
  { label: 'Offerings', href: '/offerings' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export const footerColumns: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Explore',
    items: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Burma Teak', href: '/teak' },
      { label: 'Plantation', href: '/plantation' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Offerings', href: '/offerings' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Videos', href: '/videos' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];
