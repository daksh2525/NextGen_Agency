# UI/UX Design System
**NextGen Agency — Software Development Agency Website**
**Version:** 1.0.0
**Status:** Active
**Last Updated:** 2026-11-02

---

## Table of Contents
1. [Brand Identity](#1-brand-identity)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Layout and Grid System](#5-layout-and-grid-system)
6. [Container Widths](#6-container-widths)
7. [Border Radius](#7-border-radius)
8. [Shadows and Glows](#8-shadows-and-glows)
9. [Buttons](#9-buttons)
10. [Navigation](#10-navigation)
11. [Cards](#11-cards)
12. [Forms](#12-forms)
13. [Icons](#13-icons)
14. [Illustrations and Mockups](#14-illustrations-and-mockups)
15. [Image Treatment](#15-image-treatment)
16. [Responsive Breakpoints](#16-responsive-breakpoints)
17. [Hover Effects](#17-hover-effects)
18. [Scroll Animations](#18-scroll-animations)
19. [3D Parallax Interactions](#19-3d-parallax-interactions)
20. [Accessibility Requirements](#20-accessibility-requirements)
21. [Section Theming](#21-section-theming)
22. [Tailwind Configuration Reference](#22-tailwind-configuration-reference)

---

## 1. Brand Identity

### Agency Name
**NextGen Agency** *(or as confirmed by client — update when final brand name is decided)*

### Brand Personality
- **Premium:** High quality, professional, polished
- **Technical:** Deep expertise, modern stack, AI-forward
- **Trustworthy:** Transparent, reliable, honest
- **Bold:** Confident, decisive, not generic
- **International:** Speaks to global clients while rooted in Indian engineering excellence

### Brand Tone
- Direct and confident
- Technically credible but accessible
- No corporate jargon
- No hype or overclaiming

### Design Philosophy
The visual design avoids the "generic AI agency" look — no overused purple gradients, no floating orb backgrounds, no stock photo hero images. Instead, it uses a confident dark/warm-white color system with strategic use of Electric Orange as an accent, communicating premium quality and technical seriousness.

---

## 2. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Charcoal Black** | `#171717` | 23, 23, 23 | Primary background, dark sections |
| **Electric Orange** | `#F0782B` | 240, 120, 43 | CTAs, highlights, icons, accents |
| **Warm White** | `#F7F5F0` | 247, 245, 240 | Light section backgrounds, body text on dark |
| **Pure White** | `#FFFFFF` | 255, 255, 255 | Card backgrounds, form backgrounds |
| **Muted Grey** | `#A1A1AA` | 161, 161, 170 | Secondary text, captions, placeholders |
| **Surface Grey** | `#292929` | 41, 41, 41 | Elevated cards on dark background, inputs |

### Extended Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Orange Dark** | `#D4671F` | Orange hover state |
| **Orange Light** | `#F5934A` | Orange tint, subtle highlights |
| **Orange Glow** | `rgba(240,120,43,0.15)` | Glow effects, card borders on hover |
| **Border Dark** | `#2E2E2E` | Borders on dark sections |
| **Border Light** | `#E4E2DD` | Borders on light sections |
| **Text Dark** | `#0A0A0A` | High-contrast text on light backgrounds |
| **Text Muted Dark** | `#71717A` | Secondary text on light backgrounds |

### Color Distribution (Target)

| Color | Target % | Sections |
|-------|----------|---------|
| Charcoal Black | ~45% | Hero, services, process, footer |
| Warm White | ~30% | Trust, why choose us, technologies, FAQ |
| Electric Orange | ~10% | CTAs, selected icons, highlights |
| Pure White | ~10% | Cards, form fields, overlays |
| Grey tones | ~5% | Secondary text, borders, separators |

### Color Usage Rules
- **Never** use orange as a background for large sections
- **Never** use orange text on a white/warm-white background without sufficient contrast testing
- Orange borders and outlines are acceptable for card hover states
- Maintain minimum contrast ratio of 4.5:1 for all body text
- Use `#A1A1AA` (Muted Grey) only for non-critical decorative or secondary text

---

## 3. Typography

### Font Stack

| Role | Font Family | Fallback |
|------|------------|---------|
| **Display / Hero Headings** | Manrope | Plus Jakarta Sans, Inter, system-ui |
| **Section Headings** | Manrope | Plus Jakarta Sans, Inter, system-ui |
| **Body Text** | Inter | system-ui, -apple-system, sans-serif |
| **UI Labels / Buttons / Nav** | Inter | system-ui, sans-serif |
| **Code / Technical** | JetBrains Mono | Fira Code, monospace |

*Load via `next/font/google`. Load Manrope for headings and Inter for body text.*

### Type Scale

| Name | Size (rem) | Size (px) | Weight | Line Height | Use Case |
|------|-----------|----------|--------|-------------|---------|
| `display-2xl` | 4.5rem | 72px | 800 | 1.1 | Hero headline (desktop) |
| `display-xl` | 3.5rem | 56px | 800 | 1.1 | Hero headline (tablet) |
| `display-lg` | 2.5rem | 40px | 700 | 1.2 | Section headings (desktop) |
| `display-md` | 2rem | 32px | 700 | 1.25 | Section headings (tablet) |
| `display-sm` | 1.5rem | 24px | 700 | 1.3 | Sub-section headings |
| `text-xl` | 1.25rem | 20px | 400–600 | 1.6 | Large body, lead paragraphs |
| `text-lg` | 1.125rem | 18px | 400 | 1.7 | Standard body text |
| `text-base` | 1rem | 16px | 400 | 1.7 | Default body text |
| `text-sm` | 0.875rem | 14px | 400–500 | 1.6 | Captions, labels, tags |
| `text-xs` | 0.75rem | 12px | 400–500 | 1.5 | Fine print, metadata |

### Font Weight Reference

| Weight | Value | Use Case |
|--------|-------|---------|
| Regular | 400 | Body text, descriptions |
| Medium | 500 | UI labels, nav links, form labels |
| SemiBold | 600 | Card headings, CTA labels, emphasis |
| Bold | 700 | Section titles, sub-headings |
| ExtraBold | 800 | Hero headline, display text |

### Heading Hierarchy

```
H1 — One per page. Hero headline or page title.
     Font: Manrope | Weight: 800 | Size: display-2xl (desktop) → display-xl (tablet) → display-lg (mobile)

H2 — Section headings (one per section).
     Font: Manrope | Weight: 700 | Size: display-lg (desktop) → display-md (tablet) → display-sm (mobile)

H3 — Sub-section headings, card titles.
     Font: Manrope | Weight: 700 | Size: display-sm

H4 — Feature headings, FAQ questions, minor titles.
     Font: Inter | Weight: 600 | Size: text-xl

H5 — Small labels above headings (eyebrow text).
     Font: Inter | Weight: 600 | Size: text-sm | Letter-spacing: 0.1em | ALL CAPS
```

### Eyebrow Text Convention
Sections frequently use a small uppercase label above the main heading:
```
WHAT WE BUILD
[Large Section Heading Below]
```
Style: `text-sm`, `font-semibold`, `tracking-widest`, `text-orange`, `uppercase`

---

## 4. Spacing System

The spacing system is based on a **4px base unit** with Tailwind's default scale.

| Token | Value | CSS |
|-------|-------|-----|
| `space-1` | 4px | `0.25rem` |
| `space-2` | 8px | `0.5rem` |
| `space-3` | 12px | `0.75rem` |
| `space-4` | 16px | `1rem` |
| `space-5` | 20px | `1.25rem` |
| `space-6` | 24px | `1.5rem` |
| `space-8` | 32px | `2rem` |
| `space-10` | 40px | `2.5rem` |
| `space-12` | 48px | `3rem` |
| `space-16` | 64px | `4rem` |
| `space-20` | 80px | `5rem` |
| `space-24` | 96px | `6rem` |
| `space-32` | 128px | `8rem` |

### Section Vertical Padding
- **Desktop:** `py-24` (96px top + bottom)
- **Tablet:** `py-16` (64px top + bottom)
- **Mobile:** `py-12` (48px top + bottom)

### Component Internal Spacing
- Card padding: `p-6` (24px) on desktop, `p-4` (16px) on mobile
- Form field gap: `space-y-4` (16px)
- Section content gap: `space-y-16` (64px) between heading and content

---

## 5. Layout and Grid System

### Primary Grid
- **12-column grid** for page layout
- Gutter: `gap-6` (24px) on desktop, `gap-4` (16px) on tablet/mobile

### Bento Grid (Services Section)
A bento-grid-style layout with cards of unequal sizes:
```
Desktop (1440px): 4-column grid, cards span 1–2 columns and 1–2 rows
Tablet (768px):   2-column grid, most cards full width
Mobile (375px):   1-column stack, all cards full width
```

Example bento arrangement (Services, 8 cards):
```
[ Card 1 — Wide (span 2)      ] [ Card 2 — Tall (span 2 rows) ]
[ Card 3 — Standard           ] [ Card 2 (continued)          ]
[ Card 4 — Standard           ] [ Card 5 — Wide (span 2)      ]
[ Card 6 — Standard           ] [ Card 7 — Standard           ] [ Card 8 — Standard ]
```

Cards must have varying heights (min-h values) to create visual rhythm.

### Two-Column Layouts
Used for: Why Choose Us, Process steps (alternating), Team section
- `lg:grid-cols-2` with `gap-12`

### Three-Column Layouts
Used for: Technology stack, Industries grid, Trust highlights
- `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`

---

## 6. Container Widths

```css
/* Max container width */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem; /* 24px horizontal padding */
}

/* Wide container (for full-width sections with inner content) */
.container-wide {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem; /* 32px horizontal padding */
}

/* Narrow container (for focused content: blog, contact form) */
.container-narrow {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

In Tailwind: `max-w-screen-xl mx-auto px-6` (or `px-8` for wide).

---

## 7. Border Radius

| Token | Value | Use Case |
|-------|-------|---------|
| `rounded-sm` | 4px | Small tags, badges |
| `rounded` | 6px | Buttons (small) |
| `rounded-md` | 8px | Form inputs |
| `rounded-lg` | 12px | Cards (standard) |
| `rounded-xl` | 16px | Service bento cards |
| `rounded-2xl` | 20px | Large feature cards |
| `rounded-3xl` | 24px | Hero mockup frames |
| `rounded-full` | 9999px | Pills, avatar badges, tech icons |

### Navbar
The navbar uses a custom border radius: `rounded-2xl` (20px) or `rounded-[20px]`, giving it a distinct floating pill-like appearance when scrolled.

---

## 8. Shadows and Glows

### Box Shadows

```css
/* Subtle card shadow on light backgrounds */
--shadow-card: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06);

/* Medium card elevation */
--shadow-card-hover: 0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);

/* Navbar shadow */
--shadow-navbar: 0 2px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1);

/* Orange glow — hover state on CTA elements */
--shadow-orange-glow: 0 0 24px rgba(240,120,43,0.25), 0 4px 12px rgba(240,120,43,0.15);

/* Device mockup depth shadow */
--shadow-device: 0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2);
```

### Tailwind Extension (in tailwind.config.ts)
```typescript
boxShadow: {
  'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
  'card-hover': '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
  'navbar': '0 2px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)',
  'orange-glow': '0 0 24px rgba(240,120,43,0.25), 0 4px 12px rgba(240,120,43,0.15)',
  'device': '0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)',
}
```

---

## 9. Buttons

### Variants

#### Primary Button (Electric Orange fill)
```
Background: #F0782B
Text: #FFFFFF (white)
Border: none
Padding: 12px 24px (desktop), 10px 20px (mobile)
Border Radius: rounded-lg (12px) or rounded-xl (16px)
Font: Inter, 600, 15px / 16px
Hover: background → #D4671F (darker), shadow-orange-glow
Active: scale(0.98)
Transition: all 200ms ease
```

#### Secondary Button (outlined)
```
Background: transparent
Text: #F7F5F0 (Warm White) on dark backgrounds | #171717 (Charcoal) on light
Border: 1.5px solid currentColor
Padding: same as primary
Border Radius: same as primary
Hover: background → rgba(255,255,255,0.08) on dark | rgba(0,0,0,0.05) on light
```

#### Ghost Button (text only with arrow)
```
Background: transparent
Text: #F7F5F0 or #171717
Border: none
Arrow icon: Lucide ArrowRight, animates right on hover
Used for: "View Our Work →", card CTAs
```

#### Icon Button (square, icon-only)
```
Size: 40×40px (min touch target 44px)
Background: Surface Grey (#292929) on dark | Border Light on light
Border Radius: rounded-lg
Icon color: Muted Grey, transitions to White on hover
```

### Button Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| Small | `px-4 py-2` | 14px |
| Medium (default) | `px-6 py-3` | 15px |
| Large | `px-8 py-4` | 16px |

---

## 10. Navigation

### Navbar Design

**Structure:**
```
[Logo] -------- [Home] [Services ▾] [Technologies] [Industries] [Portfolio] [Insights] [About] -------- [Contact →]
```

**Visual Style:**
- Floating above content with `fixed top-4 left-6 right-6 z-50`
- Background: `rgba(23,23,23,0.80)` with `backdrop-blur-xl`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border Radius: `rounded-2xl` (20px)
- Padding: `px-6 py-3`
- Shadow: `shadow-navbar`

**On Scroll Behavior:**
- Initially: fully transparent with no border (on hero section)
- After scrolling past 80px: transitions to glass/dark style
- Transition: `transition-all duration-300`

**Dropdown Menus:**
- Appear below the triggering nav link
- Background: `#1E1E1E` (slightly lighter than charcoal)
- Border: `1px solid rgba(255,255,255,0.08)`
- Border Radius: `rounded-xl`
- Each item: icon (Lucide) + service name + short tagline
- Animation: fade in + slide down (Framer Motion)
- Click outside closes the dropdown

**Mobile Menu:**
- Triggered by hamburger icon (right side)
- Full-screen overlay with dark background
- Vertically stacked nav links
- Accordion-style expansion for dropdowns
- Close button top-right
- Animation: slide in from right or fade in

### Logo
- Left-aligned in navbar
- Includes agency name text (no image dependency for initial deploy)
- Font: Manrope, 700, white
- Optional: custom SVG logo to be added when brand assets are provided

---

## 11. Cards

### Service Card (Bento Grid)
```
Background: #292929 (Surface Grey) with hover → slightly lighter
Border: 1px solid #2E2E2E → hover: 1px solid rgba(240,120,43,0.30)
Border Radius: rounded-xl (16px)
Padding: p-6 (24px)
Min Height: varies (short: 200px, tall: 380px)
Icon: 40×40px container with orange tint, Lucide or custom SVG
Heading: Manrope 700, 20px, Warm White
Description: Inter 400, 15px, Muted Grey
Arrow: Lucide ArrowUpRight, animates on hover
Hover: subtle scale (1.01), border color → orange tint, arrow animates
```

### Project Card (Portfolio)
```
Background: #1E1E1E
Border Radius: rounded-2xl (20px)
Image: top of card, aspect-video (16:9), object-cover, rounded-t-2xl
Content area: p-6
Category badge: tag-style, small, orange
Title: Manrope 700, 18px
Description: Inter 400, 14px, Muted Grey
Arrow link: bottom-right
Hover: image zoom (scale 1.05, overflow hidden), card lifts (shadow)
```

### Team Card
```
Background: none (transparent) — team member displayed against section background
Photo treatment: background removed, displayed on subtle geometric background
Name: Manrope 700, 20px
Designation: Inter 500, 15px, Orange
Bio: Inter 400, 14px, Muted Grey (short paragraph)
Layout: photo prominently displayed, text below or beside
```

### Testimonial Card
```
Background: #292929
Border: 1px solid #2E2E2E
Border Radius: rounded-xl
Padding: p-8
Quote icon: Lucide Quote, orange
Quote text: Inter 400, 16px, italic, Warm White
Author: name (bold) + role + company
Avatar: 40×40px circular
```

### FAQ Accordion
```
Container: full-width
Item background: transparent
Item border-bottom: 1px solid Border Dark
Question: Inter 500-600, 16px
Icon: Plus ↔ Minus transition (Framer Motion)
Answer: Inter 400, 15px, Muted Grey, animated height expand
```

---

## 12. Forms

### Form Container
```
Background: Pure White (#FFFFFF) on light | Surface Grey (#292929) on dark
Border Radius: rounded-2xl (24px)
Padding: p-8 or p-10
Shadow: shadow-card-hover
```

### Form Field
```
Label:
  Font: Inter 500 (Medium), 14px
  Color: Charcoal Black (on light) | Warm White (on dark)
  Margin bottom: 6px

Input / Textarea / Select:
  Background: #F7F5F0 (light section) | #1E1E1E (dark section)
  Border: 1px solid #E4E2DD (light) | 1px solid #2E2E2E (dark)
  Border Radius: rounded-lg (12px)
  Padding: px-4 py-3 (12px top/bottom, 16px horizontal)
  Font: Inter 400, 15px
  Placeholder color: Muted Grey

Focus state:
  Border: 1.5px solid #F0782B (Electric Orange)
  Ring: 0 0 0 3px rgba(240,120,43,0.15)
  Outline: none

Error state:
  Border: 1.5px solid #EF4444 (red)
  Error message: Inter 400, 13px, red, below input
  Icon: Lucide AlertCircle, inline

Success state (full form):
  Show success card with checkmark icon and thank-you message
```

### Form Submit Button
- Full-width primary button (on mobile)
- Size: Large
- Loading state: spinner icon + "Sending..." text, disabled
- Successful submission: transition to success state

---

## 13. Icons

### Primary Icon Library: Lucide React
- Use `lucide-react` for all UI icons
- Render as React components — tree-shakeable
- Size: 18px (inline text), 20px (standard), 24px (card/section), 32px (feature), 48px (large illustrations)
- Stroke width: 1.5 (default) — do not change globally

### Icon Color Usage
- Navigation icons: Muted Grey → transitions to Warm White on hover
- CTA arrow icons: Orange or White
- Service icons in cards: Orange (`text-orange-primary`) or colored SVG illustrations
- Form validation icons: Red (error), Green (success)
- Social media icons: Muted Grey → White on hover

### Technology Logos
- Use official SVG logos for technology stack display
- Source from `/public/images/technologies/`
- Display in a standardized container: 48px or 64px square, grayscale by default, color on hover

---

## 14. Illustrations and Mockups

### Hero Device Mockups
- **Laptop mockup:** Top-down frame of a laptop showing a dashboard or SaaS interface inside the screen
- **Smartphone mockup:** Mobile frame showing a mobile app interface
- Format: SVG or high-res WebP
- Content inside screens: Representative but real-looking dashboard designs (dark, premium)
- Both mockups displayed at a slight angle (CSS 3D perspective)
- Positioned floating to the right side of the hero (desktop) or below text (mobile)

### Service Section Illustrations
- Each service card can include a small abstract illustration or icon
- Style: Flat, geometric, single or dual-color (charcoal + orange)
- No stock photography

### No Fake Screenshots
- Do not use placeholder screenshots of real client applications
- Use abstract UI mockups or stylized representations

---

## 15. Image Treatment

### General Image Rules
- All photos: WebP format, optimized
- Team photos: Background removed (if possible), or placed on a consistent neutral background
- Portfolio project images: Provided by the agency — no substitutions
- No generic stock photography of people in offices

### Aspect Ratios
| Context | Ratio |
|---------|-------|
| Portfolio card thumbnail | 16:9 |
| Case study hero image | 21:9 |
| Team member portrait | 3:4 or 1:1 |
| Open Graph image | 1200×630px (1.91:1) |
| Service illustration | 1:1 (square) |

### Image Effects
- Portfolio card hover: inner image scales to `scale(1.05)` on hover (parent `overflow-hidden`)
- Team member photo: Subtle drop shadow, background geometric element
- All transitions: 300ms ease-in-out

---

## 16. Responsive Breakpoints

Matches Tailwind CSS default breakpoints:

| Breakpoint | Token | Min Width | Tailwind Prefix |
|------------|-------|----------|----------------|
| Mobile (base) | — | 0px | (no prefix) |
| Small | `sm` | 640px | `sm:` |
| Medium / Tablet | `md` | 768px | `md:` |
| Large / Laptop | `lg` | 1024px | `lg:` |
| Extra Large / Desktop | `xl` | 1280px | `xl:` |
| 2XL / Large Desktop | `2xl` | 1536px | `2xl:` |

### Mobile-First Approach
Write base styles for mobile, then override with `md:`, `lg:`, `xl:` prefixes for larger screens. Never write desktop-first CSS.

---

## 17. Hover Effects

All hover effects use `transition-all duration-300 ease-in-out` or `transition duration-200`.

| Element | Hover Effect |
|---------|-------------|
| Primary Button | Darker orange background + orange glow shadow |
| Secondary Button | Subtle background fill |
| Nav Links | Text color → Warm White |
| Service Card | Border → orange tint, scale 1.01, arrow animates |
| Portfolio Card | Image scales in, card lifts |
| Tech Logo | Grayscale → Color |
| Footer Links | Text color → Warm White |
| Social Icons | Icon color → White + slight scale |
| FAQ Accordion | Background → subtle highlight |
| Arrow Icons | Translate right 4px |

---

## 18. Scroll Animations

All scroll animations use Framer Motion `whileInView` with `viewport={{ once: true, margin: "-100px" }}`.

### Standard Entrance Animations

```typescript
// Fade up (most common)
fadeUp: {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

// Fade in (subtle)
fadeIn: {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

// Scale in (cards)
scaleIn: {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Stagger container (for grids)
staggerContainer: {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

### Usage Guidelines
- Section headings: `fadeUp`
- Section description text: `fadeUp` with 0.1s delay
- Grid cards: `staggerContainer` + `scaleIn` or `fadeUp` on children
- Single feature blocks: `fadeUp`
- Images: `fadeIn` or `scaleIn`
- Never animate more than 4 items simultaneously in a stagger — batch into groups

---

## 19. 3D Parallax Interactions

### Hero Section Parallax

#### Mouse Position Tracking
```typescript
// Track normalized mouse position (-0.5 to 0.5)
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;
  mouseX.set((clientX / innerWidth) - 0.5);
  mouseY.set((clientY / innerHeight) - 0.5);
};
```

#### Transform Mappings
```typescript
// Laptop mockup
const laptopRotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
const laptopRotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
const laptopTranslateX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
const laptopTranslateY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

// Smartphone mockup (different intensity for depth)
const phoneRotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
const phoneRotateY = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
const phoneTranslateX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
const phoneTranslateY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
```

#### Spring Physics
```typescript
const springConfig = { stiffness: 120, damping: 25, mass: 0.8 };

const smoothLaptopRotateX = useSpring(laptopRotateX, springConfig);
const smoothLaptopRotateY = useSpring(laptopRotateY, springConfig);
// ... etc for all transforms
```

#### Mouse Leave Behavior
```typescript
const handleMouseLeave = () => {
  mouseX.set(0); // Springs will animate back
  mouseY.set(0);
};
```

#### CSS Perspective
```css
.parallax-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}
```

#### Device Disabling
- Disable on: `window.matchMedia('(pointer: coarse)').matches` (touch devices)
- Disable on: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
- Touch devices get: static display of devices at a fixed tasteful angle

---

## 20. Accessibility Requirements

### Color Contrast (WCAG AA)
| Combination | Ratio | Status |
|------------|-------|--------|
| Warm White `#F7F5F0` on Charcoal `#171717` | 16.7:1 | ✅ AAA |
| Pure White on Charcoal | 19.1:1 | ✅ AAA |
| Orange `#F0782B` on Charcoal | 4.6:1 | ✅ AA (large text) |
| Muted Grey `#A1A1AA` on Charcoal | 4.6:1 | ✅ AA |
| Charcoal on Warm White | 16.7:1 | ✅ AAA |

> [!WARNING]
> Do NOT use Orange text on White/Warm White backgrounds — this fails WCAG AA for normal body text.

### Focus Management
- Custom focus ring: `outline: 2px solid #F0782B; outline-offset: 2px`
- Applied to all focusable elements globally
- Override `outline: none` only where a custom visible focus is implemented

### ARIA Requirements
- `<nav>` elements must have `aria-label="Main navigation"` or `aria-label="Footer navigation"`
- `<button>` elements that only contain icons must have `aria-label`
- Dropdown menus: `aria-expanded`, `aria-haspopup="true"`, `aria-controls`
- Form inputs: `aria-describedby` pointing to error message elements
- Hero section heading: `role="heading" aria-level="1"` (or standard `<h1>`)

### Keyboard Navigation Map
- `Tab`: Move forward through focusable elements
- `Shift+Tab`: Move backward
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close dropdowns, modals
- `Arrow keys`: Navigate within dropdown menus
- `Home` / `End`: First/last item in dropdown

---

## 21. Section Theming

The website alternates between dark and light sections to create visual rhythm:

| Section | Background | Text | Theme |
|---------|-----------|------|-------|
| Navbar | Glass/Dark | Warm White | Dark |
| Hero | Charcoal `#171717` | Warm White | Dark |
| Services (Bento Grid) | Charcoal `#171717` | Warm White | Dark |
| Trust / Highlights | Warm White `#F7F5F0` | Charcoal | Light |
| Portfolio (Featured) | Charcoal | Warm White | Dark |
| Why Choose Us | Warm White | Charcoal | Light |
| Process | Charcoal | Warm White | Dark |
| Technologies | Warm White | Charcoal | Light |
| Industries | Charcoal | Warm White | Dark |
| Team | Charcoal | Warm White | Dark |
| Testimonials | Warm White | Charcoal | Light |
| FAQ | Charcoal | Warm White | Dark |
| Contact Section | Warm White | Charcoal | Light |
| Footer | `#0D0D0D` (deeper black) | Warm White | Dark |

This alternating pattern creates clear visual separation between sections without heavy dividers.

---

## 22. Tailwind Configuration Reference

```typescript
// tailwind.config.ts (abbreviated — key custom values)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#171717',
        'surface-grey': '#292929',
        orange: {
          DEFAULT: '#F0782B',
          dark: '#D4671F',
          light: '#F5934A',
        },
        'warm-white': '#F7F5F0',
        'muted-grey': '#A1A1AA',
        'border-dark': '#2E2E2E',
        'border-light': '#E4E2DD',
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-xl': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-lg': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-md': ['2rem', { lineHeight: '1.25', fontWeight: '700' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        navbar: '0 2px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)',
        'orange-glow': '0 0 24px rgba(240,120,43,0.25), 0 4px 12px rgba(240,120,43,0.15)',
        device: '0 32px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
        'card-xl': '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```
