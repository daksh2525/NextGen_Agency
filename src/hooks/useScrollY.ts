'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current vertical scroll position of the window.
 * Used for navbar scroll detection.
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    // Set initial value
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
