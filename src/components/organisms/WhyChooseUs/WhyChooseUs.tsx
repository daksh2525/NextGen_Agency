'use client';

import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Bot,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { Button } from '@/components/atoms/Button/Button';
import {
  staggerContainer,
  scaleIn,
  VIEWPORT_ONCE,
} from '@/lib/animations';

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1] as const,
    });
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/**
 * Why Choose Us — compact, high-impact 4-card Bento Grid showcasing NextGen Agency's
 * differentiators: AI-native architectures, rapid delivery, direct senior access,
 * and zero tech-debt guarantee.
 */
export function WhyChooseUs() {
  return (
    <section
      id="why-nextgen"
      className="bg-warm-white py-14 sm:py-16 md:py-20 text-charcoal relative overflow-hidden"
      aria-labelledby="why-heading"
    >
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
          className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {/* ── CARD 1: AI-Native by Design ── */}
          <motion.div
            variants={scaleIn}
            className="group relative rounded-2xl border border-border-light bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 px-3 py-1 text-xs font-semibold text-orange">
                  <Bot className="w-3.5 h-3.5" aria-hidden="true" />
                  PRACTICAL AI SYSTEMS
                </div>
                <span className="text-xs font-mono font-semibold text-text-muted-dark">
                  01
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-2.5">
                AI-Native by Design,{' '}
                <span className="text-gradient">Not Bolted-On</span>
              </h3>
              <p className="text-sm text-text-muted-dark leading-relaxed">
                We engineer production-ready RAG architectures, custom vector
                search, and autonomous agent workflows that directly solve
                operational bottlenecks.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border-light/80 flex flex-wrap gap-2">
              {['RAG Pipelines', 'Agent Swarms', 'Fine-Tuning', 'Vector Indexing'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-[11px] font-medium text-charcoal bg-warm-white px-2.5 py-1 rounded-md border border-border-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── CARD 2: Speed & Proven Scale ── */}
          <motion.div
            variants={scaleIn}
            className="group relative rounded-2xl border border-border-light bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 px-3 py-1 text-xs font-semibold text-orange">
                  <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                  HIGH VELOCITY
                </div>
                <span className="text-xs font-mono font-semibold text-text-muted-dark">
                  02
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-charcoal tracking-tight">
                  <AnimatedCounter value={100} suffix="+" />
                </span>
                <span className="text-xs font-bold text-orange uppercase tracking-wider">
                  Products Deployed Globally
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-2.5">
                3–4 Week Production MVPs
              </h3>
              <p className="text-sm text-text-muted-dark leading-relaxed">
                Startup speed backed by enterprise architecture. We move from
                concept to zero-downtime production deployment with relentless momentum.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border-light/80 flex items-center justify-between text-xs text-text-muted-dark">
              <span className="font-medium text-charcoal">🇺🇸 US • 🇬🇧 UK • 🇨🇦 CA • 🇦🇺 AU • 🇮🇳 IN</span>
              <span className="font-mono text-orange font-semibold">100% On-Time</span>
            </div>
          </motion.div>

          {/* ── CARD 3: Direct Senior Access ── */}
          <motion.div
            variants={scaleIn}
            className="group relative rounded-2xl border border-border-light bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 px-3 py-1 text-xs font-semibold text-orange">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  DIRECT ACCESS
                </div>
                <span className="text-xs font-mono font-semibold text-text-muted-dark">
                  03
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-2.5">
                Senior Architects, Zero Middlemen
              </h3>
              <p className="text-sm text-text-muted-dark leading-relaxed">
                No junior account reps or bureaucratic games. You collaborate
                directly with principal engineers in real-time through dedicated
                Slack or Discord channels.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border-light/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-charcoal">
                  Live Engineer Channel
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                &lt; 15m reply SLA
              </span>
            </div>
          </motion.div>

          {/* ── CARD 4: Zero Tech-Debt Guarantee ── */}
          <motion.div
            variants={scaleIn}
            className="group relative rounded-2xl border border-border-light bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 px-3 py-1 text-xs font-semibold text-orange">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  ENGINEERING RIGOUR
                </div>
                <span className="text-xs font-mono font-semibold text-text-muted-dark">
                  04
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-2.5">
                Zero Tech-Debt Guarantee
              </h3>
              <p className="text-sm text-text-muted-dark leading-relaxed">
                Type-safe codebases, end-to-end automated testing, strict CSP
                headers, and scalable microservices built to scale effortlessly 100x.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border-light/80 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-charcoal">
              {['Strict TypeScript', 'Automated CI/CD', 'OWASP Security'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button
            href="/contact"
            size="md"
            rightIcon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          >
            Start Your Project With Us
          </Button>
          <Button
            href="/services"
            variant="secondary-dark"
            size="md"
          >
            Explore All 11 Services
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
