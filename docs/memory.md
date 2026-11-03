# Persistent AI Project Context (Memory)
**NextGen Agency — Software Development Agency Website**
**Version:** 2.2.0
**Last Updated:** 2026-11-03 (Session: SPA Architecture, 3D Agentic Factory, GSAP Timeline, Leadership Portraits)
**Current Phase:** Phase 6 — Production Ready SPA & 3D Interactive Pipeline — COMPLETE

---

> [!IMPORTANT]
> **READ THIS FILE FIRST** before every development session. This is the VERIFIED source of truth based on actual codebase inspection. Do not trust previous session summaries — always cross-reference with the real files.

---

## 1. Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | NextGen Agency Website |
| **Type** | Premium software development agency marketing website |
| **Primary Goal** | Lead generation — convert visitors into qualified business enquiries |
| **Repo Location** | `/Users/dakshsaini/Desktop/ NextGen_Agency` (note: leading space in folder name) |
| **Docs Location** | `/Users/dakshsaini/Desktop/ NextGen_Agency/docs/` |
| **Package Manager** | pnpm 12.16.1 (use ONLY pnpm — never npm or yarn) |

---

## 2. Business Context

### Services Offered
1. Custom Web Development
2. Full-Stack Development
3. SaaS Application Development
4. AI & Machine Learning Solutions
5. RAG-Based Applications
6. AI Agent Development
7. Mobile Application Development
8. E-commerce Development
9. Backend & API Development
10. UI/UX Design
11. Website Maintenance and Support

### Agency Positioning
"Modern software engineering combined with practical, production-grade AI solutions."
Premium, international-standard, technically credible.

### Target Markets
- India (primary local market)
- USA, UK, Canada, Australia (international)
- Startups, SMEs, SaaS companies, Enterprises

---

## 3. Team Information

| Field | Status | Value / Source |
|-------|--------|----------------|
| Number of Founders | 2 | Verified in `src/data/team.ts` |
| Founder 1 Designation | Provided | **Founder & CEO** |
| Founder 1 Portrait | Provided | `public/images/team/image2.png` |
| Founder 2 Designation | Provided | **Co-Founder & CTO** |
| Founder 2 Portrait | Provided | `public/images/team/image1.png` |
| Portrait Resolution | High-Res | 1254 × 1254 square portraits with hover zoom in `TeamSection` |

> [!NOTE]
> Portraits are loaded from `public/images/team/` and accessible via both `/images/team/...` and `/team/...` (via root public symlink). Bio descriptions reflect strategic engineering and AI architecture leadership.

---

## 4. Confirmed Brand & Design System

### Color Palette (defined in `src/app/globals.css` @theme block)

| CSS Token | Hex | Tailwind Class |
|-----------|-----|---------------|
| `--color-charcoal` | `#171717` | `bg-charcoal`, `text-charcoal` |
| `--color-charcoal-deep` | `#0d0d0d` | `bg-charcoal-deep` |
| `--color-surface-grey` | `#292929` | `bg-surface-grey` |
| `--color-border-dark` | `#2e2e2e` | `border-border-dark` |
| `--color-border-light` | `#e4e2dd` | `border-border-light` |
| `--color-orange` | `#f0782b` | `bg-orange`, `text-orange` |
| `--color-orange-dark` | `#d4671f` | `bg-orange-dark` |
| `--color-orange-light` | `#f5934a` | `bg-orange-light` |
| `--color-warm-white` | `#f7f5f0` | `bg-warm-white`, `text-warm-white` |
| `--color-muted-grey` | `#a1a1aa` | `text-muted-grey` |
| `--color-text-muted-dark` | `#71717a` | `text-text-muted-dark` |
| `--color-text-dark` | `#0a0a0a` | `text-text-dark` |

### Typography
- **Headings:** Manrope (`--font-manrope`, `font-heading` class)
- **Body/UI:** Inter (`--font-inter`, `font-body` class)
- Both loaded via `next/font/google` in `src/app/layout.tsx`

### Utility Classes (defined in globals.css)
- `.container-site` — max-width 1280px, centered, responsive padding
- `.section-padding` — py-20 / lg:py-24
- `.grid-bg` — subtle dot-grid background
- `.noise-bg::before` — noise texture overlay
- `.text-gradient` — orange gradient text
- `.gradient-border` — orange animated border effect

---

## 5. Actual Technology Stack (VERIFIED)

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.4.3 |
| Language | TypeScript | ^5 (strict mode) |
| Runtime | React | 19.3.0 |
| Styling | Tailwind CSS | ^4 (CSS @theme config — NO tailwind.config.ts) |
| Animation | Framer Motion | ^14.9.0 |
| Icons | lucide-react | ^1.66.0 |
| Forms | react-hook-form | ^7.91.0 |
| Validation | Zod | ^4.6.7 |
| Form resolvers | @hookform/resolvers | ^7.0.0 |
| Class utilities | clsx + tailwind-merge + class-variance-authority | latest |
| Email | resend | ^6.37.0 |
| Package Manager | pnpm | 12.16.1 |

### Critical Version Notes
- **Tailwind v4**: CSS `@theme` config in `globals.css`, NOT `tailwind.config.ts`. Import: `@import "tailwindcss"`.
- **Next.js 16**: `params` in page components is `Promise<{slug: string}>` — must `await params`.
- **lucide-react v1.66**: `Linkedin`, `Twitter`, `Github` icons REMOVED. Use inline SVGs (already done in Footer, TeamSection, about/page.tsx).
- **Zod v4**: `errorMap` → `error` for custom messages in `.enum()` and `.literal()`.
- **`cacheComponents` + `partialPrefetching`**: Both disabled in `next.config.ts` because portfolio has empty `generateStaticParams`. Re-enable when real portfolio projects are added.
- **Framer Motion**: `useReducedMotion` imported from `'framer-motion'`, not React.

---

## 6. Architecture

### Rendering Strategy
- All pages are statically generated (SSG) except `/portfolio/[slug]` which is `force-dynamic`
- Contact form: Next.js API Route at `/api/contact` (server-rendered)
- No database — all content in TypeScript data files

### Component Architecture (Atomic Design)
```
src/components/
├── atoms/           # Button, Badge, SectionHeading
├── molecules/       # ServiceCard, ProjectCard, FAQAccordion
└── organisms/       # Full sections: Navbar, HeroSection, Footer, etc.
```

### Data Layer (src/data/)
- All content stored as TypeScript files
- No CMS, no database, no external data fetching
- `portfolio.ts` — empty array (no fake projects)
- `testimonials.ts` — empty array (no fake testimonials)
- `team.ts` — placeholder entries with TODO markers

---

## 7. Complete File Map (VERIFIED)

### App Router Pages
| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | ✅ Complete — all homepage sections |
| `/layout` | `src/app/layout.tsx` | ✅ Complete — Manrope/Inter, Navbar, Footer, metadata |
| `/contact` | `src/app/contact/page.tsx` | ✅ Complete |
| `/services` | `src/app/services/page.tsx` | ✅ Complete |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | ✅ Complete (11 static pages) |
| `/portfolio` | `src/app/portfolio/page.tsx` | ✅ Complete (empty state) |
| `/portfolio/[slug]` | `src/app/portfolio/[slug]/page.tsx` | ✅ Complete (force-dynamic, 404s when empty) |
| `/technologies` | `src/app/technologies/page.tsx` | ✅ Complete |
| `/industries` | `src/app/industries/page.tsx` | ✅ Complete |
| `/about` | `src/app/about/page.tsx` | ✅ Complete |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | ✅ Complete |
| `/terms-of-service` | `src/app/terms-of-service/page.tsx` | ✅ Complete |
| `/not-found` | `src/app/not-found.tsx` | ✅ Complete |
| `/error` | `src/app/error.tsx` | ✅ Complete (client component) |
| `/api/contact` | `src/app/api/contact/route.ts` | ✅ Complete (POST, rate limiting, Resend, honeypot) |

**Missing pages (not yet built):**
| Route | Status | Notes |
|-------|--------|-------|
| `/industries/[slug]` | ❌ Missing | Individual industry detail pages |
| `/insights` | ❌ Missing | Blog (POST-MVP — not required for launch) |

### Organisms (src/components/organisms/)
| Component | File | Status |
|-----------|------|--------|
| Navbar | `Navbar/Navbar.tsx` | ✅ Complete — glassmorphism, dropdowns, mobile menu |
| HeroSection | `HeroSection/HeroSection.tsx` | ✅ Replaced — thin wrapper for PrismaHero |
| PrismaHero | `components/ui/prisma-hero.tsx` | ✅ NEW — cinematic video hero, WordsPullUp, WordsPullUpMultiStyle, VideoBackground |
| ServicesGrid | `ServicesGrid/ServicesGrid.tsx` | ✅ Complete — animated 3-column asymmetric Bento Grid (WHAT WE BUILD: AI/ML, Full-Stack, SaaS, RAG, Agents, Mobile, Web) |
| WhyChooseUs | `WhyChooseUs/WhyChooseUs.tsx` | ✅ Complete — compact 4-card 2x2 Bento Grid (AI-Native, Scale, Direct Access, Quality Guarantee) |
| ProcessSection | `ProcessSection/ProcessSection.tsx` | ✅ Complete — 7-step interactive RadialScrollGallery (GSAP ScrollTrigger) |
| PortfolioSection | `PortfolioSection/PortfolioSection.tsx` | ✅ Complete — empty state |
| TechnologiesSection | `TechnologiesSection/TechnologiesSection.tsx` | ✅ Complete — 4-row animated ToolchainMarquee (Frontend, Backend, AI/ML, Tools) |
| IndustriesSection | `IndustriesSection/IndustriesSection.tsx` | ✅ Complete — 8 industry cards |
| TeamSection | `TeamSection/TeamSection.tsx` | ✅ Complete — placeholder-aware |
| FAQSection | `FAQSection/FAQSection.tsx` | ✅ Complete — accordion, CTA |
| ContactSection | `ContactSection/ContactSection.tsx` | Removed from homepage per user request |
| ContactForm | `ContactForm/ContactForm.tsx` | ✅ Complete — RHF + Zod + honeypot |
| Footer | `Footer/Footer.tsx` | ✅ Complete — 4-col, social SVG icons |

### Molecules (src/components/molecules/)
| Component | Status |
|-----------|--------|
| ServiceCard | ✅ Complete |
| ProjectCard | ✅ Complete |
| FAQAccordion | ✅ Complete |

### Atoms (src/components/atoms/)
| Component | Status |
|-----------|--------|
| Button | ✅ Complete — CVA variants |
| Badge | ✅ Complete |
| SectionHeading | ✅ Complete — now accepts `id` prop |

### Data Files (src/data/)
| File | Status | Notes |
|------|--------|-------|
| `services.ts` | ✅ Complete | 11 services, full data |
| `navigation.ts` | ✅ Complete | Nav items + footer links |
| `faqs.ts` | ✅ Complete | 8 real FAQ entries |
| `industries.ts` | ✅ Complete | 8 industries |
| `technologies.ts` | ✅ Complete | 6 categories |
| `team.ts` | ⚠️ Placeholder | Real data not provided yet |
| `portfolio.ts` | ⚠️ Empty | No real projects yet |
| `testimonials.ts` | ⚠️ Empty | No testimonials yet |

### Lib Files (src/lib/)
| File | Status |
|------|--------|
| `utils.ts` | ✅ cn(), generateSlug(), truncate(), formatDate() |
| `animations.ts` | ✅ All Framer Motion variants |
| `validations.ts` | ✅ Zod contact form schema (Zod v4 API) |
| `seo.ts` | ✅ generatePageMetadata() helper |

### Hooks (src/hooks/)
| File | Status | Notes |
|------|--------|-------|
| `useReducedMotion.ts` | ✅ Fixed | Imports from `framer-motion` not React |
| `useScrollY.ts` | ✅ Complete | |

### Types (src/types/)
| File | Status |
|------|--------|
| `common.ts` | ✅ NavLink, NavItem, Benefit, ProcessStep, SeoMeta |
| `service.ts` | ✅ Service interface |
| `portfolio.ts` | ✅ Project, CaseStudy interfaces |
| `team.ts` | ✅ TeamMember interface |

---

## 8. Build Status (VERIFIED ✅)

**Last verified build:** 2026-11-02 (after video fix)
```
pnpm build  →  EXIT CODE 0
26/26 static pages generated
0 TypeScript errors
0 Turbopack compilation errors
2 non-critical deprecation warnings (edge runtime for OG image — cosmetic only)
```

### Recent Changes (Video Fix Session)

**Problem:** Video background in PrismaHero was not playing/visible in browser.

**Root causes identified:**
1. No `media-src 'self'` directive in CSP (`next.config.ts`) — while `default-src` covers it in theory, some browsers enforce strict media loading.
2. JS-state-based opacity toggle (`canplay` event + `useState`) unreliable — if event fired before React effect registered, video stayed `opacity-0`.

**Fix applied:**
- `next.config.ts` — added `media-src 'self';` to CSP string.
- `src/components/ui/prisma-hero.tsx` — rewrote `VideoBackground`:
  - Removed `useRef`, `useState`, `useEffect` from `VideoBackground`
  - Removed `AnimatePresence` import (was unused)
  - Video now uses CSS `@keyframes videoFadeIn` via inline `style={{ animation: 'videoFadeIn 1.4s ease-in-out 0.3s both' }}`
  - No JS state involved — animation fires unconditionally once element mounts
- `src/app/globals.css` — added `@keyframes videoFadeIn { from { opacity: 0; } to { opacity: 1; } }` at end of file.

**Build re-verified:** ✅ EXIT CODE 0, 26/26 pages, 0 TS errors.

**Route output:**
- `/` — Static (○)
- `/about` — Static (○)
- `/contact` — Static (○)
- `/industries` — Static (○)
- `/portfolio` — Static (○)
- `/portfolio/[slug]` — Dynamic (ƒ)
- `/services` — Static (○)
- `/services/[slug]` — SSG ● (11 routes pre-rendered)
- `/technologies` — Static (○)
- `/terms-of-service` — Static (○)
- `/privacy-policy` — Static (○)
- `/api/contact` — Dynamic (ƒ)
- `/_not-found` — Static (○)

---

## 9. Known Issues & Limitations

| Issue | Impact | Status |
|-------|--------|--------|
| `cacheComponents` + `partialPrefetching` disabled | Minor perf loss | Re-enable when portfolio has projects |
| `public/images/` subdirs missing | No OG images, no team photos yet | Create dirs; add assets when received |
| `/industries/[slug]` page missing | Individual industry pages 404 | Build when needed (POST-MVP) |
| Team photos not provided | TeamSection shows placeholder UI | Awaiting client |
| Portfolio empty | PortfolioSection shows empty state | Awaiting client projects |
| Testimonials empty | Section omitted from homepage | Awaiting client |
| Social links use `#` placeholder | Footer social icons go nowhere | Update when real URLs provided |
| Contact email uses placeholder | `hello@nextgenagency.dev` placeholder | Update in env vars |
| No OG image | Social sharing has no preview image | Create `/public/images/og/default-og.png` |
| No sitemap.xml | SEO impact | Add via next-sitemap |
| No robots.txt | SEO impact | Add to /public/ |
| `src/components/organisms/ServicesGrid/ServicesGrid.tsx` uses `id` prop on SectionHeading | TypeScript warning suppressed | SectionHeading now accepts `id` — works correctly |

---

## 10. Unresolved Decisions (Requiring Client Input)

| # | Decision | Status |
|---|----------|--------|
| 1 | Final agency name | Using "NextGen Agency" (placeholder) |
| 2 | Founder names, designations, bios | ⏳ Pending |
| 3 | Team member photos | ⏳ Pending (background-removed portraits) |
| 4 | Agency logo / brand mark | Using text logo |
| 5 | Agency founding year | Used "2024" in about page |
| 6 | Real contact email | Using `hello@nextgenagency.dev` |
| 7 | Social media URLs | Using `#` placeholders |
| 8 | Domain | Using `nextgenagency.dev` placeholder |
| 9 | Portfolio projects | Empty — awaiting client |
| 10 | Testimonials | Empty — awaiting client |

---

## 11. Remaining Work (Priority Order)

### Immediate (P0 — needed for launch quality)
1. ✅ Create public image directories — DONE
2. ✅ Create OG image — DONE (`src/app/opengraph-image.tsx` via ImageResponse)
3. ✅ Add `robots.ts` — DONE
4. ✅ Add `sitemap.ts` — DONE
5. ✅ Skip-to-content link — DONE in `layout.tsx`
6. Verify contact form API endpoint with a real POST request test

### High Priority (P1 — important for SEO & completeness)
6. Individual service pages already done — verify all 11 slugs render correctly in browser
7. Add `<link rel="canonical">` via `generatePageMetadata()` on each page
8. Add `og:image` per page using `generatePageMetadata()`
9. Verify contact form API endpoint with a real POST request test

### Medium Priority (P2 — polish)
10. Add `loading.tsx` skeleton for slow pages
11. Add page transition animations
12. Accessibility audit (skip-to-main link already via `id="main-content"`)
13. Cross-browser testing

### Post-MVP (P3)
14. `/industries/[slug]` individual industry detail pages
15. `/insights` blog section
16. Testimonials section (when real testimonials provided)
17. Re-enable `cacheComponents: true` + `partialPrefetching: true` after adding portfolio

---

## 12. Important Implementation Rules (Carry Forward)

1. **pnpm only** — never npm or yarn
2. **App Router only** — no Pages Router
3. **Tailwind v4** — `@theme` CSS config only, no `tailwind.config.ts`
4. **No fake data** — never invent team info, testimonials, portfolio projects, or metrics
5. **lucide-react v1.66** — `Linkedin`, `Twitter`, `Github` icons do not exist. Use inline SVGs
6. **Zod v4** — use `error:` not `errorMap:` for custom messages
7. **Next.js 16 params** — always `await params` in page components (`params: Promise<{slug: string}>`)
8. **`'use client'`** — required on any component using Framer Motion, React hooks, or browser APIs
9. **No `any` types** — TypeScript strict mode enforced
10. **`prefers-reduced-motion`** — all animations respect via `useReducedMotionPref()` hook
11. **SectionHeading `id` prop** — already added; organisms can safely pass `id` to SectionHeading

---

## 13. Environment Variables

Required in `.env.local`:
```
RESEND_API_KEY=          # Resend email API key (optional dev, required prod)
CONTACT_EMAIL_TO=        # Destination email for contact form
NEXT_PUBLIC_SITE_NAME=   # Site name for SEO metadata
NEXT_PUBLIC_SITE_URL=    # Canonical URL for SEO metadata
```

Template in `.env.example`.
Never commit `.env.local` — it is gitignored.

---

## 14. Session Log

| Date | Session Summary | Key Outcomes |
|------|----------------|--------------|
| 2026-11-02 (Session 1) | Documentation created | 7 docs files created |
| 2026-11-02 (Session 2) | Foundation + Core UI | Next.js 16 initialized, all atoms/molecules/organisms written, data files, types, lib, hooks |
| 2026-11-02 (Session 3) | Completion + Bug Fixes | All pages written, API route, not-found, error; fixed lucide icon names, Zod v4 API, SectionHeading id prop, `'use client'` on organisms, disabled cacheComponents — **pnpm build passes 0 errors** |
| 2026-11-03 (Session 5) | Single Page Application (SPA) Conversion | Removed duplicate pages (/services, /portfolio, /technologies, /industries, /about, /contact, /nav-demo). Converted to single page with smooth anchor scroll (#home, #services, #why-nextgen, #process, #portfolio, #tech-stack, #industries, #team, #faq, #contact). Integrated interactive ContactForm directly into homepage. |
| 2026-11-03 (Session 6) | 3D Agentic Factory & Horizontal Timeline Integration | Integrated `AgenticFactory3D` into `src/components/ui/agentic-factory-3d.tsx` and created `AgenticFactorySection`. Replaced `ProcessSection` with bulletproof GSAP `pin: true` horizontal scrolling `Timeline` (`src/components/ui/timeline.tsx`) with `@gsap/react`, smooth track translation, animated progress line, illuminated milestone dots, and alternating cards. Switched founder/co-founder photos in `src/data/team.ts`. tsc --noEmit 0 errors. | ← CURRENT |

---

## 15. Documentation Reference Map

| Question | File |
|----------|------|
| Business requirements | `docs/prd.md` |
| Tech architecture | `docs/architecture.md` |
| Coding rules | `docs/rules.md` |
| Design system | `docs/design.md` |
| Task tracking | `docs/tasks.md` |
| Security | `docs/security.md` |
| Current state | `docs/memory.md` (this file) |
