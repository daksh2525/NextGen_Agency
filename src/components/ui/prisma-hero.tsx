'use client';

/**
 * prisma-hero.tsx
 *
 * NEXTGEN Agency — Cinematic hero component.
 * Inspired by the PrismaHero pattern: full-screen video background,
 * editorial bottom-aligned typography, Framer Motion word-by-word entrance.
 *
 * Usage:
 *   import { PrismaHero } from '@/components/ui/prisma-hero';
 *   <PrismaHero />
 *
 * No navbar is included here — the existing Navbar in layout.tsx sits above.
 *
 * Brand palette (NEXTGEN):
 *   Background  #151515 / #171717
 *   Accent      #F97316  (orange)
 *   Text        #F5F5F5
 *   Secondary   #A1A1AA
 *   Border      #292929
 */

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface WordsPullUpProps {
  /** Space-separated string of words that animate in one by one */
  text: string;
  /** Optional className applied to the outer wrapper span */
  className?: string;
  /** Delay before the first word begins (seconds) */
  delay?: number;
  /** Extra delay between each word (seconds) */
  wordDelay?: number;
}

interface WordsPullUpMultiStyleProps {
  /** Array of segments — each has text and optional highlight flag */
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
  hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
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
// Each word slides up and fades in individually.
// ─────────────────────────────────────────────────────────────────────────────

export function WordsPullUp({
  text,
  className,
  delay = 0,
  wordDelay = 0.07,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(' ');

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em]"
          variants={wordVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
          transition={{
            duration: 0.55,
            delay: delay + i * wordDelay,
            ease: EASE_OUT,
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WordsPullUpMultiStyle
// Like WordsPullUp but supports orange-highlighted segments within a headline.
// ─────────────────────────────────────────────────────────────────────────────

export function WordsPullUpMultiStyle({
  segments,
  className,
  delay = 0,
  wordDelay = 0.065,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  // Flatten all words while preserving their highlight state
  const allWords: { word: string; highlight: boolean }[] = segments.flatMap(
    ({ text, highlight = false }) =>
      text.split(' ').filter(Boolean).map((word) => ({ word, highlight }))
  );

  return (
    <span ref={ref} className={cn('inline', className)}>
      {allWords.map(({ word, highlight }, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={cn(
            'inline-block mr-[0.22em]',
            highlight
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#fb923c]'
              : 'text-[#F5F5F5]'
          )}
          variants={wordVariants}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
          transition={{
            duration: 0.55,
            delay: delay + i * wordDelay,
            ease: EASE_OUT,
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Video Background
//
// Implementation notes:
// - Plain <video> element with autoPlay muted playsInline loop.
// - The video starts opacity-0 and fades to opacity-100 via a CSS keyframe
//   animation (`animate-video-fadein`) that fires after a short delay.
//   This avoids all JS state / event-listener timing issues — the fade-in
//   happens unconditionally once the element mounts, while the browser
//   starts buffering in parallel.
// - `preload="auto"` tells the browser to buffer eagerly.
// - A dark gradient fallback sits underneath; it is always visible so
//   there is never a white flash even before the video loads.
// ─────────────────────────────────────────────────────────────────────────────

function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">

      {/* Always-visible fallback gradient — sits under the video layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #0f0f0f 0%, #1a1510 40%, #1c160a 70%, #201a0a 100%)',
        }}
      />

      {/*
        Video fades in via CSS animation so it's independent of JS event
        timing. `style` uses a keyframe defined in globals.css.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          animation: 'videoFadeIn 1.4s ease-in-out 0.3s both',
        }}
      >
        <source src="/videos/nextgen-mountain-work.mp4" type="video/mp4" />
      </video>

      {/* ── Cinematic overlays ── */}

      {/* Top vignette — keeps navbar text readable */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 100%)',
        }}
      />

      {/* Bottom gradient — anchors the editorial text */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '75%',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.70) 30%, rgba(0,0,0,0.20) 65%, transparent 100%)',
        }}
      />

      {/* Left fade — text legibility against bright sky/landscape */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
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
// ScrollIndicator — bouncing arrow below the fold
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
      <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
      <ChevronDown className="h-4 w-4 animate-bounce" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PrismaHero — main component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PrismaHero
 *
 * Full-screen cinematic hero section for NEXTGEN Agency.
 *
 * Layout:
 * - Full-viewport section with video background
 * - Content anchored to the BOTTOM-LEFT (editorial style)
 * - Headline occupies ~55% width on desktop
 * - Description + CTAs appear to the right / below on desktop
 * - On mobile: stacked vertically, headline then description then CTAs
 *
 * Animation sequence:
 *   0.0s  — video fades in
 *   0.3s  — eyebrow badge fades up
 *   0.5s  — "Our Work" pulls up word-by-word
 *   0.7s  — "Never Stops." pulls up (highlighted orange)
 *   1.2s  — supporting slogan fades up
 *   1.5s  — description fades up
 *   1.8s  — CTA buttons fade up
 *   2.4s  — scroll indicator appears
 */
export function PrismaHero() {
  const prefersReducedMotion = useReducedMotion();

  // Total word count for the headline to calculate description delay
  // "Our Work" = 2 words, "Never Stops." = 2 words
  const headlineWordCount = 4;
  const headlineDelay = 0.5;
  const headlineWordDelay = 0.08;
  const descDelay = headlineDelay + headlineWordCount * headlineWordDelay + 0.4;

  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#111111]"
      aria-label="Hero — Our Work Never Stops"
    >
      {/* ── Video background ── */}
      <VideoBackground />

      {/* ── Foreground content ── */}
      {/*
        Outer: full-height flex column, justify-end so content sits at bottom.
        The navbar at the top is rendered in layout.tsx — we don't touch it.
        We add enough top padding (pt-32) so content never hides under the navbar.
      */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        <div className="container-site pb-16 md:pb-20 lg:pb-24">

          {/* ─── EYEBROW BADGE ─────────────────────────────────────────────── */}
          <motion.div
            custom={0.3}
            variants={fadeUpVariant}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="mb-6 inline-flex"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-4 py-1.5 text-sm font-medium text-[#F97316]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F97316]" />
              Software Engineering × Practical AI
            </span>
          </motion.div>

          {/* ─── MAIN LAYOUT GRID ─────────────────────────────────────────── */}
          {/*
            Desktop: 2-column — headline left, description+CTAs right.
            Mobile: single column stack.
          */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[58%_42%] lg:gap-12 lg:items-end">

            {/* ── LEFT: Headline ── */}
            <div>
              {/* Main headline */}
              <h1
                className="font-heading font-extrabold leading-[1.04] text-[#F5F5F5]"
                style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)' }}
              >
                <WordsPullUpMultiStyle
                  segments={[
                    { text: 'Our Work', highlight: false },
                    { text: 'Never Stops.', highlight: true },
                  ]}
                  delay={headlineDelay}
                  wordDelay={headlineWordDelay}
                />
              </h1>

              {/* Supporting slogan */}
              <motion.p
                custom={headlineDelay + headlineWordCount * headlineWordDelay + 0.1}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                className="mt-3 font-heading text-[#A1A1AA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)' }}
              >
                Not Even on Top of a Mountain.
              </motion.p>
            </div>

            {/* ── RIGHT: Description + CTAs ── */}
            <div className="flex flex-col gap-6 lg:pb-2">
              {/* Description */}
              <motion.p
                custom={descDelay}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                className="text-base leading-relaxed text-[#A1A1AA] lg:text-lg max-w-md"
              >
                From ambitious ideas to powerful digital products, we build innovative
                web applications, SaaS platforms and AI-powered solutions —
                wherever the journey takes us.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                custom={descDelay + 0.2}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* Primary CTA */}
                <Link href="/contact" className="group">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5',
                      'bg-[#F97316] text-white font-semibold text-[15px]',
                      'transition-all duration-200',
                      'hover:bg-[#ea6c0a] hover:shadow-[0_0_28px_rgba(249,115,22,0.35),0_4px_16px_rgba(249,115,22,0.2)]',
                      'active:scale-[0.97]',
                      'select-none',
                    )}
                  >
                    Start Your Project
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>

                {/* Secondary CTA */}
                <Link href="/portfolio" className="group">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5',
                      'bg-white/10 text-[#F5F5F5] font-semibold text-[15px]',
                      'border border-white/15',
                      'backdrop-blur-sm',
                      'transition-all duration-200',
                      'hover:bg-white/15 hover:border-white/25',
                      'active:scale-[0.97]',
                      'select-none',
                    )}
                  >
                    Explore Our Work
                  </span>
                </Link>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                custom={descDelay + 0.35}
                variants={fadeUpVariant}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                className="flex items-center gap-6 pt-1"
              >
                {[
                  { label: 'Countries Served',    value: '10+' },
                  { label: 'Services Offered',    value: '11'  },
                  { label: 'AI-Powered Projects', value: '✓'   },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading font-bold text-xl text-[#F5F5F5]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#A1A1AA] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
