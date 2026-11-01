'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Returns true if the user has requested reduced motion via
 * the `prefers-reduced-motion: reduce` media query.
 *
 * All animated components must check this value and disable
 * or simplify animations when it returns true.
 */
export function useReducedMotionPref(): boolean {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ?? false;
}
