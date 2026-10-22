import { NextResponse } from 'next/server';
import { companyConfig } from '@/config/company';
import {
  hasErrors,
  normaliseEnquiry,
  validateEnquiry,
  type EnquiryPayload,
} from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enquiry endpoint.
 *
 * ---------------------------------------------------------------------------
 * THIS ROUTE NEVER PRETENDS AN ENQUIRY WAS DELIVERED.
 *
 * Delivery is configured through environment variables (see .env.example).
 * Two transports are implemented with no extra dependencies:
 *
 *   RESEND_API_KEY + ENQUIRY_FROM_EMAIL + ENQUIRY_TO_EMAIL
 *   ENQUIRY_WEBHOOK_URL (+ optional ENQUIRY_WEBHOOK_SECRET)
 *
 * If NEITHER is set, the route returns 503 with `code: "not_configured"`, and
 * the form tells the visitor plainly that the form is not live yet and gives
 * them the phone and WhatsApp number instead. That is the honest failure mode:
 * a silent "thank you" over a form that goes nowhere loses real enquiries.
 *
 * SMTP is the third option in .env.example and needs `nodemailer` — install it
 * and add a branch here if the client prefers their own mail server.
 * ---------------------------------------------------------------------------
 */

type DeliveryResult = { ok: true } | { ok: false; reason: string };

/** Crude per-IP throttle. Resets with the process — fine for a brochure site. */
const RATE_LIMIT = { windowMs: 60_000, max: 4 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: 'rate_limited', message: 'Too many enquiries. Please try again shortly.' },
      { status: 429 },
    );
  }

  let body: Partial<EnquiryPayload>;
  try {
    body = (await request.json()) as Partial<EnquiryPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'bad_request', message: 'Could not read that request.' },
      { status: 400 },
    );
  }

  const data = normaliseEnquiry(body);

  // Honeypot — bots fill every field they find. Accept and discard silently so
  // the bot gets no signal, but never claim a real delivery happened.
  if (data.website) {
    return NextResponse.json({ ok: true, code: 'received' }, { status: 200 });
  }

  const errors = validateEnquiry(data);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, code: 'validation_failed', errors },
      { status: 422 },
    );
  }

  const transport = chooseTransport();

  if (!transport) {
    return NextResponse.json(
      {
        ok: false,
        code: 'not_configured',
        message:
          'The enquiry form is not connected to a mail service yet, so this message was not sent.',
        fallback: {
          phone: companyConfig.phone,
          phoneHref: companyConfig.phoneHref,
          whatsappHref: companyConfig.whatsappHref,
        },
      },
      { status: 503 },
    );
  }

  const result =
    transport === 'resend' ? await deliverViaResend(data) : await deliverViaWebhook(data);

  if (!result.ok) {
    // Log for the operator; never leak transport detail to the browser.
    console.error('[enquiry] delivery failed:', result.reason);
    return NextResponse.json(
      {
        ok: false,
        code: 'delivery_failed',
        message: 'We could not send that just now.',
        fallback: {
          phone: companyConfig.phone,
          phoneHref: companyConfig.phoneHref,
          whatsappHref: companyConfig.whatsappHref,
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, code: 'sent' }, { status: 200 });
}

function chooseTransport(): 'resend' | 'webhook' | null {
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL && process.env.ENQUIRY_TO_EMAIL) {
    return 'resend';
  }
  if (process.env.ENQUIRY_WEBHOOK_URL) return 'webhook';
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function asHtml(data: EnquiryPayload): string {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Company', data.company],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Location', data.location],
    ['Requirement', data.requirement],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return [
    '<h2>New enquiry — Burma Teak Plant</h2>',
    '<table cellpadding="6" style="border-collapse:collapse">',
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="color:#555">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    '</table>',
    '<h3>Message</h3>',
    `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
  ].join('');
}

async function deliverViaResend(data: EnquiryPayload): Promise<DeliveryResult> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [process.env.ENQUIRY_TO_EMAIL],
        // Replying goes straight to the grower, not into a shared inbox.
        reply_to: data.email || undefined,
        subject: `Enquiry — ${data.name}${data.requirement ? ` — ${data.requirement}` : ''}`,
        html: asHtml(data),
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: `resend ${response.status}: ${await response.text()}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `resend threw: ${String(error)}` };
  }
}

async function deliverViaWebhook(data: EnquiryPayload): Promise<DeliveryResult> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.ENQUIRY_WEBHOOK_SECRET) {
      headers.Authorization = `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}`;
    }

    const response = await fetch(process.env.ENQUIRY_WEBHOOK_URL as string, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source: 'burmateakplant.com',
        receivedAt: new Date().toISOString(),
        ...data,
        website: undefined,
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: `webhook ${response.status}` };
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: `webhook threw: ${String(error)}` };
  }
}
