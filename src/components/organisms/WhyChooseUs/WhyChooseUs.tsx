'use client';

import { motion } from 'framer-motion';
import {
  Zap, Shield, Brain, MessageCircle, Globe, Users,
} from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { staggerContainer, scaleIn, VIEWPORT_ONCE } from '@/lib/animations';

const VALUES = [
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    description:
      'We move fast and build right. Tight timelines do not mean cutting corners on code quality or architecture.',
  },
  {
    icon: Shield,
    title: 'Engineering Rigour',
    description:
      'Every system we build is designed for reliability, scalability, and long-term maintainability from day one.',
  },
  {
    icon: Brain,
    title: 'AI-Native Thinking',
    description:
      'AI is part of how we think about every product, not an afterthought. We integrate it where it creates real value.',
  },
  {
    icon: MessageCircle,
    title: 'Transparent Communication',
    description:
      'Regular updates, clear documentation, and no surprises. You always know the status of your project.',
  },
  {
    icon: Globe,
    title: 'International Standards',
    description:
      'We build to the same standards as the world\'s best agencies — Indian engineering excellence, global quality.',
  },
  {
    icon: Users,
    title: 'Full-Stack Ownership',
    description:
      'One team owns your entire product stack. No handoffs, no coordination overhead, no gaps in accountability.',
  },
] as const;

/**
 * Why Choose Us — light section with 6 differentiating value propositions.
 * See docs/prd.md Section 8.6.
 */
export function WhyChooseUs() {
  return (
    <section className="bg-warm-white section-padding" aria-labelledby="why-heading">
      <div className="container-site">
        <SectionHeading
          id="why-heading"
          eyebrow="WHY NEXTGEN"
          heading="The Agency Built for the Modern Web"
          description="We combine engineering rigour with product thinking to deliver digital solutions that actually work."
          align="center"
          theme="light"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {VALUES.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="rounded-2xl border border-border-light bg-white p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading font-bold text-lg text-charcoal mb-2">{title}</h3>
              <p className="text-sm text-text-muted-dark leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
