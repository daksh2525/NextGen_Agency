# Development Roadmap and Task Tracking
**NextGen Agency — Software Development Agency Website**
**Version:** 1.0.0
**Status:** Phase 1 — Not Started
**Last Updated:** 2026-11-02

---

## Legend
- [ ] Pending
- [~] In Progress
- [x] Completed
- [!] Blocked

**Priority:** P0 = Critical / P1 = High / P2 = Medium / P3 = Low

---

## Phase 1 — Foundation
**Goal:** Initialize the project, configure tooling, establish design tokens and global styles.
**Status:** ⏳ Not Started

---

### 1.1 Project Initialization

#### Task 1.1.1 — Initialize Next.js Project
- **Description:** Run `pnpm create next-app@latest` with TypeScript, Tailwind CSS, App Router, ESLint, and src/ directory enabled.
- **Priority:** P0
- **Dependencies:** None
- **Acceptance Criteria:**
  - `package.json` exists with Next.js 14+
  - TypeScript is configured (`tsconfig.json`)
  - Tailwind CSS is configured (`tailwind.config.ts`, `globals.css`)
  - `src/app/page.tsx` and `src/app/layout.tsx` exist
  - `pnpm dev` starts the development server without errors
- [ ] Pending

#### Task 1.1.2 — Configure pnpm as Package Manager
- **Description:** Set pnpm as the project package manager. Verify lockfile (`pnpm-lock.yaml`) is generated.
- **Priority:** P0
- **Dependencies:** 1.1.1
- **Acceptance Criteria:**
  - `pnpm-lock.yaml` exists
  - `.npmrc` configured if needed
  - No `package-lock.json` or `yarn.lock` in the repo
- [ ] Pending

#### Task 1.1.3 — Install Core Dependencies
- **Description:** Install all approved dependencies: `framer-motion`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- **Priority:** P0
- **Dependencies:** 1.1.1, 1.1.2
- **Acceptance Criteria:**
  - All packages installed without dependency conflicts
  - No unused packages in `package.json`
  - `pnpm build` completes without errors
- [ ] Pending

#### Task 1.1.4 — Configure ESLint and Prettier
- **Description:** Set up ESLint with Next.js config, import ordering plugin, and Prettier with project-specific config.
- **Priority:** P0
- **Dependencies:** 1.1.1
- **Acceptance Criteria:**
  - `.eslintrc.json` configured
  - `.prettierrc` configured
  - `pnpm lint` runs without errors on a fresh codebase
  - VSCode/editor respects configuration (via `.vscode/settings.json`)
- [ ] Pending

#### Task 1.1.5 — Configure Husky and lint-staged
- **Description:** Set up pre-commit hooks to run ESLint and Prettier before every commit.
- **Priority:** P1
- **Dependencies:** 1.1.4
- **Acceptance Criteria:**
  - Husky installed and `.husky/pre-commit` hook exists
  - lint-staged configured in `package.json`
  - Committing code with lint errors is blocked
- [ ] Pending

#### Task 1.1.6 — Initialize Git Repository
- **Description:** Initialize git, create `.gitignore` (ignoring `.env.local`, `.next/`, `node_modules/`), make initial commit.
- **Priority:** P0
- **Dependencies:** 1.1.1
- **Acceptance Criteria:**
  - `git log` shows initial commit
  - `.gitignore` correctly ignores sensitive and build files
  - `main` branch exists
- [ ] Pending

---

### 1.2 Folder Structure

#### Task 1.2.1 — Create Full Directory Structure
- **Description:** Create all directories defined in `docs/architecture.md` Section 12: `src/components/{atoms,molecules,organisms}`, `src/data/`, `src/hooks/`, `src/lib/`, `src/types/`, `public/images/{hero,services,portfolio,team,technologies,og}/`.
- **Priority:** P0
- **Dependencies:** 1.1.1
- **Acceptance Criteria:**
  - All directories exist (even if empty)
  - Each directory has a `.gitkeep` or a placeholder file to be tracked by git
- [ ] Pending

#### Task 1.2.2 — Create Data File Scaffolds
- **Description:** Create empty but typed TypeScript data files in `/src/data/`: `services.ts`, `portfolio.ts`, `team.ts`, `technologies.ts`, `industries.ts`, `testimonials.ts`, `faqs.ts`, `navigation.ts`, `metadata.ts`.
- **Priority:** P0
- **Dependencies:** 1.2.1, 1.3.2
- **Acceptance Criteria:**
  - All files exist with exported arrays/objects
  - Types imported from `/src/types/`
  - TypeScript compiles without errors
- [ ] Pending

#### Task 1.2.3 — Create Type Definition Files
- **Description:** Create TypeScript interface files in `/src/types/`: `service.ts`, `portfolio.ts`, `team.ts`, `common.ts`.
- **Priority:** P0
- **Dependencies:** 1.2.1
- **Acceptance Criteria:**
  - All interface files exist and export correct types
  - `service.ts` exports `Service`, `ProcessStep`, `Benefit` interfaces
  - `portfolio.ts` exports `Project`, `CaseStudy` interfaces
  - `team.ts` exports `TeamMember` interface
  - `common.ts` exports shared utility types
- [ ] Pending

---

### 1.3 Design Tokens and Configuration

#### Task 1.3.1 — Configure Tailwind Design System
- **Description:** Extend `tailwind.config.ts` with all custom values from `docs/design.md` Section 22: colors, fonts, box shadows, border radius, font sizes.
- **Priority:** P0
- **Dependencies:** 1.1.1
- **Acceptance Criteria:**
  - All brand colors available as Tailwind utility classes (`bg-charcoal`, `text-orange`, etc.)
  - Custom font sizes (`text-display-2xl`, etc.) available
  - Custom shadows available
  - TypeScript does not throw errors on config file
- [ ] Pending

#### Task 1.3.2 — Configure Global Styles
- **Description:** Set up `src/app/globals.css` with: CSS custom properties, Tailwind base/components/utilities directives, global reset overrides, selection color, scrollbar styling, focus ring styles.
- **Priority:** P0
- **Dependencies:** 1.3.1
- **Acceptance Criteria:**
  - CSS custom properties defined for all design tokens
  - Body font applied globally
  - Selection color matches orange accent
  - Smooth scroll behaviour enabled
- [ ] Pending

#### Task 1.3.3 — Configure Fonts
- **Description:** Configure `next/font/google` for Manrope (headings) and Inter (body). Apply font CSS variables to `<html>` element in `layout.tsx`.
- **Priority:** P0
- **Dependencies:** 1.3.1, 1.1.1
- **Acceptance Criteria:**
  - Fonts load correctly in browser
  - CSS variables `--font-manrope` and `--font-inter` available
  - No FOUT (Flash of Unstyled Text) — fonts preloaded correctly
  - Only required weights loaded
- [ ] Pending

#### Task 1.3.4 — Create Animation Variants Library
- **Description:** Create `/src/lib/animations.ts` with all standard Framer Motion variants: `fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`, `slideInLeft`, `slideInRight`.
- **Priority:** P0
- **Dependencies:** 1.1.3
- **Acceptance Criteria:**
  - File exports all variants as typed Framer Motion `Variants` objects
  - Spring configs exported
  - `prefers-reduced-motion` helper exported
- [ ] Pending

#### Task 1.3.5 — Create Utility Functions
- **Description:** Create `/src/lib/utils.ts` with: `cn()` (Tailwind class merge), `generateSlug()`, `truncate()`, and any other shared utilities.
- **Priority:** P0
- **Dependencies:** 1.1.3
- **Acceptance Criteria:**
  - `cn()` correctly merges Tailwind classes using `clsx` + `tailwind-merge`
  - All utilities are typed
  - TypeScript compiles without errors
- [ ] Pending

---

### 1.4 Root Layout and Metadata

#### Task 1.4.1 — Configure Root Layout
- **Description:** Set up `src/app/layout.tsx` with: font variables, `<html>` lang attribute (`en`), Providers wrapper, Navbar import (placeholder), Footer import (placeholder), Google Analytics script (conditional).
- **Priority:** P0
- **Dependencies:** 1.3.3
- **Acceptance Criteria:**
  - Root layout renders without errors
  - `<html lang="en">` set
  - Font classes applied to `<body>`
- [ ] Pending

#### Task 1.4.2 — Configure Site Metadata
- **Description:** Create `/src/lib/seo.ts` with helper functions. Configure default metadata in `layout.tsx` and page-level metadata in `page.tsx` files. Include Open Graph and Twitter Card meta.
- **Priority:** P0
- **Dependencies:** 1.4.1, 1.2.2
- **Acceptance Criteria:**
  - `<title>` and `<meta name="description">` render correctly
  - Open Graph tags present
  - Twitter Card tags present
  - Canonical URL set
- [ ] Pending

#### Task 1.4.3 — Create .env Files
- **Description:** Create `.env.example` with all required variable names (no real values) and `.env.local` (gitignored) with local development values.
- **Priority:** P0
- **Dependencies:** None
- **Acceptance Criteria:**
  - `.env.example` committed to repo
  - `.env.local` in `.gitignore`
  - `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_NAME` configured
- [ ] Pending

---

**Phase 1 Completion Criteria:** `pnpm dev` runs without errors, design tokens are active, folder structure is complete, git is initialized with correct `.gitignore`.

---

## Phase 2 — Core UI Components
**Goal:** Build the highest-priority visible sections: Navbar, Hero, Services Grid, Portfolio preview, Team Section.
**Status:** ⏳ Not Started
**Dependencies:** Phase 1 complete

---

### 2.1 Atom Components

#### Task 2.1.1 — Button Component
- **Description:** Build the `Button` atom with variants (primary, secondary, ghost), sizes (sm, md, lg), loading state, disabled state, and optional icon support.
- **Priority:** P0
- **Dependencies:** Phase 1
- **Acceptance Criteria:**
  - All variants render correctly
  - Loading state shows spinner and disables interaction
  - Keyboard accessible (Enter/Space to activate)
  - Hover and focus styles match design system
  - `className` prop for extension
- [ ] Pending

#### Task 2.1.2 — SectionHeading Component
- **Description:** Build a reusable `SectionHeading` component that renders the eyebrow label + main heading + optional description paragraph with consistent styling and entrance animation.
- **Priority:** P0
- **Dependencies:** Phase 1
- **Acceptance Criteria:**
  - Eyebrow text (uppercase, orange) optional
  - Main heading styled correctly
  - Description text optional
  - Text alignment configurable (left, center)
  - Framer Motion entrance animation
- [ ] Pending

#### Task 2.1.3 — Badge and Tag Components
- **Description:** Build small `Badge` and `Tag` atom components for categories, technologies, and status labels.
- **Priority:** P1
- **Dependencies:** Phase 1
- **Acceptance Criteria:**
  - Badge: filled background, various colors
  - Tag: outlined or subtle, for technology labels
  - Both responsive and accessible
- [ ] Pending

#### Task 2.1.4 — AnimatedText Component
- **Description:** Optional — Build an animated text component for the hero headline with word-by-word or character-by-character reveal.
- **Priority:** P2
- **Dependencies:** Phase 1, 2.1.1
- **Acceptance Criteria:**
  - Text reveals smoothly on mount
  - Respects `prefers-reduced-motion` (shows text instantly)
- [ ] Pending

---

### 2.2 Navbar

#### Task 2.2.1 — Navbar Component (Desktop)
- **Description:** Build the desktop `Navbar` organism: floating rounded glassmorphism bar with logo, navigation links, and orange Contact CTA button.
- **Priority:** P0
- **Dependencies:** 2.1.1, Phase 1
- **Acceptance Criteria:**
  - Correct visual appearance (glassmorphism, rounded, floating)
  - Fixed position at top of viewport
  - Logo on left, links in centre/right, CTA rightmost
  - Scroll behavior: transparent → glass/dark after 80px
  - Navigation links match the sitemap
  - Active page link highlighted
- [ ] Pending

#### Task 2.2.2 — Navbar Dropdown Menus
- **Description:** Implement dropdown menus for "Services" and potentially "Technologies" navigation items.
- **Priority:** P0
- **Dependencies:** 2.2.1
- **Acceptance Criteria:**
  - Dropdown appears on hover (desktop) or click
  - Lists all services with icon + name + tagline
  - Correct visual styling (dark background, rounded)
  - Framer Motion animation (fade in + slide down)
  - Closes on click outside
  - Closes on Escape key
  - ARIA attributes correct (`aria-expanded`, `aria-haspopup`)
- [ ] Pending

#### Task 2.2.3 — Mobile Navigation Menu
- **Description:** Implement mobile hamburger menu with full-screen or slide-in overlay, accordion sub-menus.
- **Priority:** P0
- **Dependencies:** 2.2.1
- **Acceptance Criteria:**
  - Hamburger icon visible on screens < 1024px
  - Menu opens/closes with animation
  - All nav links accessible
  - Services dropdown expands inline (accordion)
  - Body scroll locked when menu is open
  - Closes on navigation to a new page
  - Focus trapped within open menu
- [ ] Pending

---

### 2.3 Hero Section

#### Task 2.3.1 — Hero Section Layout
- **Description:** Build the `HeroSection` organism with headline, description, dual CTAs, and placeholder areas for device mockups.
- **Priority:** P0
- **Dependencies:** 2.1.1, 2.1.2, Phase 1
- **Acceptance Criteria:**
  - Responsive layout (text left, devices right on desktop; stacked on mobile)
  - Typography matches design system
  - Both CTA buttons functional and link correctly
  - Background effects (subtle grain, grid, soft glow)
  - Accessible heading hierarchy (H1)
- [ ] Pending

#### Task 2.3.2 — Device Mockup Components
- **Description:** Build the `DeviceMockup` molecule for the laptop and smartphone frames with screen content areas.
- **Priority:** P0
- **Dependencies:** 2.3.1, Phase 1
- **Acceptance Criteria:**
  - Laptop and smartphone frames render correctly
  - Screen content area accepts arbitrary content
  - CSS 3D perspective applied (slight initial angle)
  - Device shadow (shadow-device) applied
  - WebP images optimized via next/image
- [ ] Pending

#### Task 2.3.3 — 3D Parallax Interaction
- **Description:** Implement cursor-based parallax effect on hero device mockups using Framer Motion `useMotionValue`, `useTransform`, `useSpring`.
- **Priority:** P0
- **Dependencies:** 2.3.2, 1.3.4
- **Acceptance Criteria:**
  - Devices rotate subtly on mouse move (max ±10°)
  - Spring physics smooth the motion
  - Devices return to initial position on mouse leave
  - Disabled on touch/coarse pointer devices
  - Disabled when `prefers-reduced-motion: reduce`
  - No performance degradation (stable 60fps)
- [ ] Pending

---

### 2.4 Services Section (Bento Grid)

#### Task 2.4.1 — ServiceCard Component
- **Description:** Build the `ServiceCard` molecule with: icon, heading, description, hover animation, interactive arrow, and link.
- **Priority:** P0
- **Dependencies:** 2.1.1, 2.1.3, Phase 1
- **Acceptance Criteria:**
  - Card renders all content correctly
  - Hover: border → orange tint, scale, arrow animates
  - Links to `/services/[slug]`
  - Accessible (keyboard navigable, ARIA)
  - Works in different bento sizes (accepts span classes via `className`)
- [ ] Pending

#### Task 2.4.2 — ServicesGrid Section
- **Description:** Build the `ServicesGrid` organism that arranges 8 `ServiceCard` components in a bento-grid layout.
- **Priority:** P0
- **Dependencies:** 2.4.1, 1.2.2
- **Acceptance Criteria:**
  - Bento grid layout on desktop (mixed card sizes)
  - 2-column grid on tablet
  - Single column on mobile
  - Stagger entrance animation on scroll
  - Section heading with eyebrow
- [ ] Pending

---

### 2.5 Portfolio Section (Homepage Preview)

#### Task 2.5.1 — ProjectCard Component
- **Description:** Build the `ProjectCard` molecule with: project image, category badge, title, description, and link.
- **Priority:** P1
- **Dependencies:** 2.1.3, Phase 1
- **Acceptance Criteria:**
  - Image hover zoom effect
  - Card lift on hover
  - Category badge styled correctly
  - "Coming Soon" state available when no real projects exist
  - Accessible
- [ ] Pending

#### Task 2.5.2 — Portfolio Preview Section (Homepage)
- **Description:** Build the `PortfolioSection` organism for the homepage showing 3–4 featured projects.
- **Priority:** P1
- **Dependencies:** 2.5.1, 1.2.2
- **Acceptance Criteria:**
  - Shows real projects from data file (if any) or "Coming Soon" state
  - "View All Work" CTA links to `/portfolio`
  - Responsive grid layout
  - Scroll entrance animation
- [ ] Pending

---

### 2.6 Team Section

#### Task 2.6.1 — TeamCard Component
- **Description:** Build the `TeamCard` molecule for founder presentation with photo, name, designation, and brief bio.
- **Priority:** P1
- **Dependencies:** Phase 1
- **Acceptance Criteria:**
  - Photo displays correctly (background removed if provided)
  - Geometric background element behind photo
  - Name and designation displayed
  - Bio text displayed (or "Biography coming soon" placeholder if not provided)
  - Hover interaction (subtle)
- [ ] Pending

#### Task 2.6.2 — TeamSection Organism
- **Description:** Build the `TeamSection` organism displaying both founding team members.
- **Priority:** P1
- **Dependencies:** 2.6.1
- **Acceptance Criteria:**
  - Two team cards displayed side-by-side on desktop
  - Single column on mobile
  - Section heading and description
  - Scroll entrance animation
  - No placeholder names or invented designations — uses data from `team.ts`
- [ ] Pending

---

**Phase 2 Completion Criteria:** Homepage renders Navbar, Hero (with parallax), Services Grid, Portfolio preview, and Team section. All sections responsive. No TypeScript or ESLint errors.

---

## Phase 3 — Remaining Homepage Sections
**Goal:** Complete all remaining homepage sections.
**Status:** ⏳ Not Started
**Dependencies:** Phase 2 substantially complete

---

### 3.1 Trust / Company Highlights Section
- **Description:** Section communicating agency positioning. No fake stats. Use configurable highlights (years, countries, etc.) or omit metric display until real data provided.
- **Priority:** P1 | **Dependencies:** Phase 1 | [ ] Pending

### 3.2 Why Choose Us Section
- **Description:** 4–6 differentiating value propositions with icon + heading + description. Content must be real and accurate.
- **Priority:** P0 | **Dependencies:** Phase 1 | [ ] Pending

### 3.3 Development Process Section
- **Description:** Numbered/step visual process: Discovery → Planning → Design → Development → Testing → Launch → Maintenance.
- **Priority:** P1 | **Dependencies:** Phase 1 | [ ] Pending

### 3.4 Technology Stack Section
- **Description:** Visual grid of technologies grouped by category (Frontend, Backend, AI/ML, Mobile, Cloud, Databases, DevOps). Official tech logos with hover color effect.
- **Priority:** P1 | **Dependencies:** 1.2.2 | [ ] Pending

### 3.5 Industries We Serve Section
- **Description:** Icon + label cards for 8 industries. Optionally links to industry-specific pages.
- **Priority:** P2 | **Dependencies:** 1.2.2 | [ ] Pending

### 3.6 Testimonials Section
- **Description:** Build the section component; render real testimonials from data file. If data array is empty, do not render the section (or render a placeholder) — never use fake testimonials.
- **Priority:** P1 | **Dependencies:** 1.2.2 | [ ] Pending

### 3.7 FAQ Section
- **Description:** Accordion component with 6–8 pre-approved FAQ items covering pricing, process, timeline, IP, communication.
- **Priority:** P1 | **Dependencies:** 1.2.2 | [ ] Pending

### 3.8 Contact Section (Homepage)
- **Description:** Short section with a compelling CTA and inline "Start a Conversation" prompt linking to the contact page. Optional: embed a mini 2-field form.
- **Priority:** P0 | **Dependencies:** Phase 1 | [ ] Pending

### 3.9 Footer
- **Description:** Full agency footer with: logo + tagline, service links, company links, legal links, social icons, copyright, optional WhatsApp floating button.
- **Priority:** P0 | **Dependencies:** Phase 1 | [ ] Pending

---

**Phase 3 Completion Criteria:** Full homepage is complete with all sections. Can be reviewed end-to-end.

---

## Phase 4 — Inner Pages
**Goal:** Build all service pages, portfolio pages, contact page, and about page.
**Status:** ⏳ Not Started
**Dependencies:** Phase 3 substantially complete

---

### 4.1 Contact Page
- **Description:** Full contact page with `ContactForm` organism, contact details section, optional embedded map.
- **Priority:** P0 | **Dependencies:** Phase 1, Phase 2 Navbar/Footer | [ ] Pending

### 4.2 Contact Form — Full Implementation
- **Description:** React Hook Form + Zod validated contact form with all fields, honeypot, GDPR consent, loading/success/error states.
- **Priority:** P0 | **Dependencies:** 4.1 | [ ] Pending

### 4.3 Contact API Route
- **Description:** `POST /api/contact` server route with Zod validation, honeypot check, Resend email delivery, rate limiting.
- **Priority:** P0 | **Dependencies:** 4.2 | [ ] Pending

### 4.4 Service Pages — All 11 Services
- **Description:** Generate all 11 service pages via `generateStaticParams()` from `services.ts` data. Each page includes hero, overview, deliverables, tech, process, benefits, related portfolio, FAQ, CTA.
- **Priority:** P0 | **Dependencies:** 1.2.2, Phase 2 Navbar/Footer | [ ] Pending

### 4.5 Services Overview Page
- **Description:** `/services` listing page showing all services in a grid.
- **Priority:** P1 | **Dependencies:** 4.4 | [ ] Pending

### 4.6 Portfolio Listing Page
- **Description:** `/portfolio` page with grid layout, filter by service category, and graceful empty state.
- **Priority:** P1 | **Dependencies:** 2.5.1, 1.2.2 | [ ] Pending

### 4.7 Portfolio Case Study Pages
- **Description:** Individual `/portfolio/[slug]` pages with challenge, solution, technologies, results, related projects.
- **Priority:** P1 | **Dependencies:** 4.6 | [ ] Pending

### 4.8 About Page
- **Description:** Agency story, mission, values, team section (reuse component), CTA.
- **Priority:** P1 | **Dependencies:** 2.6.2, Phase 1 | [ ] Pending

### 4.9 Technologies Page
- **Description:** `/technologies` page with full technology stack by category.
- **Priority:** P2 | **Dependencies:** 3.4 | [ ] Pending

### 4.10 Industries Pages
- **Description:** `/industries` overview + individual industry pages (if required).
- **Priority:** P2 | **Dependencies:** 3.5 | [ ] Pending

### 4.11 404 Not Found Page
- **Description:** Custom `not-found.tsx` with agency branding and navigation back to homepage.
- **Priority:** P1 | **Dependencies:** Phase 1 | [ ] Pending

### 4.12 Error Page
- **Description:** Custom `error.tsx` with agency branding.
- **Priority:** P1 | **Dependencies:** Phase 1 | [ ] Pending

---

## Phase 5 — Interactions and Animations
**Goal:** Polish all interactive states, animations, and advanced interactions.
**Status:** ⏳ Not Started
**Dependencies:** Phase 4 substantially complete

---

### 5.1 — Navigation Interactions
- Navbar scroll behavior (transparent → glass) — [ ] Pending
- Dropdown open/close animation refinement — [ ] Pending
- Mobile menu slide animation refinement — [ ] Pending
- Active link state per page — [ ] Pending

### 5.2 — Scroll Animations Audit
- Verify all sections use correct animation variants from `animations.ts` — [ ] Pending
- Ensure `viewport={{ once: true }}` on all scroll animations — [ ] Pending
- Verify `prefers-reduced-motion` respected on all animations — [ ] Pending

### 5.3 — Hover Effects Audit
- Service cards hover — [ ] Pending
- Portfolio cards hover + image zoom — [ ] Pending
- Button hover states (all variants) — [ ] Pending
- Technology logo hover (grayscale → colour) — [ ] Pending
- Footer link hover — [ ] Pending

### 5.4 — Hero 3D Parallax Polish
- Smooth spring tuning — [ ] Pending
- Mobile fallback (static angle display) — [ ] Pending
- Verify no jitter on high-DPI screens — [ ] Pending

### 5.5 — Form Interactions
- Real-time validation feedback — [ ] Pending
- Loading spinner state — [ ] Pending
- Success state animation — [ ] Pending
- Error state display — [ ] Pending

### 5.6 — FAQ Accordion Polish
- Smooth height animation — [ ] Pending
- Icon rotate animation (+ → ×) — [ ] Pending

### 5.7 — Page Transitions
- Implement subtle fade/slide page transition — [ ] Pending (optional — verify performance)

---

## Phase 6 — Optimization
**Goal:** Meet all performance, accessibility, and SEO requirements.
**Status:** ⏳ Not Started
**Dependencies:** Phase 5 substantially complete

---

### 6.1 Responsive Testing
- [ ] Test at 375px (iPhone SE) — Pending
- [ ] Test at 390px (iPhone 14) — Pending
- [ ] Test at 768px (iPad) — Pending
- [ ] Test at 1024px (iPad Pro / Small laptop) — Pending
- [ ] Test at 1280px (Standard desktop) — Pending
- [ ] Test at 1440px (Large desktop) — Pending
- [ ] Test at 1920px (Wide monitor) — Pending

### 6.2 Accessibility Audit
- [ ] All interactive elements keyboard navigable — Pending
- [ ] All images have alt text — Pending
- [ ] All form inputs have labels — Pending
- [ ] Color contrast passes WCAG AA — Pending
- [ ] Focus indicators visible — Pending
- [ ] Dropdown ARIA correct — Pending
- [ ] Screen reader test (VoiceOver / NVDA) — Pending

### 6.3 SEO Implementation
- [ ] Unique title/meta description per page — Pending
- [ ] Open Graph tags — Pending
- [ ] Twitter Card tags — Pending
- [ ] Structured data (Organization) — Pending
- [ ] Structured data (Service pages) — Pending
- [ ] XML sitemap at /sitemap.xml — Pending
- [ ] robots.txt — Pending
- [ ] Canonical tags — Pending

### 6.4 Performance Optimization
- [ ] All images via next/image with correct dimensions — Pending
- [ ] Hero images use `priority` prop — Pending
- [ ] Run Lighthouse — target ≥ 90 Performance — Pending
- [ ] Check bundle size — Pending
- [ ] Verify no unnecessary client components — Pending
- [ ] Font loading optimized (no FOUT) — Pending

### 6.5 Security Checklist
- [ ] No secrets in client code — Pending
- [ ] Contact form honeypot working — Pending
- [ ] Rate limiting active on contact API — Pending
- [ ] CSP headers configured — Pending
- [ ] Security headers verified — Pending
- [ ] `.env.local` not committed — Pending

### 6.6 Cross-Browser Testing
- [ ] Chrome (latest) — Pending
- [ ] Firefox (latest) — Pending
- [ ] Safari (latest) — Pending
- [ ] Edge (latest) — Pending
- [ ] iOS Safari — Pending
- [ ] Android Chrome — Pending

---

## Phase 7 — Deployment
**Goal:** Deploy the production-ready website.
**Status:** ⏳ Not Started
**Dependencies:** Phase 6 complete and all acceptance criteria met

---

### 7.1 Production Configuration
- [ ] `next.config.ts` production settings (strict mode, security headers) — Pending
- [ ] Verify `NEXT_PUBLIC_SITE_URL` set to production domain — Pending
- [ ] Verify all environment variables set in Vercel Dashboard — Pending

### 7.2 Pre-Deployment Checklist
- [ ] `pnpm build` succeeds without errors or warnings — Pending
- [ ] No TypeScript errors (`tsc --noEmit`) — Pending
- [ ] No ESLint errors (`pnpm lint`) — Pending
- [ ] Lighthouse Performance ≥ 90 — Pending
- [ ] All contact form flows tested end-to-end — Pending
- [ ] All navigation links verified — Pending
- [ ] All forms verified — Pending

### 7.3 Vercel Deployment
- [ ] Vercel project created and linked to GitHub repository — Pending
- [ ] Production environment variables configured in Vercel — Pending
- [ ] Custom domain configured in Vercel — Pending
- [ ] SSL certificate active — Pending
- [ ] www → non-www redirect working (or vice versa) — Pending

### 7.4 DNS Configuration
- [ ] Domain pointed to Vercel — Pending
- [ ] DNS propagation confirmed — Pending
- [ ] HTTPS working on custom domain — Pending

### 7.5 Post-Launch Verification
- [ ] All pages load on production domain — Pending
- [ ] Contact form submits and email received — Pending
- [ ] Google Analytics tracking active — Pending
- [ ] No 404 errors in Vercel logs — Pending
- [ ] Mobile experience verified on real devices — Pending

### 7.6 Search Engine Submission
- [ ] Submit sitemap to Google Search Console — Pending
- [ ] Submit sitemap to Bing Webmaster Tools — Pending
- [ ] Verify site ownership — Pending

---

## Post-MVP Backlog

| Task | Priority | Notes |
|------|----------|-------|
| Blog / Insights CMS (Sanity) | P1 | After launch |
| Real testimonials section | P1 | Once collected |
| WhatsApp floating button | P2 | Quick win |
| Live chat widget | P2 | Crisp or Intercom |
| Newsletter subscription | P2 | Resend Broadcasts |
| Client portal | P3 | After business need confirmed |
| Multi-language support | P3 | Evaluate market demand |
| Project cost estimator | P3 | Interactive tool |
| Booking/scheduling (Calendly) | P2 | Quick win |
