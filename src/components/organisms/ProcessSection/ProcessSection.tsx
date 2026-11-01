'use client';

import { motion } from 'framer-motion';
import {
  Search, Layout, Palette, Code2, CheckCircle, Rocket, Wrench,
} from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { staggerContainer, scaleIn, VIEWPORT_ONCE } from '@/lib/animations';

const STEPS = [
  { step: 1, icon: Search,       title: 'Discovery',    description: 'Map your goals, users, and technical requirements.' },
  { step: 2, icon: Layout,       title: 'Planning',     description: 'Architecture decisions, tech stack, and project roadmap.' },
  { step: 3, icon: Palette,      title: 'Design',       description: 'UI/UX design with prototypes and design system.' },
  { step: 4, icon: Code2,        title: 'Development',  description: 'Iterative builds with regular demos and feedback loops.' },
  { step: 5, icon: CheckCircle,  title: 'Testing',      description: 'QA across devices, browsers, and edge cases.' },
  { step: 6, icon: Rocket,       title: 'Launch',       description: 'Smooth production deployment with monitoring setup.' },
  { step: 7, icon: Wrench,       title: 'Support',      description: 'Ongoing maintenance, performance, and iteration.' },
] as const;

/**
 * Development process section — numbered steps on dark background.
 * See docs/prd.md Section 8.7.
 */
export function ProcessSection() {
  return (
    <section className="bg-charcoal section-padding" aria-labelledby="process-heading">
      <div className="container-site">
        <SectionHeading
          id="process-heading"
          eyebrow="OUR PROCESS"
          heading="How We Build"
          description="A structured process that eliminates surprises and keeps you informed at every stage."
          align="center"
          theme="dark"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        >
          {STEPS.map(({ step, icon: Icon, title, description }) => (
            <motion.div
              key={step}
              variants={scaleIn}
              className="group rounded-xl bg-surface-grey border border-border-dark p-4 text-center hover:border-orange/20 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Step number */}
              <div className="font-heading font-extrabold text-4xl text-orange/15 mb-2 leading-none select-none" aria-hidden="true">
                {String(step).padStart(2, '0')}
              </div>
              {/* Icon */}
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-sm text-warm-white mb-1">{title}</h3>
              <p className="text-[11px] text-muted-grey leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
