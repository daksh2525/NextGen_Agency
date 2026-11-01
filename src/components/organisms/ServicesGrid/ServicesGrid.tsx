'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ServiceCard } from '@/components/molecules/ServiceCard';
import { Button } from '@/components/atoms/Button';
import { services } from '@/data/services';
import { staggerContainer, VIEWPORT_ONCE } from '@/lib/animations';

/**
 * Bento-grid services section.
 * Shows all 11 services in a mixed-size grid layout.
 * See docs/design.md Section 5 (Bento Grid) and docs/prd.md Section 8.3.
 */
export function ServicesGrid() {
  return (
    <section className="bg-charcoal section-padding" aria-labelledby="services-heading">
      <div className="container-site">
        <SectionHeading
          id="services-heading"
          eyebrow="WHAT WE BUILD"
          heading="End-to-End Software Solutions"
          description="From concept to deployment, we cover the full spectrum of modern software development and AI engineering."
          align="center"
          theme="dark"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Row 1: Wide + Standard + Standard */}
          <ServiceCard service={services[0]} size="wide" className="lg:col-span-2" />
          <ServiceCard service={services[1]} size="standard" />
          <ServiceCard service={services[2]} size="standard" />

          {/* Row 2: Standard + Standard + Wide */}
          <ServiceCard service={services[3]} size="standard" />
          <ServiceCard service={services[4]} size="standard" />
          <ServiceCard service={services[5]} size="wide" className="lg:col-span-2" />

          {/* Row 3: remaining */}
          <ServiceCard service={services[6]} size="standard" />
          <ServiceCard service={services[7]} size="standard" />
          <ServiceCard service={services[8]} size="standard" />
          <ServiceCard service={services[9]} size="standard" />
          <ServiceCard service={services[10]} size="wide" className="lg:col-span-2 md:col-span-2" />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link href="/services">
            <Button
              variant="secondary"
              size="md"
              rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
