import type { Variants } from "framer-motion";

// =============================================================================
// Easing curves
// =============================================================================
export const EASE_OUT_CUBIC = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_IN_OUT_CUBIC = [0.645, 0.045, 0.355, 1.0] as const;

// =============================================================================
// Spring configurations
// =============================================================================
export const SPRING_GENTLE = { stiffness: 120, damping: 25, mass: 0.8 };
export const SPRING_BOUNCY = { stiffness: 200, damping: 20, mass: 1 };
export const SPRING_SLOW = { stiffness: 60, damping: 20, mass: 1 };

// =============================================================================
// Animation variants
// =============================================================================

/** Fade up — most common entrance animation */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
  },
};

/** Fade in — subtle opacity reveal */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Fade in from left */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
  },
};

/** Fade in from right */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
  },
};

/** Scale in — for cards and images */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
  },
};

/** Stagger container — wraps staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container with longer delay between items */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/** Dropdown menu animation */
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_OUT_CUBIC },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

/** Accordion expand/collapse */
export const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_OUT_CUBIC },
  },
};

/** Mobile menu slide in */
export const mobileMenuVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_OUT_CUBIC },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: EASE_IN_OUT_CUBIC },
  },
};

/** Viewport animation config — used with whileInView.
 * Mobile-optimized with a small threshold so cards and sections reveal
 * immediately without leaving black/invisible blanks on touch screens.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.05, margin: "0px 0px -20px 0px" } as const;
