'use client';

/**
 * HeroSection
 *
 * Thin wrapper that renders the PrismaHero cinematic component.
 * The existing Navbar lives in layout.tsx — it is NOT duplicated here.
 *
 * Old Three.js / React Three Fiber implementation has been removed.
 * See git history for previous version.
 */
import { PrismaHero } from '@/components/ui/prisma-hero';

export function HeroSection() {
  return <PrismaHero />;
}
