/**
 * Enquiry validation — shared by the client form and the API route so the
 * rules can never drift apart. Server-side validation is the authoritative
 * one; the client copy exists only to give immediate feedback.
 */

export type EnquiryPayload = {
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  requirement: string;
  message: string;
  /** Honeypot — must stay empty. Never shown to real users. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

export const REQUIREMENT_OPTIONS = [
  'Teak saplings',
  'Other timber saplings',
  'Plantation development',
  'Plantation consultation',
  'Cultivation support',
  'Something else',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Permissive on format, strict on digit count — handles +91, spaces, dashes. */
const PHONE_DIGITS_RE = /\d/g;

export const LIMITS = {
  name: 100,
  company: 120,
  phone: 24,
  email: 160,
  location: 120,
  requirement: 60,
  message: 2000,
} as const;

export function emptyEnquiry(): EnquiryPayload {
  return {
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    requirement: '',
    message: '',
    website: '',
  };
}

export function validateEnquiry(data: Partial<EnquiryPayload>): FieldErrors {
  const errors: FieldErrors = {};
  const value = (k: keyof EnquiryPayload) => (data[k] ?? '').toString().trim();

  const name = value('name');
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length < 2) errors.name = 'That looks a little short.';
  else if (name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`;

  const email = value('email');
  const phone = value('phone');
  const phoneDigits = (phone.match(PHONE_DIGITS_RE) ?? []).length;

  // One of phone or email is required — many growers prefer to be called.
  if (!email && !phone) {
    errors.phone = 'Add a phone number or an email so we can reply.';
    errors.email = 'Add an email or a phone number so we can reply.';
  } else {
    if (email && !EMAIL_RE.test(email)) errors.email = 'That email address does not look right.';
    if (email && email.length > LIMITS.email) errors.email = 'That email address is too long.';
    if (phone && (phoneDigits < 7 || phoneDigits > 15)) {
      errors.phone = 'Please enter a complete phone number.';
    }
  }

  const message = value('message');
  if (!message) errors.message = 'A line or two about what you need helps us reply properly.';
  else if (message.length < 10) errors.message = 'Could you give us a little more detail?';
  else if (message.length > LIMITS.message) {
    errors.message = `Please keep this under ${LIMITS.message} characters.`;
  }

  if (value('company').length > LIMITS.company) errors.company = 'That is too long.';
  if (value('location').length > LIMITS.location) errors.location = 'That is too long.';
  if (value('requirement').length > LIMITS.requirement) errors.requirement = 'That is too long.';

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Collapses whitespace and trims every field. Run before sending or storing. */
export function normaliseEnquiry(data: Partial<EnquiryPayload>): EnquiryPayload {
  const clean = (v: unknown) => (v ?? '').toString().replace(/\s+/g, ' ').trim();
  return {
    name: clean(data.name),
    company: clean(data.company),
    phone: clean(data.phone),
    email: clean(data.email).toLowerCase(),
    location: clean(data.location),
    requirement: clean(data.requirement),
    // Message keeps its line breaks; only trailing whitespace goes.
    message: (data.message ?? '').toString().trim(),
    website: clean(data.website),
  };
}
