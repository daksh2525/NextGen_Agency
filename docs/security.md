# Security Requirements and Best Practices
**NextGen Agency — Software Development Agency Website**
**Version:** 2.2.0
**Status:** Active — Mandatory
**Last Updated:** 2026-11-03

---

> [!CAUTION]
> This document defines security requirements for the entire application. All contributors and AI agents must read and comply with these standards before implementing any feature involving user input, API communication, or data handling.

---

## Table of Contents
1. [Security Philosophy](#1-security-philosophy)
2. [Environment Variable Management](#2-environment-variable-management)
3. [Secret Protection](#3-secret-protection)
4. [Input Validation](#4-input-validation)
5. [Form Validation and Sanitization](#5-form-validation-and-sanitization)
6. [XSS Prevention](#6-xss-prevention)
7. [CSRF Considerations](#7-csrf-considerations)
8. [Secure API Communication](#8-secure-api-communication)
9. [Rate Limiting](#9-rate-limiting)
10. [Spam Prevention](#10-spam-prevention)
11. [Dependency Security](#11-dependency-security)
12. [Content Security Policy](#12-content-security-policy)
13. [Security Headers](#13-security-headers)
14. [Authentication Considerations](#14-authentication-considerations)
15. [Authorization Considerations](#15-authorization-considerations)
16. [File Upload Security](#16-file-upload-security)
17. [Privacy and Data Protection](#17-privacy-and-data-protection)
18. [Logging and Error Handling](#18-logging-and-error-handling)
19. [Secure Deployment](#19-secure-deployment)
20. [Security Testing Checklist](#20-security-testing-checklist)

---

## 1. Security Philosophy

This project follows a **minimal attack surface** approach:

- **No unnecessary backend infrastructure.** The website is primarily static. Server-side operations are limited to the contact form API route.
- **No unnecessary user data storage.** Visitor data is not stored. Contact form submissions are forwarded via email only (no database at MVP).
- **Defense in depth.** Multiple overlapping security controls rather than relying on a single mechanism.
- **Fail securely.** On errors, return safe generic messages — never expose internal state, stack traces, or system information.
- **Security by design.** Security requirements are considered at the architecture and design phase, not bolted on afterwards.

---

## 2. Environment Variable Management

### Rules

1. **ALL secrets live in environment variables only** — never in source code.
2. **`.env.local` must be in `.gitignore`** — it is never committed to the repository.
3. **`.env.example` is committed** with placeholder values only (no real credentials).
4. **Production secrets** are set via the Vercel Dashboard → Environment Variables.
5. **Client-side variables** use the `NEXT_PUBLIC_` prefix. Only non-sensitive values (site URL, GA measurement ID) may be prefixed.
6. **Server-side secrets** (Resend API key, email addresses, rate limiting tokens) must NEVER use the `NEXT_PUBLIC_` prefix.

### Variable Classification

| Variable | Exposure | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public (browser) | `https://nextgenagency.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public (browser) | `G-XXXXXXXXXX` |
| `RESEND_API_KEY` | Server only | `re_...` |
| `CONTACT_EMAIL_TO` | Server only | Email address |
| `CONTACT_EMAIL_FROM` | Server only | Verified sender email |
| `UPSTASH_REDIS_REST_URL` | Server only | Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | Server only | Redis token |
| `RECAPTCHA_SECRET_KEY` | Server only | reCAPTCHA secret |

### Verification Checklist
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets appear in `git log` or `git diff`
- [ ] No secrets in `next.config.ts` inline
- [ ] No secrets in any component, page, or utility file
- [ ] `NEXT_PUBLIC_` variables contain no sensitive information

---

## 3. Secret Protection

### What Constitutes a Secret
- API keys (Resend, GA, reCAPTCHA, Upstash)
- Email addresses used for routing (to/from)
- Internal service URLs not meant for public access
- Any token, password, or credential

### Prohibited Practices
```typescript
// ❌ NEVER do this — hardcoded API key in source code
const resend = new Resend('re_abc123_REAL_KEY');

// ❌ NEVER do this — NEXT_PUBLIC_ exposes to browser
const RESEND_API_KEY = process.env.NEXT_PUBLIC_RESEND_API_KEY;

// ✅ Correct — server-side only, env variable
const resend = new Resend(process.env.RESEND_API_KEY);
```

### Server-Side Only Enforcement
When using secrets in Next.js:
- Access them only in:
  - `/src/app/api/**/*.ts` (API routes — server only)
  - `generateStaticParams()` or `generateMetadata()` (server components)
  - Server Actions (`'use server'`)
- **Never** access `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, etc. in any `'use client'` component.

### Secret Rotation
- Rotate API keys immediately if a secret is accidentally committed.
- Steps on accidental commit:
  1. Revoke the exposed key immediately (Resend dashboard, etc.)
  2. Generate a new key
  3. Update in Vercel Dashboard
  4. Remove from git history using `git filter-branch` or BFG Repo Cleaner
  5. Force-push to remote

---

## 4. Input Validation

### Principle: Validate Everything, Trust Nothing

All user-submitted data must be validated **server-side** before any processing. Client-side validation is for UX only — it is never a security control.

### Zod Schema — Contact Form

```typescript
// /src/lib/validations.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  phone: z
    .string()
    .max(20, 'Phone number is too long')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional()
    .or(z.literal('')),

  service: z.enum([
    'web-development',
    'full-stack-development',
    'saas-development',
    'ai-ml-solutions',
    'rag-applications',
    'ai-agents',
    'mobile-development',
    'ecommerce-development',
    'backend-api-development',
    'ui-ux-design',
    'maintenance-support',
    'other',
  ], { errorMap: () => ({ message: 'Please select a valid service' }) }),

  budget: z
    .enum(['under-5k', '5k-15k', '15k-50k', '50k-plus', 'not-sure'])
    .optional(),

  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters'),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy to continue' }),
  }),

  honeypot: z.string().max(0, 'Bot detected'), // Must be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

### Server-Side Validation Pattern

```typescript
// /src/app/api/contact/route.ts
import { contactFormSchema } from '@/lib/validations';

export async function POST(request: Request) {
  const body = await request.json();

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { success: false, error: 'Invalid form data', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // Proceed only with validated data
  const data = result.data;
  // ...
}
```

---

## 5. Form Validation and Sanitization

### Client-Side (UX Layer)
- React Hook Form with Zod resolver for real-time validation feedback.
- Error messages must be specific enough to help the user, but not expose system internals.
- Required fields clearly indicated.

### Server-Side (Security Layer)
- Zod schema validation before any processing (see Section 4).
- Strip or reject unexpected fields.
- Maximum length enforcement on all string inputs.
- Enum validation for dropdown fields — only predefined values accepted.

### Sanitization for Email Delivery
Before sending form content via email:
- HTML-encode any user-provided text to prevent HTML injection in email body.
- Use a template literal approach that treats all user data as plain text within the email.
- Never pass raw user input into HTML email templates without encoding.

```typescript
// Safe email content — treat all user data as plain text
const emailText = `
New Contact Form Submission
===========================
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Service: ${data.service}
Budget: ${data.budget || 'Not specified'}
Message:
${data.message}
`;
```

---

## 6. XSS Prevention

### Next.js Default Protection
React and Next.js escape all values by default when rendering JSX. The primary XSS risk comes from:
- Using `dangerouslySetInnerHTML` with unsanitized content
- Rendering user-provided data via third-party libraries that bypass React's escaping

### Rules
1. **Never use `dangerouslySetInnerHTML`** unless the content is:
   - From a trusted CMS (future)
   - Sanitized with a library like `DOMPurify` before use
2. **Never interpolate user input into HTML strings** server-side without escaping.
3. **When a CMS is added** (post-MVP): Sanitize all rich-text HTML content before rendering.
4. **Content Security Policy** (see Section 12) provides an additional layer of protection.

### Safe Rendering Example
```typescript
// ✅ Safe — React escapes this automatically
<p>{userMessage}</p>

// ❌ Dangerous — do not use without sanitization
<p dangerouslySetInnerHTML={{ __html: userMessage }} />

// ✅ Safe if CMS is used (future)
import DOMPurify from 'dompurify';
<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cmsContent) }} />
```

---

## 7. CSRF Considerations

### Current Risk Level: Low
The site has only one API endpoint (contact form). It does not use cookie-based authentication, which is the primary CSRF attack vector.

### Mitigations Applied
1. **JSON content type check:** The contact API route only processes `Content-Type: application/json` bodies.
2. **Origin/Referer validation:** Optionally validate the `Origin` header matches the expected domain.
3. **CORS restriction:** API routes are restricted to the production domain only.
4. **No cookies for authentication at MVP:** CSRF via session hijacking is not applicable.

### If Authentication is Added (Future)
When implementing authentication:
- Use `SameSite=Strict` or `SameSite=Lax` cookies.
- Implement CSRF tokens for all state-mutating requests.
- Use Next.js's built-in CSRF protections.

---

## 8. Secure API Communication

### HTTPS Enforcement
- **All traffic must use HTTPS.** Vercel enforces this automatically.
- HTTP requests are redirected to HTTPS.
- Configure in `next.config.ts`:
  ```typescript
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
      }]
    }];
  }
  ```

### API Route Security
- Verify `Content-Type: application/json` before parsing request body.
- Limit request body size to prevent memory exhaustion (Next.js has a 4MB default limit — keep it).
- Return appropriate HTTP status codes:
  - `200`: Success
  - `400`: Validation error (client's fault)
  - `429`: Rate limit exceeded
  - `500`: Server error (generic message only)

### External Service Communication
- **Resend:** Server-side API calls only. API key in environment variables.
- **Upstash Redis:** Server-side only. URL and token in environment variables.
- All external API calls in try/catch blocks with fallback error handling.

---

## 9. Rate Limiting

### Purpose
Prevent:
- Contact form spam flooding
- Automated abuse of the API
- Email delivery cost abuse

### Implementation (MVP — Simple Approach)

**Recommended:** Upstash Redis with `@upstash/ratelimit`

```typescript
// /src/lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per IP per hour
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
  return { success, limit, reset, remaining };
}
```

**Usage in API route:**
```typescript
const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
const { success } = await checkRateLimit(`contact:${ip}`);
if (!success) {
  return Response.json(
    { success: false, error: 'Too many requests. Please try again later.' },
    { status: 429 }
  );
}
```

### Fallback (If Upstash Not Available at MVP)
Simple in-memory Map with IP tracking — not suitable for production at scale, but adequate for very early stages:

```typescript
// Simple fallback — only for dev/early MVP
const requests = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 5;
const WINDOW = 60 * 60 * 1000; // 1 hour
```

### Rate Limit Configuration
- Contact form: 5 submissions per IP per hour
- Error message on rate limit: "You've submitted too many requests. Please wait before trying again."
- HTTP status: `429 Too Many Requests`

---

## 10. Spam Prevention

### Primary Defense: Honeypot Field

A hidden field that legitimate users never fill out. Bots that auto-fill all fields will trigger this.

```html
<!-- HTML honeypot field — visually hidden, not accessible by users -->
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ display: 'none' }}
/>
```

**Server validation:**
```typescript
if (data.honeypot && data.honeypot.length > 0) {
  // Silently reject — return success to not alert bots
  return Response.json({ success: true, message: 'Thank you for your message.' });
}
```

### Secondary Defense: Rate Limiting
See Section 9.

### Tertiary Defense: reCAPTCHA v3 (Optional)
Add Google reCAPTCHA v3 if honeypot + rate limiting are insufficient:
- Invisible to users — runs in background
- Returns a score (0–1) — low score indicates bot
- Server-side verification of the score token
- Only enable if spam becomes a real problem — adds script overhead

### Timing Defense
Consider rejecting submissions that are completed extremely fast (< 3 seconds) — likely bots:
```typescript
// Optional: timestamp check
const submittedAt = Date.now();
if (submittedAt - formLoadTime < 3000) {
  // Likely a bot — reject silently
}
```

---

## 11. Dependency Security

### Package Selection Rules
1. Prefer well-maintained packages with large communities.
2. Check the package's last update date and open issues before adding.
3. Prefer packages with no known vulnerabilities (check `npm audit`).
4. Minimize dependencies — fewer dependencies = smaller attack surface.

### Vulnerability Scanning
- Run `pnpm audit` regularly and before every production deployment.
- Fix all high and critical vulnerabilities before deploying.
- Medium vulnerabilities: assess and fix within 7 days.
- Low vulnerabilities: document and track.

### Automated Scanning
- Use GitHub Dependabot for automated dependency vulnerability alerts.
- Enable Dependabot security updates to auto-create PRs for vulnerable packages.

### `.npmrc` Configuration
```ini
# Prevent installing packages with known vulnerabilities during install
audit=true
```

### Lock File Policy
- Always commit `pnpm-lock.yaml`.
- Use `pnpm install --frozen-lockfile` in CI/CD to prevent unexpected updates.
- Review lock file changes in pull requests — unexpected lock file changes can indicate a supply chain attack.

---

## 12. Content Security Policy

### CSP Configuration

Configure via `next.config.ts` headers:

```typescript
// next.config.ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://www.google-analytics.com;
  connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();
```

### CSP Notes
- `'unsafe-inline'` for scripts is required for Next.js hydration — this is a known trade-off. Use nonces in future for stricter CSP.
- `'unsafe-eval'` may be required by some Next.js features — review in production.
- If using reCAPTCHA, add `https://www.google.com` and `https://www.recaptcha.net` to `script-src` and `frame-src`.
- If using Hotjar/Clarity (future), update the CSP.

### Testing CSP
- Use the browser's Console to check for CSP violations during development.
- Use CSP Evaluator (Google's tool) to assess the policy strength.
- Use `Content-Security-Policy-Report-Only` header during initial testing.

---

## 13. Security Headers

All headers configured in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        // Strict Transport Security (HSTS)
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        // Prevent MIME type sniffing
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        // Prevent clickjacking
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        // XSS protection (legacy browsers)
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        // Referrer Policy
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        // Permissions Policy
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
        },
        // Content Security Policy
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    },
  ];
}
```

### Header Verification
After deployment, verify headers using:
- [SecurityHeaders.com](https://securityheaders.com)
- Target grade: A or A+

---

## 14. Authentication Considerations

### Current Status: No Authentication at MVP
The website is a public marketing website. No user accounts, login, or session management is required.

### If Authentication is Added in Future
When adding a client portal or admin area:

1. **Authentication Provider:** Use NextAuth.js (next-auth) — do not build custom auth.
2. **Password Policy:** Minimum 12 characters, breach detection via Have I Been Pwned API.
3. **Session Management:** HTTPOnly, Secure, SameSite=Lax cookies.
4. **Multi-Factor Authentication:** Require TOTP or email OTP.
5. **Account Lockout:** Lock account after 5 failed attempts for 15 minutes.
6. **Password Reset:** Time-limited tokens (15 minutes), single use only.
7. **JWT Tokens:** If used, sign with RS256, verify on every request, set short expiry.
8. **Never store plain-text passwords** — use bcrypt (cost factor ≥ 12) or Argon2.

---

## 15. Authorization Considerations

### Current Status: No Authorization at MVP
All website content is public. No role-based access control is needed.

### If Authorization is Added in Future
When adding admin features or client-specific content:

1. **Principle of Least Privilege:** Users receive the minimum permissions necessary.
2. **Server-Side Authorization:** Never rely on client-side checks alone. Validate permissions in API routes and server components.
3. **Route Protection:** Use Next.js middleware to protect `/admin/*` and `/dashboard/*` routes.
4. **API Authorization:** Every protected API route verifies the session token before processing.
5. **Role Definitions:** Define roles clearly (e.g., `admin`, `client`, `viewer`) and enforce them consistently.

---

## 16. File Upload Security

### Current Status: No File Uploads at MVP
The contact form does not support file attachments.

### If File Uploads are Added in Future (e.g., brief document upload):

1. **File Type Validation:**
   - Allowlist only permitted MIME types (e.g., `application/pdf`, `image/jpeg`)
   - Validate actual file content (magic bytes), not just extension or declared MIME type
2. **File Size Limit:** Enforce maximum size server-side (e.g., 5MB).
3. **Storage:** Upload to object storage (AWS S3, Cloudflare R2) — never to the filesystem.
4. **Virus Scanning:** Use a virus scanning API (ClamAV, VirusTotal) before storing.
5. **No Direct URL Access:** Serve files through signed, time-limited URLs.
6. **Never execute uploaded files:** Files are stored and served — never executed.
7. **Filename Sanitization:** Generate a new UUID-based filename — never use the client's original filename.

---

## 17. Privacy and Data Protection

### Data Minimization
- Collect only the data necessary for the stated purpose.
- Contact form collects: name, email, optional phone, optional company, service interest, optional budget, message.
- No tracking pixels other than GA4.
- No behavioral tracking at MVP (no Hotjar, Clarity, etc.).

### Data Retention
- Contact form submissions are forwarded via email — no data stored in a database at MVP.
- Email submissions are retained in the receiving email inbox per the business's email retention policy.
- If a database is added in future, define a clear data retention period.

### GDPR / Privacy Compliance
- **Privacy Policy** required: Link in footer. Must accurately describe what data is collected, why, and for how long.
- **Terms of Service** required.
- **Contact form consent checkbox** required: "I agree to the Privacy Policy and consent to being contacted."
- Consent must be opt-in (pre-ticked checkboxes are not GDPR-compliant).
- Provide a contact email for data subject requests (access, deletion, correction).

### Analytics
- Google Analytics 4 with IP anonymization enabled.
- Cookie consent banner required if targeting EU users (GDPR) or Californians (CCPA).
- Implement a basic cookie consent mechanism before going live in regulated markets.

---

## 18. Logging and Error Handling

### Logging Rules

1. **Never log PII** (personally identifiable information): names, emails, phone numbers, IP addresses in application logs.
2. **Never log request bodies** containing user-submitted form data.
3. **Do log** (safely): HTTP method, route, status code, duration.
4. **Error logging:** Log the error type and code — not user-submitted data.

### Error Response Rules

```typescript
// ❌ Never — exposes internal details
return Response.json({ error: error.stack }, { status: 500 });

// ❌ Never — exposes database/query details
return Response.json({ error: 'ECONNREFUSED 127.0.0.1:5432' }, { status: 500 });

// ✅ Correct — generic safe message
return Response.json(
  { success: false, error: 'Something went wrong. Please try again later.' },
  { status: 500 }
);
```

### Client-Side Error Boundaries
- Implement React error boundaries around interactive sections.
- Error boundaries show a user-friendly fallback UI — never raw error details.
- Log errors to a monitoring service (Sentry — post-MVP) for debugging.

### Server-Side Error Monitoring (Post-MVP)
- Add Sentry for server-side error tracking.
- Set up alerts for 5xx error spikes.
- Never configure Sentry to capture request bodies (personal data risk).

---

## 19. Secure Deployment

### Vercel Deployment Security

1. **Environment Variables:** Set via Vercel Dashboard only — never in code.
2. **Preview Deployments:** Restrict preview deployments to team members only (Vercel → Settings → Git → Deployment Protection).
3. **Build Logs:** Verify no secrets appear in Vercel build logs.
4. **Force HTTPS:** Enforced by Vercel automatically.
5. **Vercel Firewall (Optional):** Enable if DDoS or bot traffic becomes a problem.

### Pre-Deployment Security Checklist
- [ ] `pnpm audit` passes with no high/critical vulnerabilities
- [ ] No secrets in codebase (`git grep -r 'RESEND_API_KEY'` should return nothing relevant)
- [ ] `.env.local` not committed (`git ls-files .env.local` returns empty)
- [ ] Security headers configured in `next.config.ts`
- [ ] CSP configured and tested
- [ ] Contact form rate limiting active
- [ ] Honeypot field working
- [ ] HTTPS enforced

### Domain Security
- Enable domain lock at the registrar to prevent hijacking.
- Enable DNSSEC if supported by the registrar.
- Use a strong, unique password for the domain registrar account.
- Enable 2FA on the domain registrar and Vercel accounts.

---

## 20. Security Testing Checklist

Run this checklist before every production deployment:

### Environment and Secrets
- [ ] `git grep -rn 'API_KEY\|SECRET\|PASSWORD\|TOKEN' src/` — no real values returned
- [ ] `.env.local` not tracked by git
- [ ] All `NEXT_PUBLIC_*` variables contain no sensitive data
- [ ] Vercel environment variables configured

### Input Validation
- [ ] Contact form rejects empty required fields
- [ ] Contact form rejects invalid email format
- [ ] Contact form rejects messages over 2000 characters
- [ ] Contact form rejects unknown service values
- [ ] Honeypot field rejects submission when filled
- [ ] API returns 400 for malformed JSON body
- [ ] API returns 400 for missing required fields

### Rate Limiting
- [ ] Submitting more than 5 times returns 429
- [ ] Rate limit resets after the time window

### Headers
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `X-Frame-Options: DENY` present
- [ ] `Strict-Transport-Security` present
- [ ] `Referrer-Policy` present
- [ ] `Permissions-Policy` present
- [ ] CSP header present

### XSS
- [ ] Submit `<script>alert(1)</script>` in form fields — not executed
- [ ] Submit `"><img src=x onerror=alert(1)>` — not executed

### Error Handling
- [ ] API 500 errors return generic message only
- [ ] No stack traces visible in API responses
- [ ] No internal file paths visible in error responses

### Dependency Audit
- [ ] `pnpm audit` — no high or critical vulnerabilities

### HTTPS
- [ ] Site forces HTTPS redirect
- [ ] SSL certificate valid and not expiring within 30 days
- [ ] SecurityHeaders.com score: A or A+
