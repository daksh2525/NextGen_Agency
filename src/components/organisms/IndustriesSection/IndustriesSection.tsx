'use client';

import { motion } from 'framer-motion';
import {
  Banknote, Heart, GraduationCap, ShoppingBag, Cloud,
  Building2, Truck, Home,
} from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { industries } from '@/data/industries';
import { staggerContainer, scaleIn, VIEWPORT_ONCE } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Banknote, Heart, GraduationCap, ShoppingBag, Cloud, Building2, Truck, Home,
};

/**
 * Industries We Serve — dark background grid of industry cards.
 * See docs/prd.md Section 8.9.
 */
export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="bg-charcoal section-padding scroll-mt-24"
      aria-labelledby="industries-heading"
    >
      <div className="container-site">
        <SectionHeading
          id="industries-heading"
          eyebrow="INDUSTRIES"
          heading="Sectors We Serve"
          description="Deep experience across the industries that matter most in today's digital economy."
          align="center"
          theme="dark"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {industries.map((industry) => {
            const Icon = ICON_MAP[industry.icon] ?? Building2;
            return (
              <motion.div
                key={industry.slug}
                variants={scaleIn}
                className="group rounded-xl bg-surface-grey border border-border-dark p-3.5 sm:p-5 text-center hover:border-orange/20 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange group-hover:bg-orange/20 transition-colors duration-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-warm-white">{industry.name}</h3>
                <p className="mt-1 text-[11px] text-muted-grey leading-snug">{industry.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
