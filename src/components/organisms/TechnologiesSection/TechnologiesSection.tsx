'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { technologyCategories } from '@/data/technologies';
import { staggerContainer, scaleIn, fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

/**
 * Technology stack section — light background, grouped tech chips.
 * See docs/prd.md Section 8.8.
 */
export function TechnologiesSection() {
  return (
    <section className="bg-warm-white section-padding" aria-labelledby="tech-heading">
      <div className="container-site">
        <SectionHeading
          id="tech-heading"
          eyebrow="TECH STACK"
          heading="Technologies We Master"
          description="A curated, modern stack selected for performance, developer experience, and long-term maintainability."
          align="center"
          theme="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 space-y-10"
        >
          {technologyCategories.map((cat) => (
            <motion.div key={cat.name} variants={fadeUp}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted-dark mb-4">
                {cat.name}
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="flex flex-wrap gap-3"
              >
                {cat.technologies.map((tech) => (
                  <motion.span
                    key={tech.name}
                    variants={scaleIn}
                    className="inline-flex items-center rounded-full border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:border-orange/30 hover:text-orange transition-colors duration-200 cursor-default"
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
