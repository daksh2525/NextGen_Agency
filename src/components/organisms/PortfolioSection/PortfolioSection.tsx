'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { getFeaturedProjects } from '@/data/portfolio';
import { staggerContainer, fadeUp, VIEWPORT_ONCE } from '@/lib/animations';
import { ArrowRight, Layers } from 'lucide-react';

/**
 * Portfolio section — shows featured projects or an empty state.
 * Data-driven: add real projects to src/data/portfolio.ts to populate.
 */
export function PortfolioSection() {
  const projects = getFeaturedProjects();

  return (
    <section
      id="portfolio"
      className="bg-[#111111] section-padding scroll-mt-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="OUR WORK"
          heading="Featured Projects"
          description="A selection of the products and platforms we have built for our clients."
          theme="dark"
          align="center"
        />

        <div className="mt-14">
          {projects.length === 0 ? (
            /* Empty state — no fake data */
            <motion.div
              className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border-dark text-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <div className="w-16 h-16 rounded-2xl bg-surface-grey flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-muted-grey" aria-hidden="true" />
              </div>
              <h3 className="text-warm-white font-semibold text-xl mb-3">
                Portfolio Coming Soon
              </h3>
              <p className="text-muted-grey text-[15px] max-w-sm leading-relaxed">
                We are currently preparing our case studies and project showcases.
                Check back soon or{' '}
                <Link href="#contact" className="text-orange underline underline-offset-2 hover:no-underline">
                  contact us
                </Link>{' '}
                to discuss your project.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  name={project.name}
                  tagline={project.tagline}
                  category={project.category}
                  thumbnail={project.thumbnail}
                  comingSoon={project.comingSoon}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* View all link */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-orange font-semibold text-[15px] hover:gap-3 transition-all duration-200 group"
            aria-label="Discuss a project with us"
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
