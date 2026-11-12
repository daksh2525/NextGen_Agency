'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import type { Variants } from 'framer-motion';
import {
  Brain,
  Layers,
  Cloud,
  Database,
  Bot,
  Smartphone,
  Globe,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { TimelineContent } from '@/components/ui/timeline-animation';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { Button } from '@/components/atoms/Button/Button';

/**
 * WHAT WE BUILD — End-to-End Software Solutions
 * Premium Animated Bento Grid powered by TimelineContent scroll reveals.
 * Showcases NextGen Agency's 7 primary engineering capabilities.
 */
export function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: -20,
      opacity: 0,
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-charcoal py-16 sm:py-20 lg:py-24 text-white relative overflow-hidden scroll-mt-24"
      aria-labelledby="services-heading"
    >
      <div className="container-site">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <TimelineContent
            as="div"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            <SectionHeading
              id="services-heading"
              eyebrow="WHAT WE BUILD"
              heading="End-to-End Software Solutions"
              description="From concept to deployment, we cover the full spectrum of modern software development and AI engineering."
              align="center"
              theme="dark"
            />
          </TimelineContent>
        </div>

        {/* 3-Column Asymmetric Animated Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          {/* ── COLUMN 1 ── */}
          <div className="flex flex-col gap-4 h-full">
            {/* Card 1: AI & Machine Learning Solutions (Large flex-7) */}
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-[7] min-h-[260px] sm:min-h-[310px] flex flex-col justify-between relative bg-orange text-white overflow-hidden rounded-2xl border border-orange-light/30 p-6 sm:p-8 shadow-card group transition-all duration-300 hover:border-white/50"
            >
              {/* Subtle tech background grid pattern */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-sm">
                  <Brain className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider text-white/80 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
                  01 / AI
                </span>
              </div>

              <div className="relative z-10 mt-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2.5 flex items-center gap-2 group-hover:text-white">
                    AI &amp; Machine Learning
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </h3>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed mb-6">
                    Practical AI that solves high-stakes operational bottlenecks. Custom LLM fine-tuning, predictive analytics, and automated decision engines.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'PyTorch', 'OpenAI', 'FastAPI'].map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/25 text-white/90 border border-white/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:underline focus-ring rounded"
                  >
                    Start this project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </TimelineContent>

            {/* Card 2: Full-Stack Development (Compact flex-3) */}
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-[3] min-h-[220px] flex flex-col justify-between relative bg-surface-grey text-white overflow-hidden rounded-2xl border border-border-dark p-6 sm:p-7 shadow-card group transition-all duration-300 hover:border-orange/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-orange border border-white/10">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-grey">
                  02 / FULL-STACK
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-1.5 flex items-center gap-1.5">
                  Full-Stack Development
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange" />
                </h3>
                <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mb-4">
                  One accountable team owning schemas, scalable APIs, and pixel-perfect frontends.
                </p>
              </div>

              <div className="pt-3 border-t border-border-dark flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-muted-grey">Next.js • Node • PostgreSQL</span>
                <Link
                  href="#contact"
                  className="font-medium text-orange hover:underline focus-ring rounded"
                >
                  Start →
                </Link>
              </div>
            </TimelineContent>
          </div>

          {/* ── COLUMN 2: Three Stacked Engineering Cards ── */}
          <div className="flex flex-col gap-4 h-full">
            {/* Card 3: SaaS Application Development */}
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-1 flex flex-col justify-between relative bg-charcoal-deep text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-card group transition-all duration-300 hover:border-orange/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange border border-orange/20">
                    <Cloud className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    SaaS Development
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-grey">03 / PRODUCT</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mb-4">
                Multi-tenant architectures, Stripe subscriptions, user permissions, and high-throughput databases.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border-dark text-xs">
                <span className="font-mono text-[11px] text-muted-grey">Stripe • Redis • AWS</span>
                <Link
                  href="#contact"
                  className="text-orange hover:underline font-medium focus-ring rounded"
                >
                  Start →
                </Link>
              </div>
            </TimelineContent>

            {/* Card 4: RAG-Based Applications */}
            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-1 flex flex-col justify-between relative bg-charcoal-deep text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-card group transition-all duration-300 hover:border-orange/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange border border-orange/20">
                    <Database className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    RAG Applications
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-grey">04 / RAG</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mb-4">
                Sub-second semantic search connecting proprietary enterprise databases to production LLMs.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border-dark text-xs">
                <span className="font-mono text-[11px] text-muted-grey">Pinecone • Weaviate • LangChain</span>
                <Link
                  href="#contact"
                  className="text-orange hover:underline font-medium focus-ring rounded"
                >
                  Start →
                </Link>
              </div>
            </TimelineContent>

            {/* Card 5: AI Agent Development */}
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-1 flex flex-col justify-between relative bg-charcoal-deep text-white overflow-hidden rounded-2xl border border-border-dark p-6 shadow-card group transition-all duration-300 hover:border-orange/40"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange border border-orange/20">
                    <Bot className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                    Autonomous AI Agents
                  </h3>
                </div>
                <span className="text-xs font-mono text-muted-grey">05 / AGENTS</span>
              </div>

              <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mb-4">
                Multi-agent swarms with tool use, automated planning, and reliable human-in-the-loop validation.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border-dark text-xs">
                <span className="font-mono text-[11px] text-muted-grey">LangGraph • CrewAI • TypeScript</span>
                <Link
                  href="#contact"
                  className="text-orange hover:underline font-medium focus-ring rounded"
                >
                  Start →
                </Link>
              </div>
            </TimelineContent>
          </div>

          {/* ── COLUMN 3 ── */}
          <div className="flex flex-col gap-4 h-full">
            {/* Card 6: Mobile Application Development (Compact flex-3) */}
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-[3] min-h-[220px] flex flex-col justify-between relative bg-surface-grey text-white overflow-hidden rounded-2xl border border-border-dark p-6 sm:p-7 shadow-card group transition-all duration-300 hover:border-orange/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-orange border border-white/10">
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-grey">
                  06 / MOBILE
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-1.5 flex items-center gap-1.5">
                  Mobile App Development
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange" />
                </h3>
                <p className="text-xs sm:text-sm text-muted-grey leading-relaxed mb-4">
                  Cross-platform iOS and Android apps with 60fps native feel and shared codebases.
                </p>
              </div>

              <div className="pt-3 border-t border-border-dark flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-muted-grey">React Native • Expo</span>
                <Link
                  href="#contact"
                  className="font-medium text-orange hover:underline focus-ring rounded"
                >
                  Start →
                </Link>
              </div>
            </TimelineContent>

            {/* Card 7: Custom Web Development (Large flex-7) */}
            <TimelineContent
              animationNum={7}
              customVariants={revealVariants}
              timelineRef={sectionRef}
              className="flex-[7] min-h-[260px] sm:min-h-[310px] flex flex-col justify-between relative bg-orange text-white overflow-hidden rounded-2xl border border-orange-light/30 p-6 sm:p-8 shadow-card group transition-all duration-300 hover:border-white/50"
            >
              {/* Subtle tech background grid pattern */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30 shadow-sm">
                  <Globe className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold tracking-wider text-white/80 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
                  07 / WEB
                </span>
              </div>

              <div className="relative z-10 mt-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white mb-2.5 flex items-center gap-2 group-hover:text-white">
                    Custom Web Development
                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                  </h3>
                  <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed mb-6">
                    Blazing-fast Next.js architectures, headless CMS integrations, and Core Web Vitals 90+ guaranteed for maximum conversion.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {['Next.js 16', 'React 19', 'Tailwind v4'].map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/25 text-white/90 border border-white/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:underline focus-ring rounded"
                  >
                    Start this project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* Bottom CTA to view all 11 services */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button
            href="#why-nextgen"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Why Choose NextGen
          </Button>
          <Button
            href="#contact"
            variant="secondary"
            size="md"
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ServicesGrid;
