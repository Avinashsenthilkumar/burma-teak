import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/sections/LegalPage';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Burma Teak Plant handles the information you send through this website.',
  alternates: { canonical: absoluteUrl('/privacy-policy') },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    heading: 'What we collect',
    paragraphs: [
      'This website collects only what you type into the enquiry form and send to us deliberately. There is no account system, no newsletter sign-up and no tracking pixel embedded in the pages.',
    ],
    list: [
      'Your name, and your company if you give one',
      'A phone number, an email address, or both — whichever you choose to share',
      'Your location, if you provide it',
      'The requirement you select and the message you write',
    ],
  },
  {
    heading: 'What we do with it',
    paragraphs: [
      'We use it to answer your enquiry and to keep a record of the conversation. That is the whole purpose. We do not sell it, rent it, or pass it to anyone outside the business for marketing.',
      'Enquiries are delivered to our own inbox through a mail service. That service processes the message in order to deliver it, and does not use it for anything else.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'This site sets no advertising or tracking cookies. The only browser storage it uses is a single session flag that remembers you have already seen the opening animation, so it is not replayed on every page. That flag is cleared when you close the tab and never leaves your device.',
      'If website analytics are enabled later, this section will be updated before they are switched on.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'Enquiries are kept for as long as the conversation is live and for a reasonable period afterwards, so that we can pick things up again if you come back to us. You can ask us to delete your enquiry at any time and we will.',
    ],
  },
  {
    heading: 'Your choices',
    paragraphs: [
      'You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Call us, and we will deal with it directly — there is no form to fill in for this.',
    ],
  },
  {
    heading: 'Links to other sites',
    paragraphs: [
      'This site links to Ganesh Nursery and may link to WhatsApp and social platforms. Once you follow one of those links you are on their service, under their privacy terms, not ours.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lines={['Privacy', 'policy.']}
      updated="[LAST_UPDATED_DATE]"
      sections={sections}
    />
  );
}
