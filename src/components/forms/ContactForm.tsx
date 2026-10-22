'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useRef, useState } from 'react';
import {
  emptyEnquiry,
  hasErrors,
  LIMITS,
  REQUIREMENT_OPTIONS,
  validateEnquiry,
  type EnquiryPayload,
  type FieldErrors,
} from '@/lib/validation';
import { companyConfig } from '@/config/company';
import { Check, MessageCircle, Phone } from '@/lib/icons';
import { EASE_CINEMATIC } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'not_configured' }
  | { kind: 'error'; message: string };

/**
 * Enquiry form.
 *
 * Validates on blur and on submit, never on every keystroke — nagging someone
 * mid-word about an incomplete email is the fastest way to lose them.
 *
 * The one state worth calling out is `not_configured`: when no mail transport
 * is set up, the form says so and hands over the phone and WhatsApp number
 * rather than showing a thank-you over a message that went nowhere.
 */
export function ContactForm({ onDark = false }: { onDark?: boolean }) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryPayload>(emptyEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const firstErrorRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof EnquiryPayload) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors(validateEnquiry({ ...values, [key]: value }));
    }
  };

  const blur = (key: keyof EnquiryPayload) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validateEnquiry(values));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const found = validateEnquiry(values);
    setErrors(found);
    setTouched({
      name: true,
      company: true,
      phone: true,
      email: true,
      location: true,
      requirement: true,
      message: true,
    });

    if (hasErrors(found)) {
      firstErrorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setStatus({ kind: 'submitting' });

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        message?: string;
        errors?: FieldErrors;
      };

      if (response.ok && payload.ok) {
        setStatus({ kind: 'sent' });
        setValues(emptyEnquiry());
        setTouched({});
        return;
      }

      if (payload.code === 'not_configured') {
        setStatus({ kind: 'not_configured' });
        return;
      }

      if (payload.code === 'validation_failed' && payload.errors) {
        setErrors(payload.errors);
        setStatus({ kind: 'idle' });
        return;
      }

      setStatus({
        kind: 'error',
        message: payload.message ?? 'Something went wrong. Please try again.',
      });
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not reach the server. Please check your connection and try again.',
      });
    }
  };

  if (status.kind === 'sent') {
    return <SuccessPanel onReset={() => setStatus({ kind: 'idle' })} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn(onDark && 'on-dark')}>
      <div ref={firstErrorRef} className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          label="Name"
          required
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={set('name')}
          onBlur={blur('name')}
          autoComplete="name"
          maxLength={LIMITS.name}
        />
        <Field
          id={`${uid}-company`}
          label="Company"
          value={values.company}
          error={touched.company ? errors.company : undefined}
          onChange={set('company')}
          onBlur={blur('company')}
          autoComplete="organization"
          maxLength={LIMITS.company}
        />
        <Field
          id={`${uid}-phone`}
          label="Phone"
          type="tel"
          value={values.phone}
          error={touched.phone ? errors.phone : undefined}
          onChange={set('phone')}
          onBlur={blur('phone')}
          autoComplete="tel"
          maxLength={LIMITS.phone}
          hint="Phone or email — either is enough"
        />
        <Field
          id={`${uid}-email`}
          label="Email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={set('email')}
          onBlur={blur('email')}
          autoComplete="email"
          maxLength={LIMITS.email}
        />
        <Field
          id={`${uid}-location`}
          label="Location"
          value={values.location}
          error={touched.location ? errors.location : undefined}
          onChange={set('location')}
          onBlur={blur('location')}
          maxLength={LIMITS.location}
          hint="District or state helps us advise on species"
        />

        <div>
          <label htmlFor={`${uid}-requirement`} className="field-label">
            Requirement
          </label>
          <select
            id={`${uid}-requirement`}
            value={values.requirement}
            onChange={(e) => set('requirement')(e.target.value)}
            onBlur={blur('requirement')}
            className="field-input appearance-none"
          >
            <option value="">Select one</option>
            {REQUIREMENT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Field
            id={`${uid}-message`}
            label="Message"
            required
            multiline
            value={values.message}
            error={touched.message ? errors.message : undefined}
            onChange={set('message')}
            onBlur={blur('message')}
            maxLength={LIMITS.message}
            hint="Acreage, timeline, soil type — whatever you already know"
          />
        </div>

        {/* Honeypot. Hidden from sight and from assistive technology. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website ?? ''}
            onChange={(e) => set('website')(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className={cn('btn', onDark ? 'btn-gold' : 'btn-primary', 'disabled:opacity-60')}
        >
          {status.kind === 'submitting' ? 'Sending…' : 'Submit Enquiry'}
        </button>

        <p className={cn('text-xs', onDark ? 'text-sand/50' : 'text-forest-mid/55')}>
          We reply to every enquiry. Usually within two working days.
        </p>
      </div>

      <AnimatePresence>
        {(status.kind === 'error' || status.kind === 'not_configured') && (
          <motion.div
            role="alert"
            className={cn(
              'mt-8 border-l-2 p-6',
              onDark ? 'border-gold bg-bone/5' : 'border-teak bg-teak/5',
            )}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
          >
            {status.kind === 'not_configured' ? (
              <>
                <p className={cn('font-display text-xl', onDark ? 'text-bone' : 'text-forest-deep')}>
                  This form is not live yet.
                </p>
                <p className={cn('mt-2 text-sm', onDark ? 'text-sand/75' : 'text-forest-mid/75')}>
                  Your message has <strong>not</strong> been sent. Until the enquiry inbox is
                  connected, please reach us directly — we answer both.
                </p>
              </>
            ) : (
              <>
                <p className={cn('font-display text-xl', onDark ? 'text-bone' : 'text-forest-deep')}>
                  That did not go through.
                </p>
                <p className={cn('mt-2 text-sm', onDark ? 'text-sand/75' : 'text-forest-mid/75')}>
                  {status.message} You can also reach us directly:
                </p>
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-5">
              <a
                href={companyConfig.phoneHref}
                className={cn(
                  'link-underline inline-flex items-center gap-2 text-sm',
                  onDark ? 'text-bone' : 'text-forest-deep',
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {companyConfig.phone}
              </a>
              <a
                href={companyConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'link-underline inline-flex items-center gap-2 text-sm',
                  onDark ? 'text-bone' : 'text-forest-deep',
                )}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = 'text',
  required = false,
  multiline = false,
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  hint?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  maxLength?: number;
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
    .filter(Boolean)
    .join(' ');

  const shared = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy || undefined,
    'aria-required': required || undefined,
    className: 'field-input',
    maxLength,
  };

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-teak" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className="field-input resize-y" />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs opacity-50">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      role="status"
      className="flex flex-col items-start gap-6 border-l-2 border-gold bg-gold/5 p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-forest-deep">
        <Check className="h-7 w-7" aria-hidden="true" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-display text-3xl text-forest-deep">Thank you — that is with us.</h3>
        <p className="mt-3 max-w-measure text-forest-mid/75">
          We read every enquiry ourselves and will come back to you, usually within two working
          days. If it is urgent, {companyConfig.phone} reaches us faster.
        </p>
      </div>
      <button type="button" onClick={onReset} className="btn btn-outline">
        Send Another
      </button>
    </motion.div>
  );
}
