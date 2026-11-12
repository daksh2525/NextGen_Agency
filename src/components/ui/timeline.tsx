"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Sparkles, Workflow } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type JourneyItem = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export type TimelineProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  periodLabel?: string;
  description?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  steps?: JourneyItem[];
};

export const DEFAULT_PROCESS_STEPS: JourneyItem[] = [
  {
    id: "step-1",
    step: "01",
    title: "Discovery",
    description: "Deep dive into your business objectives, user requirements, and technical scope to define clear success metrics.",
  },
  {
    id: "step-2",
    step: "02",
    title: "Architecture & Planning",
    description: "Detailed roadmap, technology stack selection, database schema design, and milestone schedule.",
  },
  {
    id: "step-3",
    step: "03",
    title: "UI/UX Design",
    description: "Interactive Figma prototypes, design systems, responsive layouts, and user experience flows.",
  },
  {
    id: "step-4",
    step: "04",
    title: "Agile Engineering",
    description: "Production-grade code in weekly sprints, with staging deployments and regular stakeholder demos.",
  },
  {
    id: "step-5",
    step: "05",
    title: "Testing & QA",
    description: "Comprehensive cross-device validation, edge case audits, security scans, and speed benchmarks.",
  },
  {
    id: "step-6",
    step: "06",
    title: "Deployment & Launch",
    description: "Zero-downtime production release with automated CI/CD pipelines, analytics, and error monitoring.",
  },
  {
    id: "step-7",
    step: "07",
    title: "Support & Iteration",
    description: "Continuous SLA support, infrastructure monitoring, proactive optimizations, and feature expansions.",
  },
];

export default function Timeline({
  id = "process",
  eyebrow = "OUR PROCESS",
  title = "How We Build",
  periodLabel = "Discovery → Launch",
  description = "A structured 7-step process that eliminates surprises and keeps you informed at every stage.",
  activeColor = "#f0782b",
  backgroundColor = "#0d0e10",
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "NextGen Agency engineering team",
  steps = DEFAULT_PROCESS_STEPS,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Use gsap.matchMedia for clean, responsive ScrollTrigger management
      const mm = gsap.matchMedia();

      // Only enable GSAP ScrollTrigger pinning and horizontal scrub on desktop screens (>= 768px)
      mm.add("(min-width: 768px)", () => {
        const container = containerRef.current;
        const track = trackRef.current;
        const progressLine = progressLineRef.current;
        if (!container || !track) return;

        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, trackWidth - viewportWidth + 120);
        };

        const scrollAmount = getScrollAmount();

        // Main pin & horizontal translation timeline for desktop
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${Math.max(scrollAmount * 1.2, 1400)}`,
            invalidateOnRefresh: true,
          },
        });

        // Slide track horizontally
        mainTl.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        // Fill progress line smoothly
        if (progressLine) {
          mainTl.to(
            progressLine,
            {
              scaleX: 1,
              ease: "none",
            },
            0
          );
        }

        // Animate each milestone dot and card as the progress reaches it
        steps.forEach((step, index) => {
          const progressPoint = (index + 0.3) / steps.length;

          mainTl.to(
            `.dot-${step.id}`,
            {
              scale: 1.3,
              backgroundColor: activeColor,
              borderColor: "#ffffff",
              boxShadow: `0 0 20px ${activeColor}80`,
              duration: 0.08,
              ease: "power1.out",
            },
            progressPoint
          );

          mainTl.to(
            `.stem-${step.id}`,
            {
              backgroundColor: activeColor,
              opacity: 1,
              duration: 0.08,
            },
            progressPoint
          );

          mainTl.to(
            `.card-${step.id}`,
            {
              borderColor: `${activeColor}60`,
              backgroundColor: "rgba(25, 27, 31, 0.95)",
              duration: 0.1,
            },
            progressPoint
          );

          mainTl.to(
            `.badge-${step.id}`,
            {
              color: activeColor,
              duration: 0.08,
            },
            progressPoint
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [steps, activeColor] }
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className="relative w-full md:h-screen md:overflow-hidden select-none flex flex-col justify-center scroll-mt-20 pt-20 pb-16 md:py-0"
      style={{ backgroundColor }}
      aria-labelledby="process-timeline-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-orange/10 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ──────────────────────────────────────────────────────────────────
          DESKTOP VIEW (>= 768px): Pinned Horizontal GSAP Scroll Experience
          ────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative w-full h-[580px] lg:h-[620px] items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-8 lg:gap-14 px-8 lg:px-16 shrink-0 will-change-transform"
        >
          {/* Leading Intro Hero Card */}
          <div className="w-[360px] lg:w-[440px] shrink-0 rounded-3xl border border-white/10 bg-[#141619]/90 backdrop-blur-md p-6 lg:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Image banner inside hero card */}
            <div className="h-44 lg:h-52 w-full rounded-2xl overflow-hidden mb-6 relative border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-orange">
                <Sparkles className="w-3 h-3" />
                <span>{periodLabel}</span>
              </div>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-orange font-semibold block mb-2">
                {eyebrow}
              </span>
              <h2
                id="process-timeline-heading"
                className="font-heading text-2xl lg:text-4xl font-bold text-warm-white tracking-tight mb-3"
              >
                {title}
              </h2>
              <p className="text-muted-grey text-xs lg:text-sm leading-relaxed mb-6">
                {description}
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-warm-white/70">
                <span>SCROLL DOWN TO PROGRESS</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange animate-pulse" />
              </div>
            </div>
          </div>

          {/* Timeline Center Horizontal Track with Step Cards */}
          <div className="relative flex items-center py-10 shrink-0">
            {/* Background Line Track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full" />

            {/* Active Progress Line (Scales from 0 to 1 with scroll) */}
            <div
              ref={progressLineRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-orange to-amber-400 origin-left scale-x-0 rounded-full z-10 shadow-[0_0_12px_rgba(240,120,43,0.5)]"
              style={{ width: "100%" }}
            />

            {/* Step Milestones */}
            <div className="relative flex items-center gap-12 lg:gap-20 z-20">
              {steps.map((step, index) => {
                const isEven = index % 2 === 1;

                return (
                  <div
                    key={step.id}
                    className="relative flex flex-col items-center w-[280px] lg:w-[330px] shrink-0"
                  >
                    {/* Top Content (Odd steps: 01, 03, 05, 07) */}
                    <div
                      className={`h-[180px] lg:h-[200px] flex flex-col justify-end w-full pb-6 transition-all ${
                        isEven ? "invisible opacity-0 pointer-events-none" : ""
                      }`}
                    >
                      <div
                        className={`card-${step.id} p-5 rounded-2xl border border-white/10 bg-[#141619]/80 backdrop-blur-md shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`badge-${step.id} font-mono text-xs font-bold text-muted-grey transition-colors`}
                          >
                            STEP {step.step}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-orange/80" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-warm-white mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-muted-grey text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Milestone Center Node on the Track */}
                    <div className="relative flex items-center justify-center my-1 z-30">
                      {/* Vertical connector stem to top card */}
                      <div
                        className={`stem-${step.id} absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/15 opacity-60 transition-colors ${
                          isEven ? "hidden" : "block"
                        }`}
                      />

                      {/* Milestone Center Dot */}
                      <div
                        className={`dot-${step.id} w-5 h-5 rounded-full bg-[#1c1f24] border-2 border-white/30 transition-transform duration-200 shrink-0`}
                      />

                      {/* Vertical connector stem to bottom card */}
                      <div
                        className={`stem-${step.id} absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/15 opacity-60 transition-colors ${
                          !isEven ? "hidden" : "block"
                        }`}
                      />
                    </div>

                    {/* Bottom Content (Even steps: 02, 04, 06) */}
                    <div
                      className={`h-[180px] lg:h-[200px] flex flex-col justify-start w-full pt-6 transition-all ${
                        !isEven ? "invisible opacity-0 pointer-events-none" : ""
                      }`}
                    >
                      <div
                        className={`card-${step.id} p-5 rounded-2xl border border-white/10 bg-[#141619]/80 backdrop-blur-md shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`badge-${step.id} font-mono text-xs font-bold text-muted-grey transition-colors`}
                          >
                            STEP {step.step}
                          </span>
                          <CheckCircle2 className="w-4 h-4 text-orange/80" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-warm-white mb-1.5">
                          {step.title}
                        </h3>
                        <p className="text-muted-grey text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trailing Outro Card */}
          <div className="w-[300px] lg:w-[320px] shrink-0 rounded-3xl border border-dashed border-orange/40 bg-orange/5 p-8 flex flex-col justify-center items-center text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-orange/15 flex items-center justify-center text-orange mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-xl font-bold text-warm-white mb-2">
              Ready to Ship?
            </h4>
            <p className="text-muted-grey text-xs leading-relaxed mb-5">
              Explore our autonomous 3D pipeline next, or reach out to start your build.
            </p>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-orange hover:bg-orange-light text-white font-medium text-xs transition-colors duration-200"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          MOBILE VIEW (< 768px): Native Vertical Timeline for Phones
          Clean, natural touch scroll, no trapping, perfectly responsive
          ────────────────────────────────────────────────────────────────── */}
      <div className="block md:hidden px-4 sm:px-6 w-full max-w-lg mx-auto">
        {/* Mobile Header Card */}
        <div className="rounded-2xl border border-white/10 bg-[#141619]/90 backdrop-blur-md p-5 mb-8 shadow-xl">
          <div className="h-40 w-full rounded-xl overflow-hidden mb-4 relative border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-orange">
              <Workflow className="w-3 h-3" />
              <span>{periodLabel}</span>
            </div>
          </div>

          <span className="font-mono text-[11px] uppercase tracking-widest text-orange font-semibold block mb-1">
            {eyebrow}
          </span>
          <h2 className="font-heading text-2xl font-bold text-warm-white tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-muted-grey text-xs leading-relaxed">
            {description}
          </p>
        </div>

        {/* Vertical Pipeline Track */}
        <div className="relative pl-7 space-y-5">
          {/* Continuous Vertical Connecting Line */}
          <div
            className="absolute left-[13px] top-3 bottom-6 w-0.5 bg-gradient-to-b from-orange via-orange/60 to-white/10"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={`m-${step.id}`} className="relative group">
              {/* Milestone Node on the Line */}
              <div
                className="absolute -left-7 top-4 w-7 h-7 rounded-full bg-[#141619] border-2 border-orange flex items-center justify-center shadow-[0_0_12px_rgba(240,120,43,0.4)]"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
              </div>

              {/* Step Content Card */}
              <div className="rounded-xl border border-white/10 bg-[#141619]/80 backdrop-blur-md p-4 shadow-md hover:border-orange/30 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] font-bold text-orange">
                    STEP {step.step}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange/70" />
                </div>
                <h3 className="font-heading text-base font-bold text-warm-white mb-1">
                  {step.title}
                </h3>
                <p className="text-muted-grey text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Outro CTA Card for Mobile */}
          <div className="rounded-xl border border-dashed border-orange/40 bg-orange/5 p-5 text-center mt-6">
            <h4 className="font-heading text-base font-bold text-warm-white mb-1">
              Ready to Build?
            </h4>
            <p className="text-muted-grey text-xs leading-relaxed mb-4">
              Tell us about your project or explore our live 3D assembly line below.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-orange hover:bg-orange-dark text-white font-medium text-xs shadow-md transition-colors"
            >
              Start Your Project →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
