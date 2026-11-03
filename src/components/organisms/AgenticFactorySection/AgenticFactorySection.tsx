'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/animations';
import { Sparkles, Compass, Cpu, Database, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

// Dynamically import Three.js 3D canvas with SSR disabled to prevent WebGL SSR mismatch
const AgenticFactory3D = dynamic(
  () => import('@/components/ui/agentic-factory-3d'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[580px] flex flex-col items-center justify-center bg-black text-muted-grey gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-orange border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-warm-white/70">
          Initializing 3D Agentic Machine...
        </span>
      </div>
    ),
  }
);

const STATIONS = [
  { id: 'engine', label: '01 Engine', desc: 'Neural core & code synthesis', icon: Cpu },
  { id: 'admin', label: '02 Admin', desc: 'Agent orchestration & guardrails', icon: ShieldCheck },
  { id: 'storefront', label: '03 Storefront', desc: 'Interactive client interfaces', icon: ShoppingBag },
  { id: 'cabinet', label: '04 Cabinet', desc: 'Secure asset & data pipeline', icon: Database },
  { id: 'cashdesk', label: '05 Checkout', desc: 'Automated settlement & delivery', icon: CreditCard },
];

/**
 * AgenticFactorySection — Interactive 3D Assembly Line
 * Showcases NextGen Agency's autonomous AI pipeline via real-time procedural WebGL.
 */
export function AgenticFactorySection() {
  return (
    <section
      id="agentic-factory"
      className="bg-[#0c0d0e] section-padding relative overflow-hidden"
      aria-labelledby="agentic-factory-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <SectionHeading
          id="agentic-factory-heading"
          eyebrow="INTERACTIVE 3D LAB"
          heading="Inside Our Autonomous Assembly Line"
          description="Explore our live agentic pipeline in full 3D. Rotate the machine, switch views, or toggle cutaway mode to see how AI agents turn specifications into production software."
          align="center"
          theme="dark"
        />

        {/* 3D Machine Canvas Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 relative rounded-2xl md:rounded-3xl border border-white/10 bg-black/90 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Subtle Top Info Bar */}
          <div className="px-5 py-3 border-b border-white/10 bg-[#141619]/90 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-grey font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-warm-white font-medium">REAL-TIME PROCEDURAL WEBGL</span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="hidden sm:inline text-white/50">NO PRE-RENDERED ASSETS</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange" />
                <span className="hidden md:inline">DRAG TO ROTATE • SCROLL TO ZOOM</span>
                <span className="md:hidden">TOUCH &amp; DRAG TO SPIN</span>
              </span>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div className="relative w-full h-[520px] sm:h-[600px] md:h-[680px] lg:h-[740px]">
            <AgenticFactory3D height="100%" />
          </div>
        </motion.div>

        {/* Five Pipeline Stations Overview */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATIONS.map((station) => {
            const Icon = station.icon;
            return (
              <div
                key={station.id}
                className="p-3.5 rounded-xl border border-white/5 bg-[#141619]/60 backdrop-blur-sm hover:border-orange/30 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-orange/10 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-warm-white">
                    {station.label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-grey leading-snug">
                  {station.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
