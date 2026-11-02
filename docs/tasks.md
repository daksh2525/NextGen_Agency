# Development Roadmap and Task Tracking
**NextGen Agency — Software Development Agency Website**
**Version:** 2.0.0
**Status:** Phase 3 — Polish & Optimization (ACTIVE)
**Last Updated:** 2026-11-02 — Full codebase audit complete. Build passes. Docs synced.

---

## Legend
- [ ] Pending
- [~] In Progress
- [x] Completed & Verified
- [!] Blocked

**Priority:** P0 = Critical / P1 = High / P2 = Medium / P3 = Low

---

## Phase 1 — Foundation
**Status:** ✅ COMPLETE

### 1.1 Project Initialization
- [x] **1.1.1** — Next.js 16.4.3 initialized (App Router, TypeScript, Tailwind v4, ESLint, src/ dir, `@/*` alias)
- [x] **1.1.2** — pnpm 12.16.1 configured as package manager (`pnpm-lock.yaml` exists)
- [x] **1.1.3** — All core dependencies installed: framer-motion, lucide-react, react-hook-form, zod, @hookform/resolvers, clsx, tailwind-merge, class-variance-authority, resend
- [ ] **1.1.4** — ESLint and Prettier fully configured (ESLint exists via next, Prettier not configured)
- [ ] **1.1.5** — Husky + lint-staged (not installed — P3, optional for MVP)
- [ ] **1.1.6** — Git repository initialized (not verified — check manually)

### 1.2 Folder Structure
- [x] **1.2.1** — Full directory structure created: `src/components/{atoms,molecules,organisms}`, `src/data/`, `src/hooks/`, `src/lib/`, `src/types/`
- [ ] **1.2.2** — `public/images/` subdirectories missing (og/, team/, services/, portfolio/ not created)

### 1.3 Design System & Configuration
- [x] **1.3.1** — Tailwind v4 `@theme` design tokens in `src/app/globals.css` (all brand colors, fonts, shadows, radii)
- [x] **1.3.2** — `next.config.ts` configured (security headers, CSP, redirects)
- [x] **1.3.3** — Fonts: Manrope (headings) + Inter (body) loaded via `next/font/google` in `layout.tsx`
- [x] **1.3.4** — `.env.example` and `.env.local` created
- [x] **1.3.5** — Global utility classes defined (`.container-site`, `.section-padding`, `.grid-bg`, `.text-gradient`, `.noise-bg`, `.gradient-border`)

### 1.4 TypeScript Types
- [x] **1.4.1** — `src/types/common.ts` — NavLink, NavItem, Benefit, ProcessStep, SeoMeta
- [x] **1.4.2** — `src/types/service.ts` — Service interface
- [x] **1.4.3** — `src/types/portfolio.ts` — Project, CaseStudy interfaces
- [x] **1.4.4** — `src/types/team.ts` — TeamMember interface

### 1.5 Data Files
- [x] **1.5.1** — `src/data/services.ts` — 11 services with full data (slugs, descriptions, deliverables, technologies, benefits, process)
- [x] **1.5.2** — `src/data/navigation.ts` — Nav items + footer links
- [x] **1.5.3** — `src/data/faqs.ts` — 8 real FAQ entries
- [x] **1.5.4** — `src/data/industries.ts` — 8 industries
- [x] **1.5.5** — `src/data/technologies.ts` — 6 tech categories
- [x] **1.5.6** — `src/data/team.ts` — 2 placeholder entries (clearly marked TODO)
- [x] **1.5.7** — `src/data/portfolio.ts` — Empty array (correct — no fake projects)
- [x] **1.5.8** — `src/data/testimonials.ts` — Empty array (correct — no fake testimonials)

### 1.6 Lib & Hooks
- [x] **1.6.1** — `src/lib/utils.ts` — cn(), generateSlug(), truncate(), formatDate()
- [x] **1.6.2** — `src/lib/animations.ts` — All Framer Motion variants and spring configs
- [x] **1.6.3** — `src/lib/validations.ts` — Zod contact form schema (Zod v4 API compatible)
- [x] **1.6.4** — `src/lib/seo.ts` — generatePageMetadata() helper
- [x] **1.6.5** — `src/hooks/useReducedMotion.ts` — Wraps framer-motion's useReducedMotion (fixed: was incorrectly importing from React)
- [x] **1.6.6** — `src/hooks/useScrollY.ts` — Scroll position hook for Navbar

---

## Phase 2 — Core UI Components
**Status:** ✅ COMPLETE

### 2.1 Atoms
- [x] **2.1.1** — `Button` — CVA variants (primary, secondary, secondary-dark, ghost, ghost-dark, outline), sizes (sm, md, lg), loading state, leftIcon/rightIcon
- [x] **2.1.2** — `Badge` — variants (orange, muted, outline)
- [x] **2.1.3** — `SectionHeading` — eyebrow, heading, description, align, level, theme, animated, id props

### 2.2 Molecules
- [x] **2.2.1** — `ServiceCard` — Bento card with icon map, hover glow, arrow, link overlay
- [x] **2.2.2** — `ProjectCard` — Image zoom hover, coming-soon state
- [x] **2.2.3** — `FAQAccordion` — Accessible accordion, AnimatePresence height animation, dark/light theme

### 2.3 Organisms
- [x] **2.3.1** — `Navbar` — Glassmorphism, scroll-triggered BG, dropdown menus, mobile slide-in menu, body scroll lock
- [x] **2.3.2** — `HeroSection` — scroll-scrubbed Canvas image-sequence animation (176 JPEG frames), fade-in entrance, reduced-motion static fallback (replaces CSS device mockups + 3D parallax)
- [x] **2.3.3** — `ServicesGrid` — Bento grid, all 11 services, stagger animation
- [x] **2.3.4** — `WhyChooseUs` — Interactive AgencyBentoGrid (team interactive grid, 100+ stat, partner marquee, tech marquee, client testimonial), light background
- [x] **2.3.5** — `ProcessSection` — Interactive 360-degree RadialScrollGallery (GSAP ScrollTrigger), 7-step process, dark background
- [x] **2.3.6** — `TechnologiesSection` — Light background, animated 4-row ToolchainMarquee (Frontend, Backend, AI/ML, DevOps) with play/pause and reduced-motion support
- [x] **2.3.7** — `IndustriesSection` — Dark background, 8 industry cards, icon map
- [x] **2.3.8** — `TeamSection` — 2 founder cards, placeholder-aware, geometric decorations, inline LinkedIn SVG
- [x] **2.3.9** — `PortfolioSection` — Empty state (no fake data), stagger when populated
- [x] **2.3.10** — `FAQSection` — Wraps FAQAccordion, dark bg, contact CTA
- [x] **2.3.11** — `ContactSection` — Dark CTA card, orange radial glow
- [x] **2.3.12** — `ContactForm` — React Hook Form + Zod, honeypot, loading/success/error states, all fields
- [x] **2.3.13** — `Footer` — 4-column, service/company/legal links, inline social SVG icons, copyright

---

## Phase 3 — App Pages & API
**Status:** ✅ MOSTLY COMPLETE — SEO/meta assets missing

### 3.1 Root Layout & Homepage
- [x] **3.1.1** — `src/app/layout.tsx` — Manrope + Inter fonts, Navbar, Footer, root metadata, accessible main id
- [x] **3.1.2** — `src/app/page.tsx` — All homepage sections composed in correct order
- [x] **3.1.3** — `src/app/globals.css` — Complete design tokens and global styles
- [x] **3.1.4** — `src/app/not-found.tsx` — Custom 404 with brand
- [x] **3.1.5** — `src/app/error.tsx` — Custom error boundary with brand

### 3.2 Service Pages
- [x] **3.2.1** — `src/app/services/page.tsx` — All 11 services listed
- [x] **3.2.2** — `src/app/services/[slug]/page.tsx` — Dynamic route with generateStaticParams, deliverables, benefits, CTA

### 3.3 Portfolio Pages
- [x] **3.3.1** — `src/app/portfolio/page.tsx` — Empty state
- [x] **3.3.2** — `src/app/portfolio/[slug]/page.tsx` — Dynamic (force-dynamic, returns 404 while empty)

### 3.4 Other Inner Pages
- [x] **3.4.1** — `src/app/technologies/page.tsx`
- [x] **3.4.2** — `src/app/industries/page.tsx`
- [x] **3.4.3** — `src/app/about/page.tsx` — Mission, team, CTA
- [x] **3.4.4** — `src/app/contact/page.tsx` — ContactForm + info sidebar
- [x] **3.4.5** — `src/app/privacy-policy/page.tsx`
- [x] **3.4.6** — `src/app/terms-of-service/page.tsx`
- [ ] **3.4.7** — `src/app/industries/[slug]/page.tsx` — Individual industry pages (NOT BUILT — P2)

### 3.5 API Routes
- [x] **3.5.1** — `src/app/api/contact/route.ts` — POST handler, honeypot check, Zod validation, rate limiting, Resend email

### 3.6 SEO & Meta Assets
- [x] **3.6.1** — `src/app/sitemap.ts` — App Router sitemap (generates /sitemap.xml, includes all service + industry routes)
- [x] **3.6.2** — `src/app/robots.ts` — App Router robots.txt (allows all, disallows /api/, /\_next/)
- [x] **3.6.3** — `src/app/opengraph-image.tsx` — Dynamic OG image via ImageResponse (edge runtime, 1200×630)
- [ ] **3.6.4** — Page-level metadata review — ensure all pages use generatePageMetadata() consistently (P1)

---

## Phase 4 — Interactions & Animations
**Status:** ✅ MOSTLY COMPLETE

- [x] **4.1** — Navbar: scroll-triggered background, dropdown AnimatePresence, mobile menu
- [x] **4.2** — Hero: premium interactive 3D scene (`NextGen3DScene`, `LaptopModel`, `SmartphoneModel`, `ScreenContent`, `SceneLighting`) — Three.js + R3F + Drei, mouse parallax, idle float, transparent Canvas, NEXTGEN UI textures
- [x] **4.3** — Scroll entrance animations: fadeUp, fadeIn, staggerContainer used across all sections
- [x] **4.4** — Hover animations: service cards, industry cards, process steps, footer social icons
- [x] **4.5** — FAQ accordion: smooth height animation with AnimatePresence
- [x] **4.6** — Contact form: loading state, success animation, error state, field-level error messages
- [ ] **4.7** — Page transition animations (between routes) — P3, optional

---

## Phase 5 — Optimization & Quality
**Status:** ⚠️ IN PROGRESS

- [x] **5.1** — TypeScript strict mode — all components pass `pnpm build` with 0 errors
- [x] **5.2** — Accessibility: aria-labels, aria-expanded, aria-controls, role attributes used throughout
- [x] **5.3** — prefers-reduced-motion: respected in HeroSection and SectionHeading
- [x] **5.4** — Security headers: CSP, HSTS, X-Frame-Options, etc. in next.config.ts
- [x] **5.5** — Honeypot spam protection on contact form
- [x] **5.6** — Rate limiting on contact API route (in-memory, 5 req/min/IP)
- [ ] **5.7** — Responsive testing across all breakpoints (sm/md/lg/xl) — manual check needed
- [ ] **5.8** — Cross-browser testing (Chrome, Firefox, Safari) — manual check needed
- [ ] **5.9** — Lighthouse audit (target ≥90 on all metrics) — run after deployment
- [ ] **5.10** — Add `loading.tsx` skeleton screens — P2
- [ ] **5.11** — Add skip-to-content link at top of layout — currently has `id="main-content"` but no visible skip link

---

## Phase 6 — Deployment
**Status:** ❌ NOT STARTED

- [ ] **6.1** — Verify `.gitignore` covers `.env.local`, `.next/`, `node_modules/`
- [ ] **6.2** — Configure Vercel project (connect repo, set env vars)
- [ ] **6.3** — Set `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `NEXT_PUBLIC_SITE_URL` in Vercel env
- [ ] **6.4** — Configure custom domain
- [ ] **6.5** — Verify all routes work on production URL
- [ ] **6.6** — Test contact form end-to-end (real email delivery)
- [ ] **6.7** — Final Lighthouse audit on production

---

## Newly Discovered Tasks (from audit)

- [x] **NEW-1** — Created `/public/images/` subdirectories (og/, team/, services/, portfolio/, icons/)
- [ ] **NEW-2** — Create proper OG social preview image (designer asset needed) — P2
- [x] **NEW-3** — `src/app/sitemap.ts` — complete
- [x] **NEW-4** — `src/app/robots.ts` — complete
- [x] **NEW-5** — Skip-to-content link added in `layout.tsx` (sr-only, visible on focus) — P2
- [ ] **NEW-6** — Verify contact form with real POST test — P1
- [ ] **NEW-7** — Review + standardize all page metadata using generatePageMetadata() — P1
- [ ] **NEW-8** — Re-enable `cacheComponents: true` + `partialPrefetching: true` once portfolio is populated — P2
- [ ] **NEW-9** — Create `/industries/[slug]/page.tsx` individual industry pages — P2
- [ ] **NEW-10** — Initialize git repository and make initial commit — P0

---

## Build Verification Log

| Date | Command | Result | Notes |
|------|---------|--------|-------|
| 2026-11-02 ~01:00 IST | `pnpm build` | ✅ EXIT 0, 24/24 pages | After fixing: lucide icons, Zod v4 API, `'use client'`, `cacheComponents` disabled |
| 2026-11-02 ~02:10 IST | `pnpm build` | ✅ EXIT 0, 26/26 pages | After replacing CSS device mockups with `ImageSequenceCanvas` scroll-scrub animation |
