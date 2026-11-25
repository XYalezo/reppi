import { NextResponse } from 'next/server';
import { enquirySchema, fieldErrors, serviceLabel } from '@/lib/enquiry';
import { mailerConfigured, sendEnquiry } from '@/lib/mailer';
import { allow } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const maxBytes = 20_000;
const unavailable = 'Enquiries cannot be sent right now. Please contact us by phone, WhatsApp or email.';

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || 'unknown';
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ');
}

export async function POST(request: Request) {
  if (Number(request.headers.get('content-length') ?? 0) > maxBytes) {
    return NextResponse.json({ error: 'The enquiry is too large.' }, { status: 413 });
  }
  if (!allow(clientKey(request))) {
    return NextResponse.json(
      { error: 'Too many enquiries from this connection. Please try again later or contact us by phone, WhatsApp or email.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'The enquiry could not be read.' }, { status: 400 });
  }

  const trap = (body as { website?: unknown } | null)?.website;
  if (typeof trap === 'string' && trap.trim() !== '') return NextResponse.json({ ok: true });

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 422 });

  if (!mailerConfigured()) {
    console.error('Enquiry received but SMTP settings are not configured');
    return NextResponse.json({ error: unavailable }, { status: 503 });
  }

  const { name, email, phone, service, message } = parsed.data;
  try {
    await sendEnquiry({
      subject: singleLine(`Website enquiry: ${serviceLabel(service)} from ${name}`),
      replyTo: email,
      text: [
        `Name: ${singleLine(name)}`,
        `Email: ${email}`,
        `Phone: ${phone ? singleLine(phone) : 'not given'}`,
        `About: ${serviceLabel(service)}`,
        '',
        message,
      ].join('\n'),
    });
  } catch (error) {
    console.error('Enquiry could not be sent', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: unavailable }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
