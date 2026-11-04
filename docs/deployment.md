# Deployment Guide
**NextGen Agency — Software Development Agency Website**
**Version:** 2.2.0
**Status:** Production-Ready
**Last Updated:** 2026-11-04

---

## Table of Contents
1. [Overview](#1-overview)
2. [Prerequisites & Requirements](#2-prerequisites--requirements)
3. [Environment Variables](#3-environment-variables)
4. [Pre-Deployment Verification Checklist](#4-pre-deployment-verification-checklist)
5. [Primary Option: Vercel Deployment (Recommended)](#5-primary-option-vercel-deployment-recommended)
6. [Resend Email Domain Verification (DNS)](#6-resend-email-domain-verification-dns)
7. [Custom Domain Setup](#7-custom-domain-setup)
8. [Alternative Option: Docker / Self-Hosted VPS](#8-alternative-option-docker--self-hosted-vps)
9. [Post-Deployment Verification](#9-post-deployment-verification)
10. [CI/CD Workflow & Branching](#10-cicd-workflow--branching)
11. [Troubleshooting & Rollbacks](#11-troubleshooting--rollbacks)

---

## 1. Overview

NextGen Agency is built on **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TypeScript strict mode**, featuring procedural Three.js WebGL and GSAP ScrollTrigger animations.

The website is designed for **Edge / Serverless deployment**:
- **Static Assets & Pages:** Cached globally on CDN Edge nodes for sub-second load times worldwide (India, US, UK, Canada, Australia).
- **Serverless API Routes:** `/api/contact` handles contact form submissions on demand without maintaining an active VPS.
- **WebGL & Client Graphics:** Execute client-side via hardware acceleration.

---

## 2. Prerequisites & Requirements

Before deploying, ensure you have:
1. **GitHub Repository Access:** The codebase is hosted at:
   ```
   https://github.com/daksh2525/NextGen_Agency.git
   ```
2. **Package Manager:** `pnpm` (version 10+ or 12.x). Always deploy using `pnpm-lock.yaml`.
3. **Node.js Runtime:** Node 20.x or 22.x LTS.
4. **Third-Party Service Accounts:**
   - [Vercel Account](https://vercel.com) (free or pro)
   - [Resend Account](https://resend.com) for transactional lead emails
   - Domain registrar account (Namecheap, GoDaddy, Cloudflare, etc.)

---

## 3. Environment Variables

Configure these variables in your deployment hosting dashboard (Vercel Project Settings → Environment Variables):

| Variable Name | Environment | Required | Description | Example |
|---------------|-------------|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Production & Preview | **Yes** | Canonical URL of the live site | `https://nextgenagency.com` |
| `NEXT_PUBLIC_SITE_NAME` | Production & Preview | **Yes** | Site name for OpenGraph metadata | `NextGen Agency` |
| `RESEND_API_KEY` | Production & Preview | **Yes** | Secret API key from Resend | `re_123456789abcdef` |
| `CONTACT_EMAIL_TO` | Production & Preview | **Yes** | Agency inbox receiving lead submissions | `leads@nextgenagency.com` |
| `CONTACT_EMAIL_FROM` | Production & Preview | **Yes** | Verified sender email on Resend | `onboarding@resend.dev` or `noreply@nextgenagency.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | Optional | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `UPSTASH_REDIS_REST_URL` | Production | Optional | Upstash Redis URL for distributed rate limiting | `https://...upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | Production | Optional | Upstash Redis REST Token | `AX...` |

> [!CAUTION]
> Never commit `.env.local` to Git. Only `.env.example` belongs in the repository.

---

## 4. Pre-Deployment Verification Checklist

Run these commands locally inside the project directory before triggering a production release:

```bash
# 1. Verify TypeScript types (must exit with 0 errors)
pnpm exec tsc --noEmit

# 2. Verify ESLint rules
pnpm exec eslint

# 3. Test production build locally
pnpm build
```

Verify that:
- ✅ `tsc --noEmit` exits with **0 errors**.
- ✅ `eslint` exits with **0 errors and 0 warnings**.
- ✅ `pnpm build` completes and generates the `.next` production bundle.

---

## 5. Primary Option: Vercel Deployment (Recommended)

Vercel is the native platform for Next.js, providing automatic SSL, Edge CDN caching, image optimization, and serverless API execution.

### Step-by-Step Vercel Setup:

1. **Log in to Vercel:** Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. **Import Project:**
   - Click **"Add New..."** → **"Project"**.
   - Search for `daksh2525/NextGen_Agency`.
   - Click **"Import"**.
3. **Configure Build Settings:**
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./` (default)
   - **Build Command:** `pnpm build` (or leave default Next.js build)
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
4. **Add Environment Variables:**
   Expand the **"Environment Variables"** section and paste the values from Section 3:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `NEXT_PUBLIC_SITE_NAME` = `NextGen Agency`
   - `RESEND_API_KEY` = `re_...`
   - `CONTACT_EMAIL_TO` = `your-email@domain.com`
   - `CONTACT_EMAIL_FROM` = `noreply@your-domain.com` (or `onboarding@resend.dev` for testing)
5. **Deploy:**
   Click **"Deploy"**. Vercel will build the project and output a live preview URL (e.g. `https://nextgen-agency-xxx.vercel.app`).

---

## 6. Resend Email Domain Verification (DNS)

To send lead submission emails from your agency domain (e.g. `noreply@nextgenagency.com`) instead of the sandbox `onboarding@resend.dev`:

1. Go to [resend.com/domains](https://resend.com/domains).
2. Click **"Add Domain"** and enter your domain (e.g. `nextgenagency.com`).
3. Resend will provide 3 DNS records:
   - **DKIM (CNAME):** `resend._domainkey.nextgenagency.com`
   - **SPF (TXT / MX):** `bounces.nextgenagency.com`
   - **DMARC (TXT):** `_dmarc.nextgenagency.com`
4. Add these records in your DNS provider (Cloudflare / Namecheap / GoDaddy).
5. Click **"Verify DNS Records"** in Resend.
6. Once status shows **"Verified"**, update your Vercel environment variable:
   ```
   CONTACT_EMAIL_FROM=NextGen Agency <noreply@nextgenagency.com>
   ```

---

## 7. Custom Domain Setup

To connect your custom domain (e.g. `nextgenagency.com`):

1. In the Vercel Dashboard, navigate to your project → **Settings** → **Domains**.
2. Enter your domain: `nextgenagency.com` (and check the box to redirect `www.nextgenagency.com` to `nextgenagency.com`).
3. Update your DNS records at your registrar:
   - **Root Domain (`@`):**
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **Subdomain (`www`):**
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
4. Vercel will automatically provision a free Let's Encrypt SSL/TLS certificate.
5. Verification takes between 2 to 60 minutes depending on DNS propagation.

---

## 8. Alternative Option: Docker / Self-Hosted VPS

If deploying to AWS EC2, DigitalOcean Droplet, Hetzner, or a custom VPS:

### Step 1: Enable Standalone Output
In `next.config.ts`, verify or add:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... rest of config
};
```

### Step 2: Create Dockerfile (in project root)
```dockerfile
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Step 3: Run with Docker Compose
```yaml
services:
  nextgen:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SITE_URL=https://nextgenagency.com
      - NEXT_PUBLIC_SITE_NAME=NextGen Agency
      - RESEND_API_KEY=re_your_key_here
      - CONTACT_EMAIL_TO=hello@nextgenagency.com
      - CONTACT_EMAIL_FROM=noreply@nextgenagency.com
```

Run:
```bash
docker compose up -d --build
```
Place Nginx or Caddy in front of port 3000 to manage SSL termination.

---

## 9. Post-Deployment Verification

Once deployed, complete this sanity check:

1. **Homepage Loading:**
   - Verify Prisma Hero 3D glass dispersion renders smoothly.
   - Verify sound, mouse drag, and touch gestures.
2. **In-Page Navigation:**
   - Click each item in the liquid glass navbar: `Home`, `Services`, `Process`, `Portfolio`, `Tech`, `About`.
   - Verify smooth scrolling with the 90px offset (headers must not be hidden behind the floating navbar).
   - Verify that active liquid pill indicator updates via scrollspy.
3. **Horizontal Process Timeline:**
   - Scroll through `#process` and ensure the GSAP timeline pins smoothly and slides all 7 steps with illuminated nodes.
4. **Agentic Factory 3D:**
   - Verify Three.js procedural machine renders, stations can be clicked, and cameras switch properly.
5. **Contact Form Submission (End-to-End Test):**
   - Fill out the form at `#contact` with a test email and message.
   - Submit and check for the green success toast.
   - Verify that the test email arrives in the configured `CONTACT_EMAIL_TO` inbox.
6. **SEO & Meta Verification:**
   - Visit `https://your-domain.com/sitemap.xml` → Verify clean XML output.
   - Visit `https://your-domain.com/robots.txt` → Verify proper crawl directives.

---

## 10. CI/CD Workflow & Branching

The repository uses Git-based automated deployments:
- **`main` Branch:** Deploys automatically to **Production** on every `git push origin main`.
- **Feature Branches / Pull Requests:** Vercel automatically creates an isolated **Preview Deployment** with a unique URL for review before merging.

### Release Workflow:
```bash
# 1. Create a feature branch
git checkout -b feat/new-feature

# 2. Make changes and verify
pnpm exec tsc --noEmit
pnpm exec eslint

# 3. Commit and push
git commit -m "feat: implement new capability"
git push origin feat/new-feature

# 4. Open PR on GitHub -> Review preview link -> Merge to main
```

---

## 11. Troubleshooting & Rollbacks

### 1. Instant Rollback (Zero Downtime)
If an issue occurs in production:
1. Open the [Vercel Dashboard](https://vercel.com).
2. Go to your project → **Deployments**.
3. Locate the previous stable deployment.
4. Click the three dots `...` → **"Promote to Production"**.
5. Rollback completes instantly in < 5 seconds.

### 2. Contact Form Returns Error (500)
- **Check Resend API Key:** Verify `RESEND_API_KEY` is present in Vercel Environment Variables.
- **Check Sender Email:** If using a custom domain for `CONTACT_EMAIL_FROM`, ensure the domain status in Resend is **Verified**. If unverified, temporarily use `onboarding@resend.dev`.

### 3. Fonts Fail to Load in Offline/Restricted Build
- Next.js uses `next/font/google`. Ensure the build server has outgoing HTTPS access to `fonts.googleapis.com` (Vercel has this by default).

### 4. CSP Violation Warnings
- Security headers are defined in `next.config.ts`. If adding new external CDNs or analytics, update the `ContentSecurityPolicy` string in `next.config.ts` accordingly.
