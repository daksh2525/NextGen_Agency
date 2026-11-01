# Technical Architecture Document
**NextGen Agency — Software Development Agency Website**
**Version:** 1.0.0
**Status:** Proposed — Pending Initialization
**Last Updated:** 2026-11-02

---

## Table of Contents
1. [Repository State](#1-repository-state)
2. [Recommended Technology Stack](#2-recommended-technology-stack)
3. [Frontend Architecture](#3-frontend-architecture)
4. [Backend Architecture](#4-backend-architecture)
5. [Component Architecture](#5-component-architecture)
6. [Routing Strategy](#6-routing-strategy)
7. [Data Management](#7-data-management)
8. [API Architecture](#8-api-architecture)
9. [Asset Management](#9-asset-management)
10. [Animation Architecture](#10-animation-architecture)
11. [Reusable Component Strategy](#11-reusable-component-strategy)
12. [Folder Structure](#12-folder-structure)
13. [Environment Variables](#13-environment-variables)
14. [Deployment Architecture](#14-deployment-architecture)
15. [Third-Party Integrations](#15-third-party-integrations)

---

## 1. Repository State

**Inspection Date:** 2026-11-02
**Inspection Result:** The project directory (`/NextGen_Agency`) is completely empty. No existing code, dependencies, or configuration files were found.

**Conclusion:** This is a greenfield project. The technology stack and architecture described in this document are recommendations based on the project requirements. No existing stack exists to preserve or migrate.

---

## 2. Recommended Technology Stack

### Rationale
The site is a **marketing and lead generation website** — not a SaaS application. The architecture must prioritize:
- Fast performance (Core Web Vitals)
- SEO-friendliness (static/server rendering)
- Developer experience and maintainability
- Minimal operational complexity (no unnecessary backend)
- Rich interactive capability (animations, 3D effects)

### Core Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | **Next.js** | 14+ (App Router) | SSG/ISR for SEO + performance, React ecosystem |
| Language | **TypeScript** | 5+ | Type safety, better IDE support, maintainability |
| Styling | **Tailwind CSS** | 3.4+ | Utility-first, consistent design tokens, fast iteration |
| Animation | **Framer Motion** | 11+ | Production-grade React animations, excellent API |
| 3D / Parallax | **CSS 3D transforms** + Framer Motion | — | Lightweight; Three.js only if complex 3D is needed |
| Icons | **Lucide React** | latest | Clean, consistent, tree-shakeable icon library |
| Forms | **React Hook Form** + **Zod** | latest | Type-safe form handling + validation schema |
| Package Manager | **pnpm** | 8+ | Fast, disk-efficient, deterministic |
| Linting | **ESLint** (Next.js config) | latest | Enforce code quality |
| Formatting | **Prettier** | latest | Consistent code style |
| Git Hooks | **Husky** + **lint-staged** | latest | Pre-commit quality gates |

### Optional / Conditional

| Technology | When to Add |
|-----------|-------------|
| Three.js / React Three Fiber | Only if CSS 3D transforms cannot achieve the required 3D effect quality |
| Sanity / Contentful | When blog/Insights CMS is required (post-MVP) |
| next-intl | When multi-language support is required |
| Resend / Nodemailer | For contact form email delivery (MVP backend need) |

---

## 3. Frontend Architecture

### Rendering Strategy
- **Static Site Generation (SSG):** All marketing pages (homepage, service pages, about, portfolio listing) are statically generated at build time for maximum performance.
- **Incremental Static Regeneration (ISR):** Blog/Insights pages, when added.
- **Server Components:** Used by default in Next.js App Router where appropriate.
- **Client Components:** Used only for interactive UI (animations, forms, dropdowns, 3D parallax).

### Directory Structure (Frontend)
See [Section 12 — Folder Structure](#12-folder-structure) for the complete layout.

### State Management
- **Local component state:** React `useState` / `useReducer` for component-level state.
- **No global state manager (Redux/Zustand/Jotai):** Not required for a marketing site.
- **Form state:** React Hook Form handles all form state internally.
- **Server state:** No client-side data fetching beyond contact form submission.

### Styling Approach
- Tailwind CSS as the primary styling tool.
- CSS custom properties (variables) for design tokens (colors, fonts, spacing).
- `tailwind.config.ts` extends the default theme with the project's design system values.
- No CSS-in-JS libraries (styled-components, emotion) — Tailwind + CSS Modules for exceptions.
- CSS Modules allowed for complex component-level scoped styles only.

### Font Loading Strategy
- Import from Google Fonts using `next/font/google` for automatic optimization.
- Primary font: **Inter** (body, UI elements)
- Heading font: **Manrope** or **Plus Jakarta Sans** (headings, display text)
- Subset to Latin character set.
- `font-display: swap` to avoid invisible text during load.
- Preload critical font weights.

---

## 4. Backend Architecture

### Philosophy
**Minimize backend complexity.** This is a marketing website. The only backend requirement is contact form submission.

### Contact Form Backend
- Use **Next.js API Routes** (`/app/api/contact/route.ts`) to handle form submissions server-side.
- Server validates the input with Zod schema.
- On success, dispatches email notification via **Resend** (recommended) or Nodemailer with an SMTP provider.
- Rate limiting applied to the API route to prevent abuse.
- Honeypot field validation for spam prevention.
- No database required for MVP.

### Future Backend Considerations
- If a CMS is added: Sanity or Contentful provide their own API — no custom backend needed.
- If a client portal is added: evaluate Supabase (PostgreSQL + Auth) or Firebase.
- If a booking system is added: integrate Calendly or Cal.com embed.

---

## 5. Component Architecture

### Atomic Design Principles (Adapted)
Components are organized using a simplified atomic design approach:

```
atoms/       → Smallest, most reusable elements (Button, Badge, Tag, Icon)
molecules/   → Combinations of atoms (Card, FormField, NavLink, ServiceCard)
organisms/   → Full sections (Navbar, HeroSection, ServicesGrid, Footer)
templates/   → Page-level layouts (PageLayout, ServicePageTemplate)
pages/       → Next.js App Router pages (route files)
```

### Component Rules
1. Every component lives in its own file.
2. Export components as named exports.
3. Define TypeScript `interface` or `type` for all component props.
4. No business logic in presentational components.
5. Side effects (fetch, subscription) belong in custom hooks or server components.
6. Avoid prop drilling — use composition or React Context for shared layout state.

### Key Components to Build

| Component | Location | Notes |
|-----------|----------|-------|
| `Navbar` | organisms/Navbar | Sticky, glassmorphism, dropdown support |
| `HeroSection` | organisms/HeroSection | 3D mockups, parallax, CTAs |
| `ServicesGrid` | organisms/ServicesGrid | Bento grid layout |
| `TeamSection` | organisms/TeamSection | Founder cards |
| `ContactForm` | organisms/ContactForm | Validated, accessible form |
| `Footer` | organisms/Footer | Full sitemap footer |
| `Button` | atoms/Button | Variants: primary, secondary, ghost |
| `SectionHeading` | atoms/SectionHeading | Consistent heading style |
| `ServiceCard` | molecules/ServiceCard | Bento card for services |
| `ProjectCard` | molecules/ProjectCard | Portfolio project card |
| `DeviceMockup` | molecules/DeviceMockup | 3D laptop/phone mockup |
| `FAQAccordion` | molecules/FAQAccordion | Accordion with animations |
| `ProcessStep` | molecules/ProcessStep | Numbered step card |
| `TechBadge` | atoms/TechBadge | Technology logo + label |

---

## 6. Routing Strategy

### Next.js App Router

All routes use the Next.js 14 App Router (`/app` directory).

```
app/
├── layout.tsx              ← Root layout (Navbar, Footer, Providers)
├── page.tsx                ← Homepage (/)
├── not-found.tsx           ← 404 page
├── error.tsx               ← Error boundary
├── services/
│   ├── page.tsx            ← /services
│   └── [slug]/
│       └── page.tsx        ← /services/[slug]
├── portfolio/
│   ├── page.tsx            ← /portfolio
│   └── [slug]/
│       └── page.tsx        ← /portfolio/[slug]
├── technologies/
│   └── page.tsx
├── industries/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── insights/               ← Post-MVP
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
└── api/
    └── contact/
        └── route.ts        ← Contact form API
```

### Route Generation
- Service page slugs are defined in a static data file (`/data/services.ts`).
- Portfolio project slugs are defined in a static data file (`/data/portfolio.ts`).
- `generateStaticParams()` generates all static pages at build time.
- Dynamic segments use typed params via TypeScript.

---

## 7. Data Management

### Data Sources
All content for MVP is stored as **TypeScript data files** in `/src/data/`. No CMS or external API is required for initial launch.

### Data Files

```
/src/data/
├── services.ts         ← Service definitions, descriptions, slugs
├── portfolio.ts        ← Portfolio project data
├── team.ts             ← Team member data (name, bio, photo path)
├── technologies.ts     ← Technology stack data grouped by category
├── industries.ts       ← Industry data
├── testimonials.ts     ← Testimonial data (empty array until real ones collected)
├── faqs.ts             ← FAQ questions and answers
├── navigation.ts       ← Navigation link definitions, dropdown configs
└── metadata.ts         ← Site-wide SEO metadata defaults
```

### Data Shape (Example — Service)
```typescript
interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;          // Lucide icon name or path to SVG
  deliverables: string[];
  technologies: string[];
  process: ProcessStep[];
  benefits: Benefit[];
  featured: boolean;
}
```

### Post-MVP CMS Integration
When blog content is needed, integrate Sanity or Contentful:
- Content is fetched at build time (ISR) via SDK.
- No separate backend — API calls happen in Next.js server components.

---

## 8. API Architecture

### MVP API Routes

#### `POST /api/contact`
Handles contact form submissions.

**Request:**
```typescript
interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  consent: boolean;
  honeypot?: string; // Must be empty
}
```

**Response:**
```typescript
// Success
{ success: true; message: string }

// Error
{ success: false; error: string; details?: ZodError }
```

**Security:** Zod validation, honeypot check, rate limiting (max 5 requests/IP/hour), CORS restricted to the production domain.

### No Additional API Routes at MVP
- No authentication endpoints
- No data retrieval endpoints (all data is static)
- No file upload endpoints

---

## 9. Asset Management

### Images
- Format: **WebP** preferred, with JPEG/PNG fallback
- Optimization: `next/image` component handles lazy loading, resizing, and format conversion
- Hero device mockups: SVG or high-res PNG/WebP, optimized
- Team photos: Provided by client; must be background-removed and optimized before use
- Portfolio screenshots: Provided by client or clearly labelled as placeholders
- All images stored in `/public/images/` organized by section

### Directory Structure for Public Assets
```
/public/
├── images/
│   ├── hero/           ← Hero device mockups
│   ├── services/       ← Service illustrations
│   ├── portfolio/      ← Project screenshots
│   ├── team/           ← Founder photos
│   ├── clients/        ← Client logos (when available)
│   ├── technologies/   ← Tech stack logos
│   └── og/             ← Open Graph images
├── icons/              ← Favicon set
├── fonts/              ← Self-hosted fonts (if any)
└── sitemap.xml         ← Generated at build
```

### SVG Strategy
- UI icons: Lucide React (imported as React components — tree-shakeable)
- Custom illustrations: Inline SVG or optimized SVG files
- Technology logos: SVG from `/public/images/technologies/`
- No icon fonts (Font Awesome, etc.) — performance cost too high

### Font Assets
- Loaded via `next/font/google` — fonts are self-hosted by Next.js automatically
- No manual font files needed unless specific variable fonts are required

---

## 10. Animation Architecture

### Library: Framer Motion
Framer Motion is the primary animation library. It handles:
- Page transitions
- Scroll-triggered animations
- Component mount/unmount animations
- 3D parallax transforms (via `useMotionValue`, `useTransform`, `useSpring`)
- Hover effects
- Accordion animations

### Animation Principles
1. **Performance first:** Use CSS `transform` and `opacity` only — these properties are GPU-accelerated.
2. **Respect user preferences:** All animations wrap in a `prefers-reduced-motion` check.
3. **Purposeful animation:** Every animation has a clear UX purpose.
4. **Consistent easing:** Use a project-wide easing configuration.
5. **No layout animations:** Avoid animations that trigger layout reflow.

### 3D Parallax Implementation

#### Hero Device Parallax
```
Approach: Framer Motion useMotionValue + useTransform

1. Track mouse position via useMotionValue({ x, y })
2. Normalize to range [-0.5, 0.5]
3. Map to rotation transforms:
   - laptopRotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8])  // degrees
   - laptopRotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
   - phoneRotateX  = useTransform(mouseY, [-0.5, 0.5], [6, -6])
   - phoneRotateY  = useTransform(mouseX, [-0.5, 0.5], [10, -10])
4. Apply spring physics via useSpring for smooth damping
5. Restore on mouseLeave with animate() back to initial values
6. Disable on touch/mobile: check window.matchMedia('(pointer: coarse)')
7. Disable if prefers-reduced-motion
```

#### Scroll Animations
```
Approach: Framer Motion variants + IntersectionObserver (via motion.div whileInView)

Standard entrance variants:
- fadeInUp: { opacity: 0, y: 30 } → { opacity: 1, y: 0 }
- fadeInLeft: { opacity: 0, x: -30 } → { opacity: 1, x: 0 }
- staggerChildren: stagger 0.1s between children
- scaleIn: { scale: 0.95, opacity: 0 } → { scale: 1, opacity: 1 }
```

### Animation Configuration File
```
/src/lib/animations.ts  ← Centralized animation variants and spring configs
```

### When to Use Three.js
Only if the product mockup requires actual 3D geometry rendering (e.g., a rotating 3D model of a device). For screen-on-device presentations and parallax tilt effects, CSS 3D transforms + Framer Motion are sufficient and far more performant.

---

## 11. Reusable Component Strategy

### Design Token Integration
All components consume design tokens from `tailwind.config.ts`. No hardcoded color or spacing values in component files.

### Component Variants
Use the `cva` (class-variance-authority) library to define component variants:
```typescript
// Example: Button variants
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'bg-orange text-white ...',
        secondary: 'bg-transparent border ...',
        ghost: 'bg-transparent ...',
      },
      size: {
        sm: '...', md: '...', lg: '...',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

### Component Documentation
Each component will include JSDoc comments with:
- Description
- Props table (inferred from TypeScript interface)
- Usage example

---

## 12. Folder Structure

```
/NextGen_Agency/
├── .github/
│   └── workflows/          ← CI/CD workflows (future)
├── docs/
│   ├── prd.md
│   ├── architecture.md
│   ├── rules.md
│   ├── design.md
│   ├── tasks.md
│   ├── memory.md
│   └── security.md
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── team/
│   │   ├── technologies/
│   │   └── og/
│   ├── icons/
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── technologies/
│   │   │   └── page.tsx
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SectionHeading/
│   │   │   ├── Badge/
│   │   │   ├── TechBadge/
│   │   │   └── AnimatedText/
│   │   ├── molecules/
│   │   │   ├── ServiceCard/
│   │   │   ├── ProjectCard/
│   │   │   ├── TeamCard/
│   │   │   ├── DeviceMockup/
│   │   │   ├── FAQAccordion/
│   │   │   ├── ProcessStep/
│   │   │   ├── TestimonialCard/
│   │   │   ├── IndustryCard/
│   │   │   └── FormField/
│   │   ├── organisms/
│   │   │   ├── Navbar/
│   │   │   ├── HeroSection/
│   │   │   ├── ServicesGrid/
│   │   │   ├── TrustSection/
│   │   │   ├── PortfolioSection/
│   │   │   ├── WhyChooseUs/
│   │   │   ├── ProcessSection/
│   │   │   ├── TechnologiesSection/
│   │   │   ├── IndustriesSection/
│   │   │   ├── TeamSection/
│   │   │   ├── TestimonialsSection/
│   │   │   ├── FAQSection/
│   │   │   ├── ContactSection/
│   │   │   ├── ContactForm/
│   │   │   └── Footer/
│   │   └── providers/
│   │       └── Providers.tsx  ← Client providers wrapper
│   ├── data/
│   │   ├── services.ts
│   │   ├── portfolio.ts
│   │   ├── team.ts
│   │   ├── technologies.ts
│   │   ├── industries.ts
│   │   ├── testimonials.ts
│   │   ├── faqs.ts
│   │   ├── navigation.ts
│   │   └── metadata.ts
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollY.ts
│   │   ├── useReducedMotion.ts
│   │   ├── useContactForm.ts
│   │   └── useIntersectionObserver.ts
│   ├── lib/
│   │   ├── animations.ts       ← Framer Motion variants
│   │   ├── utils.ts            ← cn() utility, general helpers
│   │   ├── validations.ts      ← Zod schemas
│   │   ├── email.ts            ← Email sending logic (Resend)
│   │   └── seo.ts              ← Metadata generation helpers
│   ├── styles/
│   │   └── globals.css         ← Global CSS, custom properties
│   └── types/
│       ├── service.ts
│       ├── portfolio.ts
│       ├── team.ts
│       └── common.ts
├── .env.local                  ← Local environment variables (gitignored)
├── .env.example                ← Example environment variables (committed)
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

---

## 13. Environment Variables

### Required Variables

```bash
# .env.example

# Application
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=NextGen Agency

# Contact Form — Email Service (Resend)
RESEND_API_KEY=                    # Server-side only
CONTACT_EMAIL_TO=                  # Recipient email for contact submissions
CONTACT_EMAIL_FROM=                # Sender email (verified domain)

# Analytics (optional at MVP)
NEXT_PUBLIC_GA_MEASUREMENT_ID=     # Google Analytics 4 Measurement ID

# Rate Limiting (if using Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# reCAPTCHA (optional — use honeypot first)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### Variable Rules
- `NEXT_PUBLIC_` prefix: exposed to the browser. Never put secrets here.
- Non-prefixed: server-side only. Never commit real values.
- `.env.local` is gitignored.
- `.env.example` is committed with placeholder values.
- Production variables set in Vercel Dashboard.

---

## 14. Deployment Architecture

### Hosting: Vercel
- **Platform:** Vercel (optimal for Next.js)
- **Regions:** Edge network — auto-distributed globally
- **SSL:** Automatic via Vercel
- **CI/CD:** Git push to `main` branch triggers automatic deployment
- **Preview Deployments:** Every pull request gets a preview URL
- **Environment Variables:** Set in Vercel Dashboard → Settings → Environment Variables

### DNS & Domain
- Domain purchased and managed separately (Namecheap, GoDaddy, or Google Domains)
- DNS A/CNAME records pointed to Vercel
- www → non-www redirect (or vice versa) configured in `next.config.ts`

### CDN
- Vercel Edge Network serves static assets globally
- Images served via Vercel's built-in Image Optimization CDN

### Branching Strategy
```
main          ← Production branch (auto-deploys to production)
develop       ← Integration branch
feature/*     ← Feature branches (PR into develop)
hotfix/*      ← Emergency fixes (PR into main)
```

### Build Configuration
```bash
# Install
pnpm install --frozen-lockfile

# Build
pnpm build

# Start (production)
pnpm start
```

---

## 15. Third-Party Integrations

### MVP Integrations

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| **Resend** | Contact form email delivery | Server-side API (API Route) |
| **Google Analytics 4** | Traffic and conversion tracking | `next/script` + GA4 config |
| **Google Fonts** | Typography | `next/font/google` |
| **Vercel** | Hosting, CI/CD | Git integration |

### Optional MVP Integrations

| Service | Purpose | When to Add |
|---------|---------|-------------|
| **Upstash Redis** | Rate limiting for contact API | If spam becomes a problem |
| **reCAPTCHA v3** | Advanced spam protection | If honeypot is insufficient |

### Post-MVP Integrations

| Service | Purpose |
|---------|---------|
| Sanity / Contentful | Blog/Insights CMS |
| Calendly / Cal.com | Booking/scheduling |
| HubSpot / Notion | CRM / lead tracking |
| Hotjar / Clarity | Heatmaps and session recordings |
| WhatsApp Business API | Floating WhatsApp button |
| Mailchimp / Resend Broadcasts | Email newsletter |
