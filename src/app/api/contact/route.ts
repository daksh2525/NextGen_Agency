import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';

// ─── Simple in-memory rate limiter (per IP, per minute) ─────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

// ─── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(request: Request): Promise<NextResponse> {
  // Get client IP from headers (works behind Vercel / Cloudflare proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 },
    );
  }

  // Validate with Zod
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot check — if website field is non-empty, silently succeed
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO ?? 'hello@nextgenagency.dev';

  if (resendKey) {
    try {
      const emailBody = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone ?? '—'}`,
        `Company: ${data.company ?? '—'}`,
        `Service: ${data.service}`,
        `Budget: ${data.budget ?? '—'}`,
        ``,
        `Message:`,
        data.message,
      ].join('\n');

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'NextGen Agency Contact <noreply@nextgenagency.dev>',
          to: [toEmail],
          reply_to: data.email,
          subject: `New Project Enquiry from ${data.name} — ${data.service}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('[contact] Resend error:', err);
        // Don't expose email errors to the client — still return success
      }
    } catch (err) {
      console.error('[contact] Email send failed:', err);
      // Graceful degradation — contact data was received, email will be retried manually
    }
  } else {
    // Dev mode — log the submission
    console.log('[contact] New submission (no RESEND_API_KEY):', {
      name: data.name,
      email: data.email,
      service: data.service,
      budget: data.budget,
    });
  }

  return NextResponse.json({ success: true });
}
