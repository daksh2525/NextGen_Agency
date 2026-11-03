# AI Development Rules and Coding Standards
**NextGen Agency — Software Development Agency Website**
**Version:** 2.2.0
**Status:** Active — Mandatory
**Last Updated:** 2026-11-03

---

> [!IMPORTANT]
> These rules are **mandatory** for all AI coding sessions and human contributors working on this project. Read this file before beginning any implementation task.

---

## Table of Contents
1. [Session Startup Protocol](#1-session-startup-protocol)
2. [Architecture Rules](#2-architecture-rules)
3. [Code Quality Standards](#3-code-quality-standards)
4. [TypeScript Rules](#4-typescript-rules)
5. [Component Rules](#5-component-rules)
6. [Styling Rules](#6-styling-rules)
7. [Animation Rules](#7-animation-rules)
8. [Data Rules](#8-data-rules)
9. [API and Backend Rules](#9-api-and-backend-rules)
10. [Security Rules](#10-security-rules)
11. [Performance Rules](#11-performance-rules)
12. [Accessibility Rules](#12-accessibility-rules)
13. [Testing and Verification Rules](#13-testing-and-verification-rules)
14. [Documentation Rules](#14-documentation-rules)
15. [Git and Branching Rules](#15-git-and-branching-rules)
16. [Prohibited Actions](#16-prohibited-actions)
17. [Completion Checklist](#17-completion-checklist)

---

## 1. Session Startup Protocol

**Every AI coding session MUST follow this exact startup sequence:**

1. **Read `docs/memory.md`** — Understand the current project state, completed work, pending tasks, and active decisions.
2. **Read relevant feature docs** — If implementing a section, read the corresponding requirements in `docs/prd.md`.
3. **Read `docs/design.md`** — Verify design tokens, color palette, spacing, and component specifications before building UI.
4. **Read `docs/architecture.md`** — Confirm the folder structure, component hierarchy, and technology decisions.
5. **Read `docs/tasks.md`** — Identify the current phase and the specific task to work on.
6. **Read `docs/security.md`** — Before implementing any form, API route, or user-facing input.
7. **Inspect existing code** — Before writing any new component, check if a similar component already exists.
8. **Confirm the task scope** with the user before beginning if there is any ambiguity.

> [!CAUTION]
> Do NOT begin implementing a feature without completing all steps above. Failure to read existing documentation leads to duplicate work, inconsistent design, and broken architecture.

---

## 2. Architecture Rules

### R-ARCH-001: Follow the Established Architecture
- All code must conform to the architecture described in `docs/architecture.md`.
- Do not introduce new architectural patterns without documenting the reason and getting user approval.
- Do not mix App Router and Pages Router patterns.

### R-ARCH-002: Folder Structure Compliance
- New components must be placed in the correct directory: `atoms/`, `molecules/`, `organisms/`.
- New data files must be placed in `/src/data/`.
- New hooks must be placed in `/src/hooks/`.
- New utility functions must be placed in `/src/lib/`.
- Do not create files in arbitrary locations.

### R-ARCH-003: Technology Stack Compliance
- Use only the approved technology stack. See `docs/architecture.md` Section 2.
- Do not introduce new dependencies without:
  1. Justifying the addition
  2. Confirming no existing library covers the need
  3. Verifying the library's bundle size impact
  4. Getting approval from the project owner

### R-ARCH-004: No Unnecessary Backend
- Do not add database connections, authentication systems, or server infrastructure unless explicitly required by a new business requirement.
- Contact form is the only server-side operation at MVP.

### R-ARCH-005: Static Data First
- All website content is defined in TypeScript data files in `/src/data/`.
- Do not hardcode content directly into component files (except truly static labels).
- CMS integration is post-MVP — do not pre-build CMS dependencies.

---

## 3. Code Quality Standards

### R-CODE-001: Clean Code
- Write self-documenting code. Code should be readable without needing comments to explain what it does.
- Comments explain *why*, not *what*.
- Remove all `console.log` statements, unused imports, and dead code before completing a task.
- No commented-out code in committed files.

### R-CODE-002: DRY (Don't Repeat Yourself)
- Before writing a new component, check if an existing one can be reused or extended.
- Extract repeated logic into shared utilities or custom hooks.
- Extract repeated UI patterns into reusable components.

### R-CODE-003: Single Responsibility
- Each component, hook, or utility should do one thing and do it well.
- If a function grows beyond 40–50 lines of logic, consider refactoring.

### R-CODE-004: No Magic Numbers or Strings
- Define constants for repeated values (animation durations, breakpoints, z-indexes).
- Use Tailwind config tokens for all design values — no inline px values that bypass the design system.

### R-CODE-005: Error Handling
- Every async operation must have error handling.
- API routes must return structured error responses.
- Client components must handle loading, error, and empty states.
- Never expose raw error messages or stack traces to the user.

### R-CODE-006: Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ServiceCard`, `HeroSection` |
| Hooks | camelCase with `use` prefix | `useMousePosition`, `useScrollY` |
| Utilities | camelCase | `formatDate`, `generateSlug` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FORM_LENGTH`, `ANIMATION_DURATION` |
| Types/Interfaces | PascalCase | `ServiceData`, `ContactFormPayload` |
| CSS classes | kebab-case (Tailwind) | `bg-charcoal`, `text-orange-primary` |
| Files | PascalCase for components, camelCase for utilities | `Button.tsx`, `animations.ts` |
| Data files | camelCase | `services.ts`, `navigation.ts` |

### R-CODE-007: Import Order
Maintain consistent import ordering:
1. React and Next.js core imports
2. Third-party library imports (alphabetical)
3. Local component imports
4. Local hook imports
5. Local utility/lib imports
6. Local type imports
7. Asset imports (SVG, images)

Use ESLint `import/order` rule to enforce this automatically.

---

## 4. TypeScript Rules

### R-TS-001: Strict TypeScript
- TypeScript strict mode is enabled. Do not disable it.
- No `any` types without a documented justification.
- Prefer `unknown` over `any` for truly unknown types.

### R-TS-002: Explicit Types for Public APIs
- All component props must have an explicitly typed interface.
- All function parameters and return types must be typed for non-trivial functions.
- All data file exports must be typed with the correct interface.

### R-TS-003: Type vs Interface
- Use `interface` for object shapes that may be extended.
- Use `type` for unions, intersections, mapped types, and utility types.
- Be consistent — don't mix randomly.

### R-TS-004: No Type Assertions Without Guards
- Avoid `value as Type` assertions unless you have verified the runtime type.
- Use type guards (`typeof`, `instanceof`, custom guards) for runtime safety.

### R-TS-005: Zod for Runtime Validation
- All form inputs and API payloads must be validated with Zod schemas.
- Zod schemas serve as the single source of truth for data shapes.
- Derive TypeScript types from Zod schemas: `z.infer<typeof schema>`.

---

## 5. Component Rules

### R-COMP-001: Server vs Client Components
- Default to **Server Components** in Next.js App Router.
- Add `'use client'` directive only when the component uses:
  - Browser APIs (window, document, localStorage)
  - React hooks (useState, useEffect, useReducer, useRef)
  - Event listeners
  - Framer Motion animations
  - Third-party client-only libraries
- Do not add `'use client'` to entire page files unnecessarily — keep client components as leaves in the component tree.

### R-COMP-002: Props Interface
Every component must have a typed props interface:
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

### R-COMP-003: Default Props
- Use default parameter values, not `defaultProps`.
- Document default values in the interface or with JSDoc.

### R-COMP-004: Composition Over Inheritance
- Build flexible components using the composition pattern (children props, render props).
- Do not create deeply inherited component hierarchies.

### R-COMP-005: Accessible HTML
- Use semantic HTML elements (`<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`).
- Do not use `<div>` or `<span>` where a semantic element is appropriate.
- Every interactive element must be keyboard accessible.
- Never remove focus outlines without replacing them with a visible alternative.

### R-COMP-006: Component Index Files
Every component directory must have an `index.ts` that re-exports the component:
```typescript
// /src/components/atoms/Button/index.ts
export { Button } from './Button';
```

---

## 6. Styling Rules

### R-STYLE-001: Tailwind First
- Use Tailwind CSS utility classes for all styling.
- Do not write custom CSS unless Tailwind cannot achieve the required effect.
- Do not use inline `style` attributes for values that can be expressed as Tailwind classes.

### R-STYLE-002: Design System Compliance
- Only use colors defined in the design system (see `docs/design.md` and `tailwind.config.ts`).
- Do not introduce new colors that are not in the color palette.
- Use the typography scale defined in `tailwind.config.ts`.

### R-STYLE-003: Responsive Design Required
- Every component must be styled for all breakpoints (mobile, tablet, desktop).
- Use mobile-first approach: base styles for mobile, `md:`, `lg:`, `xl:` for larger screens.
- Test at 375px, 768px, 1024px, and 1440px minimum.

### R-STYLE-004: No Hardcoded Pixel Values
- All spacing, sizing, and font values must use Tailwind tokens.
- Do not write `style={{ margin: '24px' }}` — use `className="m-6"`.

### R-STYLE-005: Dark Section / Light Section Contrast
- Maintain clear visual distinction between dark and light sections.
- Ensure text always has sufficient contrast against its background (WCAG AA minimum).
- Do not place light text on light backgrounds.

---

## 7. Animation Rules

### R-ANIM-001: Framer Motion for React Animations
- Use Framer Motion for all component animations, transitions, and scroll effects.
- Do not use CSS keyframe animations for element transitions that Framer Motion handles.
- Do not use jQuery or CSS animation libraries.

### R-ANIM-002: Centralized Animation Variants
- Define animation variants in `/src/lib/animations.ts`.
- Import and reuse variants across components — do not define duplicate variants.

### R-ANIM-003: Respect User Preferences
- Every animated component must check `prefers-reduced-motion`.
- Use Framer Motion's `useReducedMotion()` hook.
- When reduced motion is preferred, disable or simplify animations (fade only, no movement).

### R-ANIM-004: Performance-Safe Properties
- Only animate `transform` (translate, rotate, scale) and `opacity`.
- Never animate `width`, `height`, `margin`, `padding`, `top`, `left` directly — these trigger layout.
- Use `layout` prop carefully — only where layout animations are intentional.

### R-ANIM-005: 3D Parallax Limits
- Mouse-based parallax on the hero section must have a maximum rotation of ±10 degrees.
- Apply spring physics for smooth deceleration.
- Disable parallax on mobile/touch devices.
- Restore to initial position on mouse leave.

### R-ANIM-006: No Infinite Animations Without Purpose
- Do not add continuous looping animations without a clear UX reason.
- If a looping animation is used, ensure it can be paused.

---

## 8. Data Rules

### R-DATA-001: No Fabricated Data
- Do not create fake client logos, testimonials, case study results, or statistics.
- If real data is not available, use placeholder components that are clearly marked as "coming soon" or configurable.
- Do not commit fabricated metrics as if they were real.

### R-DATA-002: Data in Data Files
- All website content is stored in `/src/data/*.ts` files.
- Do not hardcode content strings directly in component JSX (except static UI labels).
- Component files receive data as props, not by importing data files directly inside JSX.

### R-DATA-003: Team Member Information
- Do not invent names, designations, qualifications, or experience for team members.
- Team data fields should be left with clear `// TODO: Fill in real data` comments until provided.

### R-DATA-004: Portfolio Data
- Do not create fake portfolio projects.
- If no real projects exist at launch, use an empty array and render a "Projects coming soon" state.

---

## 9. API and Backend Rules

### R-API-001: Server-Side Validation Always
- All API routes must validate input with Zod before processing.
- Never trust client-submitted data without validation.

### R-API-002: Structured Error Responses
- All API responses must follow the structure defined in `docs/architecture.md`.
- Success: `{ success: true, message: string }`
- Error: `{ success: false, error: string }`

### R-API-003: Rate Limiting
- The contact form API route must implement rate limiting.
- Use Upstash Redis middleware or simple in-memory limiting for MVP.

### R-API-004: No Secrets in Client Code
- API keys, email service tokens, and credentials must never appear in client-side code.
- All sensitive operations happen in server-side API routes only.

### R-API-005: CORS
- API routes must restrict CORS to the production domain.
- Do not use wildcard (`*`) CORS in production.

---

## 10. Security Rules

> See `docs/security.md` for the complete security specification.

### R-SEC-001: No Hardcoded Secrets
- Zero tolerance for hardcoded API keys, passwords, tokens, or credentials in source code.
- All secrets managed via environment variables.

### R-SEC-002: Input Sanitization
- All user inputs must be sanitized and validated before processing or storing.
- Use Zod for schema-level validation.
- Sanitize HTML-like characters in free-text fields to prevent XSS.

### R-SEC-003: Honeypot Spam Protection
- Contact form must include a hidden honeypot field.
- Server validates that the honeypot field is empty before processing.

### R-SEC-004: No Sensitive Data in Logs
- Do not log full user contact submissions.
- Do not log email addresses, phone numbers, or personally identifiable information.

---

## 11. Performance Rules

### R-PERF-001: Image Optimization Mandatory
- All images must use `next/image` component — never a raw `<img>` tag.
- Provide accurate `width` and `height` attributes to prevent layout shift.
- Use `priority` prop only on above-the-fold images (LCP element).
- Use `loading="lazy"` for all below-fold images (default with `next/image`).

### R-PERF-002: Code Splitting
- Do not import large libraries in top-level code if they're only needed conditionally.
- Use dynamic imports (`next/dynamic`) for heavy components that are not needed on initial load.
- Use `next/dynamic` with `ssr: false` for client-only components that don't need SSR.

### R-PERF-003: Font Optimization
- Never use `<link>` tags for Google Fonts — use `next/font/google` exclusively.
- Limit font weights to only those actually used in the design.
- Limit loaded variants to `normal` and `italic` where sufficient.

### R-PERF-004: Bundle Size Awareness
- Check bundle size impact before adding a new dependency.
- Prefer tree-shakeable libraries.
- Prefer smaller alternatives (e.g., `date-fns` over `moment`, `lucide-react` over FontAwesome).

### R-PERF-005: Core Web Vitals Protection
- Never implement a feature that degrades Core Web Vitals below the targets in `docs/prd.md`.
- Run Lighthouse after implementing major sections.

---

## 12. Accessibility Rules

### R-A11Y-001: Semantic HTML
- Use correct HTML elements for their semantic meaning (see R-COMP-005).

### R-A11Y-002: ARIA Labels
- All icon-only buttons must have `aria-label`.
- All form inputs must have associated `<label>` elements.
- Modal dialogs must implement ARIA dialog pattern with focus trapping.
- All images must have descriptive `alt` text. Decorative images use `alt=""`.

### R-A11Y-003: Keyboard Navigation
- All interactive elements must be reachable and operable via keyboard.
- Tab order must be logical and follow visual flow.
- Dropdown menus must close on `Escape` key.
- Modals must return focus to the trigger element on close.

### R-A11Y-004: Color Contrast
- Text on coloured backgrounds must meet WCAG AA minimum contrast ratio.
  - Normal text: 4.5:1 minimum
  - Large text (18px+ or 14px+ bold): 3:1 minimum
- Do not rely on color alone to convey information.

### R-A11Y-005: Focus Indicators
- Never remove the browser's default focus ring without a visible replacement.
- Custom focus styles must be at least as visible as the browser default.

### R-A11Y-006: Reduced Motion
- All animations must check `prefers-reduced-motion`.
- Provide a static, no-motion fallback for all animated components.

---

## 13. Testing and Verification Rules

### R-TEST-001: Manual Verification Required
- Every implemented feature must be manually verified in the browser before marking complete.
- Verify on at least mobile (375px) and desktop (1440px) viewport widths.
- Test with keyboard navigation.
- Test form submission end-to-end.

### R-TEST-002: No Self-Declared Completeness
- An AI agent must NOT mark a task as complete in `tasks.md` without:
  1. The implementation being present in the codebase
  2. No TypeScript errors
  3. No ESLint errors
  4. The feature working correctly in the browser
  5. User confirmation or documented passing of acceptance criteria

### R-TEST-003: Console Cleanliness
- No `console.error`, `console.warn`, or `console.log` in production builds.
- All React key warnings, prop-type warnings, and hydration errors must be resolved.

### R-TEST-004: Lighthouse Benchmarks
- After completing a major section, run Lighthouse and document the score.
- Do not deploy if Performance score is below 85.

---

## 14. Documentation Rules

### R-DOC-001: Update memory.md
- After completing any significant task or making an architecture decision, update `docs/memory.md`.
- Record: what was done, decisions made, current status, next task.

### R-DOC-002: Update tasks.md
- When a task is verified complete, mark its checkbox `[x]` in `docs/tasks.md`.
- When a new task is identified, add it to the appropriate phase with all required fields.

### R-DOC-003: Update architecture.md on Changes
- If a technology is added or removed, update `docs/architecture.md`.
- If the folder structure changes, update the folder structure diagram.

### R-DOC-004: JSDoc for Public Components
- All components exported from `atoms/`, `molecules/`, and `organisms/` should have JSDoc comments on the component and its props interface.

### R-DOC-005: No Documentation Deletion
- Do not delete sections of documentation without a documented reason.
- Previous decisions must be preserved unless they are superseded by an explicit new decision.

---

## 15. Git and Branching Rules

### R-GIT-001: Branch Naming
```
feature/navbar-component
feature/hero-section
feature/contact-form
fix/navbar-mobile-menu
hotfix/contact-form-validation
chore/add-eslint-config
docs/update-architecture
```

### R-GIT-002: Commit Message Format
Follow Conventional Commits:
```
feat(navbar): add sticky glassmorphism navbar with dropdown menus
fix(hero): resolve parallax jitter on high-DPI screens
style(services): adjust bento grid gap for mobile breakpoint
docs(memory): update project status after hero section completion
chore(deps): add framer-motion and lucide-react
a11y(contact-form): add aria-describedby to all form fields
perf(images): convert hero mockup to WebP format
```

### R-GIT-003: No Direct Commits to Main
- All changes go through feature branches and pull requests.
- Main branch is always in a deployable state.

### R-GIT-004: .gitignore
The following must always be gitignored:
- `.env.local` and all `.env*.local` files
- `node_modules/`
- `.next/`
- `out/`
- Any file containing real credentials

---

## 16. Prohibited Actions

The following are **strictly forbidden** without explicit written approval:

| ❌ Prohibited | Why |
|-------------|-----|
| Hardcoding API keys, tokens, or passwords | Security vulnerability |
| Creating fake testimonials, stats, or client logos | Deceptive and legally risky |
| Inventing team member names, qualifications, or experience | Inaccurate representation |
| Modifying unrelated components while implementing a feature | Scope creep, regression risk |
| Adding `any` types to bypass TypeScript errors | Undermines type safety |
| Disabling ESLint rules inline (`eslint-disable`) without justification | Hides bugs |
| Removing or bypassing accessibility features | Violates WCAG compliance |
| Adding a new npm package without verifying alternatives | Bundle bloat |
| Marking a task complete without verification | False progress |
| Committing to main branch directly | Deployment risk |
| Using `!important` in CSS | Specificity chaos |
| Ignoring `prefers-reduced-motion` | Accessibility failure |
| Logging PII (emails, phone numbers) | Privacy violation |

---

## 17. Completion Checklist

Before declaring any feature or section complete, verify every item:

```
Code Quality
[ ] No TypeScript errors (tsc --noEmit passes)
[ ] No ESLint errors or warnings
[ ] No unused imports or variables
[ ] No console.log statements
[ ] Code follows naming conventions

Design Compliance
[ ] Colors match the design system
[ ] Typography matches the design system
[ ] Spacing uses Tailwind tokens
[ ] Component matches the PRD requirement

Functionality
[ ] Feature works correctly in the browser
[ ] All interactive elements function
[ ] Loading state implemented (if async)
[ ] Error state implemented (if async)
[ ] Empty state implemented (if data-driven)

Responsiveness
[ ] Works on mobile (375px)
[ ] Works on tablet (768px)
[ ] Works on desktop (1440px)

Accessibility
[ ] Keyboard navigable
[ ] ARIA labels present
[ ] Color contrast passes
[ ] Focus indicators visible
[ ] prefers-reduced-motion respected

Performance
[ ] Images use next/image
[ ] No new large dependencies added unnecessarily
[ ] Lighthouse score not degraded

Documentation
[ ] tasks.md updated
[ ] memory.md updated if significant change
[ ] architecture.md updated if structure changed
```
