"use client";

/**
 * prisma-hero.tsx
 *
 * NEXTGEN Agency — Cinematic hero component.
 * Full-screen video background, editorial bottom-aligned typography,
 * Framer Motion word-by-word entrance, liquid glass CTA buttons.
 */

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface WordsPullUpProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

interface WordsPullUpMultiStyleProps {
  segments: { text: string; highlight?: boolean }[];
  className?: string;
  delay?: number;
  wordDelay?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation presets
// ─────────────────────────────────────────────────────────────────────────────

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const wordVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
} as const;

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// WordsPullUp
// ─────────────────────────────────────────────────────────────────────────────

export function WordsPullUp({
  text,
  className,
  delay = 0,
  wordDelay = 0.07,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em]"
          variants={wordVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isInView || prefersReducedMotion ? "visible" : "hidden"}
          transition={{
            duration: 0.55,
            delay: delay + i * wordDelay,
            ease: EASE_OUT,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WordsPullUpMultiStyle
// ─────────────────────────────────────────────────────────────────────────────

export function WordsPullUpMultiStyle({
  segments,
  className,
  delay = 0,
  wordDelay = 0.065,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const allWords: { word: string; highlight: boolean }[] = segments.flatMap(
    ({ text, highlight = false }) =>
      text
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, highlight }))
  );

  return (
    <span ref={ref} className={cn("inline", className)}>
      {allWords.map(({ word, highlight }, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn(
            "inline-block mr-[0.22em]",
            highlight
              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#fb923c]"
              : "text-[#F5F5F5]"
          )}
          variants={wordVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isInView || prefersReducedMotion ? "visible" : "hidden"}
          transition={{
            duration: 0.55,
            delay: delay + i * wordDelay,
            ease: EASE_OUT,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Video Background
// ─────────────────────────────────────────────────────────────────────────────

function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* Always-visible fallback gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0f0f0f 0%, #1a1510 40%, #1c160a 70%, #201a0a 100%)",
        }}
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          animation: "videoFadeIn 1.4s ease-in-out 0.3s both",
        }}
      >
        <source src="/videos/nextgen-mountain-work.mp4" type="video/mp4" />
      </video>

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 100%)",
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "75%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 30%, rgba(0,0,0,0.20) 65%, transparent 100%)",
        }}
      />

      {/* Left fade */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollIndicator
// ─────────────────────────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      aria-hidden="true"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
        Scroll
      </span>
      <ChevronDown className="h-4 w-4 animate-bounce" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PrismaHero — main component
// ─────────────────────────────────────────────────────────────────────────────

export function PrismaHero() {
  const prefersReducedMotion = useReducedMotion();

  const headlineWordCount = 4;
  const headlineDelay = 0.5;
  const headlineWordDelay = 0.08;
  const descDelay = headlineDelay + headlineWordCount * headlineWordDelay + 0.4;

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#111111]"
      aria-label="Hero — Our Work Never Stops"
    >
      <VideoBackground />

      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        <div className="container-site pb-16 md:pb-20 lg:pb-24">
          {/* ─── EYEBROW BADGE ─── */}
          <motion.div
            custom={0.3}
            variants={fadeUpVariant}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            className="mb-6 inline-flex"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-4 py-1.5 text-sm font-medium text-[#F97316]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F97316]" />
              Software Engineering × Practical AI
            </span>
          </motion.div>

          {/* ─── MAIN LAYOUT GRID ─── */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[58%_42%] lg:gap-12 lg:items-end">
            {/* ── LEFT: Headline ── */}
            <div>
              <h1
                className="font-heading font-extrabold leading-[1.04] text-[#F5F5F5]"
                style={{ fontSize: "clamp(2.25rem, 7vw, 6.5rem)" }}
              >
                <WordsPullUpMultiStyle
                  segments={[
                    { text: "Our Work", highlight: false },
                    { text: "Never Stops.", highlight: true },
                  ]}
                  delay={headlineDelay}
                  wordDelay={headlineWordDelay}
                />
              </h1>

              <motion.p
                custom={
                  headlineDelay + headlineWordCount * headlineWordDelay + 0.1
                }
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className="mt-3 font-heading text-[#A1A1AA]"
                style={{ fontSize: "clamp(1rem, 2.2vw, 1.5rem)" }}
              >
                Not Even on Top of a Mountain.
              </motion.p>
            </div>

            {/* ── RIGHT: Description + CTAs ── */}
            <div className="flex flex-col gap-6 lg:pb-2">
              <motion.p
                custom={descDelay}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className="text-base sm:text-[17px] leading-relaxed text-zinc-200 lg:text-lg max-w-md drop-shadow-sm"
              >
                We build high-performance web apps, scalable SaaS, and{" "}
                <span className="text-orange font-semibold">
                  production-grade AI
                </span>{" "}
                engineered to scale your business.
              </motion.p>

              {/* CTA buttons (liquid glass) */}
              <motion.div
                custom={descDelay + 0.2}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className="flex flex-col items-start gap-3 sm:flex-row sm:items-center"
              >
                <Button
                  size="md"
                  href="#contact"
                  rightIcon={
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  }
                >
                  Start Your Project
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  href="#portfolio"
                >
                  Explore Our Work
                </Button>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                custom={descDelay + 0.35}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1"
              >
                {[
                  { label: "Countries Served", value: "10+" },
                  { label: "Services Offered", value: "11" },
                  { label: "AI-Powered Projects", value: "✓" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading font-bold text-xl text-[#F5F5F5]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
