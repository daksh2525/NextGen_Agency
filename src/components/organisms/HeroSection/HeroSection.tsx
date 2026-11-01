'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useReducedMotionPref } from '@/hooks/useReducedMotion';
import { fadeUp, fadeIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/animations';
import { SPRING_GENTLE } from '@/lib/animations';

/**
 * Hero section with interactive 3D device mockup parallax.
 * Mouse tracking creates subtle rotation on laptop/phone mockups.
 *
 * Parallax disabled on:
 * - Touch / coarse pointer devices
 * - prefers-reduced-motion: reduce
 *
 * See docs/design.md Section 19 for the full 3D parallax specification.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotionPref();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const parallaxEnabled = !prefersReducedMotion && !isTouch;

  // Mouse position motion values (normalized -0.5 → 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Laptop transforms
  const laptopRotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const laptopRotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const laptopTranslateX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const laptopTranslateY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  // Phone transforms (different intensity)
  const phoneRotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const phoneRotateY = useTransform(mouseX, [-0.5, 0.5], [12, -12]);
  const phoneTranslateX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const phoneTranslateY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  // Apply spring physics for smooth damping
  const smoothLaptopRotateX = useSpring(laptopRotateX, SPRING_GENTLE);
  const smoothLaptopRotateY = useSpring(laptopRotateY, SPRING_GENTLE);
  const smoothLaptopTranslateX = useSpring(laptopTranslateX, SPRING_GENTLE);
  const smoothLaptopTranslateY = useSpring(laptopTranslateY, SPRING_GENTLE);

  const smoothPhoneRotateX = useSpring(phoneRotateX, SPRING_GENTLE);
  const smoothPhoneRotateY = useSpring(phoneRotateY, SPRING_GENTLE);
  const smoothPhoneTranslateX = useSpring(phoneTranslateX, SPRING_GENTLE);
  const smoothPhoneTranslateY = useSpring(phoneTranslateY, SPRING_GENTLE);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center bg-charcoal overflow-hidden"
      aria-label="Hero"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        {/* Orange glow */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #F0782B 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Noise */}
        <div className="absolute inset-0 noise-bg" aria-hidden="true" />
      </div>

      <div className="container-site relative z-10 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeIn}
              className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              Software Engineering × Practical AI
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-heading font-extrabold leading-[1.08] text-warm-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              We Build{' '}
              <span className="text-gradient">Digital Products</span>{' '}
              That Drive Real Growth
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-grey leading-relaxed max-w-xl"
            >
              Premium web applications, SaaS platforms, and AI-powered solutions
              engineered for startups and enterprises worldwide. From MVP to scale — one team, full ownership.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
                >
                  Start Your Project
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="secondary" size="lg">
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-6 pt-2"
            >
              {[
                { label: 'Countries Served' , value: '10+' },
                { label: 'Services Offered', value: '11' },
                { label: 'AI-Powered Projects', value: '✓' },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="font-heading font-bold text-2xl text-warm-white">{stat.value}</div>
                  <div className="text-xs text-muted-grey">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Device Mockups */}
          <div
            className="relative flex items-center justify-center lg:justify-end"
            style={{ perspective: '1000px' }}
            aria-hidden="true"
          >
            {/* Laptop Mockup */}
            <motion.div
              style={
                parallaxEnabled
                  ? {
                      rotateX: smoothLaptopRotateX,
                      rotateY: smoothLaptopRotateY,
                      x: smoothLaptopTranslateX,
                      y: smoothLaptopTranslateY,
                      transformStyle: 'preserve-3d',
                    }
                  : {}
              }
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Laptop frame */}
              <div
                className="relative w-[340px] lg:w-[420px] rounded-[16px] bg-[#1a1a1a] border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.3)]"
                role="img"
                aria-label="Example SaaS dashboard"
              >
                {/* Laptop screen bezel */}
                <div className="px-3 pt-3 bg-[#111]">
                  {/* Browser chrome */}
                  <div className="rounded-t-lg bg-[#1e1e1e] px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#28C940]" />
                    </div>
                    <div className="flex-1 rounded bg-[#292929] px-3 py-0.5 text-[10px] text-muted-grey text-center">
                      app.nextgenagency.dev
                    </div>
                  </div>
                  {/* Screen content - stylised dashboard */}
                  <div className="bg-[#0f0f0f] aspect-[16/10] rounded-b-lg overflow-hidden p-3">
                    {/* Dashboard preview */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {['#F0782B', '#22c55e', '#3b82f6'].map((color, i) => (
                        <div key={i} className="rounded-lg bg-surface-grey p-2">
                          <div className="h-1.5 w-8 rounded mb-1.5" style={{ background: color, opacity: 0.7 }} />
                          <div className="h-4 font-bold text-white text-xs">
                            {['$24.8k', '1,204', '98.2%'][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-surface-grey p-2 mb-2">
                      <div className="flex items-end gap-1 h-12">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t"
                            style={{
                              height: `${h}%`,
                              background: i === 9 ? '#F0782B' : 'rgba(240,120,43,0.3)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[90, 70, 55].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded bg-surface-grey flex-shrink-0" />
                          <div className="h-2 rounded bg-surface-grey" style={{ width: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Laptop base */}
                <div className="h-3 bg-[#111] rounded-b-[16px]" />
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              style={
                parallaxEnabled
                  ? {
                      rotateX: smoothPhoneRotateX,
                      rotateY: smoothPhoneRotateY,
                      x: smoothPhoneTranslateX,
                      y: smoothPhoneTranslateY,
                      transformStyle: 'preserve-3d',
                    }
                  : {}
              }
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-8 -left-4 lg:-bottom-12 lg:-left-16"
            >
              <div
                className="w-[120px] lg:w-[140px] rounded-[20px] bg-[#1a1a1a] border border-white/10 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                role="img"
                aria-label="Example mobile application"
              >
                {/* Phone notch */}
                <div className="h-5 bg-[#111] flex items-center justify-center">
                  <div className="h-1.5 w-12 rounded-full bg-[#2a2a2a]" />
                </div>
                {/* Phone screen */}
                <div className="bg-[#0f0f0f] aspect-[9/19] p-2">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-16 rounded bg-orange/40" />
                    <div className="h-1.5 w-12 rounded bg-surface-grey" />
                  </div>
                  <div className="mt-3 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="rounded-lg bg-surface-grey p-2">
                        <div className="h-1.5 w-full rounded bg-border-dark mb-1" />
                        <div className="h-1.5 w-3/4 rounded bg-border-dark" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-lg bg-orange/20 p-2 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange" />
                    <div className="h-1.5 flex-1 rounded bg-orange/40" />
                  </div>
                </div>
                <div className="h-4 bg-[#111] flex items-center justify-center">
                  <div className="h-1 w-8 rounded-full bg-[#2a2a2a]" />
                </div>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 lg:top-4 lg:right-0 hidden sm:block"
            >
              <div className="rounded-xl border border-border-dark bg-[#1a1a1a] px-3 py-2 shadow-card text-xs text-warm-white font-medium">
                ⚡ AI-Powered Stack
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-grey"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
