import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms on which this website and its content are provided.',
  alternates: { canonical: absoluteUrl('/terms') },
};

const sections: LegalSection[] = [
  {
    heading: 'About this site',
    paragraphs: [
      'burmateakplant.com is an informational website. It describes teak, how a plantation is established and cared for, and what we supply. Nothing on it is an offer capable of acceptance, and nothing on it forms a contract.',
    ],
  },
  {
    heading: 'Enquiries are not orders',
    paragraphs: [
      'Sending an enquiry through this site starts a conversation. It does not reserve stock, fix a price, or commit either side to anything. Any supply of saplings or services is governed by whatever we agree separately, in writing or on the phone.',
    ],
  },
  {
    heading: 'Growing is not guaranteed',
    paragraphs: [
      'Teak is a living crop grown outdoors over decades. How a plantation performs depends on soil, rainfall, management, pests, fire, grazing and markets — most of which are outside anyone’s control, including ours.',
      'Descriptions of growth stages, timber characteristics and plantation practice on this site are general information about the species and about good practice. They are not a forecast of yield, timber volume, timber price or financial return, and should not be relied on as one. Where we give advice for your specific site, it is our honest professional opinion and is still subject to the same uncertainties.',
    ],
  },
  {
    heading: 'Content and images',
    paragraphs: [
      'The text, photography, film and design on this site belong to us or are used with permission. You are welcome to read, share and link to the pages. Please do not reproduce the photography or copy commercially without asking first.',
    ],
  },
  {
    heading: 'Accuracy',
    paragraphs: [
      'We keep this site current and correct it when we find something wrong. Even so, information here may be incomplete or out of date. Where something matters to a decision you are making, call us and confirm it rather than relying on the page.',
    ],
  },
  {
    heading: 'Availability',
    paragraphs: [
      'We do not promise the site will be available without interruption. It may be unavailable during maintenance or for reasons outside our control, and we are not liable for loss arising from that.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of India, and the courts of [JURISDICTION] have exclusive jurisdiction over any dispute arising from them.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      lines={['Terms &', 'conditions.']}
      updated="[LAST_UPDATED_DATE]"
      sections={sections}
    />
  );
}
