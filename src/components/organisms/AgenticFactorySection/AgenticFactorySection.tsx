'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/animations';
import {
  Compass,
  Cpu,
  Database,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Box,
  Layers,
  Activity,
  ArrowRight,
} from 'lucide-react';

// Dynamically import Three.js 3D canvas with SSR disabled to prevent WebGL SSR mismatch
const AgenticFactory3D = dynamic(
  () => import('@/components/ui/agentic-factory-3d'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center bg-[#101214] text-muted-grey gap-3 rounded-2xl">
        <div className="w-10 h-10 rounded-full border-2 border-orange border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-warm-white/70">
          Initializing 3D Agentic Machine...
        </span>
      </div>
    ),
  }
);

type StationKey = 'engine' | 'admin' | 'storefront' | 'cabinet' | 'cashdesk';

const STATIONS: Array<{
  id: StationKey;
  label: string;
  desc: string;
  icon: typeof Cpu;
}> = [
  { id: 'engine', label: '01 Engine', desc: 'Neural core & code synthesis', icon: Cpu },
  { id: 'admin', label: '02 Admin', desc: 'Agent orchestration & guardrails', icon: ShieldCheck },
  { id: 'storefront', label: '03 Storefront', desc: 'Interactive client interfaces', icon: ShoppingBag },
  { id: 'cabinet', label: '04 Cabinet', desc: 'Secure asset & data pipeline', icon: Database },
  { id: 'cashdesk', label: '05 Checkout', desc: 'Automated settlement & delivery', icon: CreditCard },
];

const STATION_DETAILS: Record<
  StationKey,
  {
    title: string;
    badge: string;
    metrics: Array<{ label: string; value: string }>;
    details: string;
  }
> = {
  engine: {
    title: 'Autonomous Neural Engine',
    badge: 'Code Synthesis Core',
    metrics: [
      { label: 'Latency', value: '38ms' },
      { label: 'Accuracy', value: '99.4%' },
      { label: 'Stack', value: 'Next.js & AI' },
    ],
    details:
      'Translates product specifications into production-grade React components, API routes, and schema models in real-time.',
  },
  admin: {
    title: 'Orchestration & Guardrails',
    badge: 'Validation Engine',
    metrics: [
      { label: 'Guardrails', value: 'Active 100%' },
      { label: 'Test Pass', value: '100% CI/CD' },
      { label: 'Security', value: 'Strict' },
    ],
    details:
      'Supervises subagents, validates strict TypeScript typings, runs unit tests, and verifies compliance with design tokens.',
  },
  storefront: {
    title: 'Interactive Client Interfaces',
    badge: 'Frontend Synthesis',
    metrics: [
      { label: 'UI Speed', value: '60 FPS' },
      { label: 'Performance', value: '99/100' },
      { label: 'Styling', value: 'Tailwind v4' },
    ],
    details:
      'Assembles micro-interactions, responsive layouts, accessible dialogs, and smooth liquid-glass navigation pills.',
  },
  cabinet: {
    title: 'Secure Asset & Data Pipeline',
    badge: 'Data Pipeline',
    metrics: [
      { label: 'Storage', value: 'Encrypted' },
      { label: 'Database', value: 'Real-time' },
      { label: 'Sync', value: 'Immediate' },
    ],
    details:
      'Handles cloud migrations, vector embeddings, image CDN pipelines, and continuous zero-downtime deployment snapshots.',
  },
  cashdesk: {
    title: 'Automated Settlement & Delivery',
    badge: 'Production Release',
    metrics: [
      { label: 'Release', value: 'Automated' },
      { label: 'Billing', value: 'Stripe Ready' },
      { label: 'Uptime', value: '99.99%' },
    ],
    details:
      'Configures billing webhooks, verifies email transmission, activates monitoring, and completes production handover.',
  },
};

/**
 * AgenticFactorySection — Interactive 3D & 2.5D Assembly Line
 * Desktop: Full interactive procedural Three.js 3D WebGL machine.
 * Mobile: Native touch-optimized interactive pipeline station explorer with 0% scroll trap and zero WebGL crash.
 */
export function AgenticFactorySection() {
  const [activeMobileStation, setActiveMobileStation] = useState<StationKey>('engine');
  const [mobileLoad3D, setMobileLoad3D] = useState(false);

  const activeData = STATION_DETAILS[activeMobileStation];
  const ActiveIcon = STATIONS.find((s) => s.id === activeMobileStation)?.icon || Cpu;

  return (
    <section
      id="agentic-factory"
      className="bg-[#0c0d0e] section-padding relative overflow-hidden scroll-mt-24"
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
          description="Explore our live agentic pipeline. Switch stations or examine real-time procedural workflows to see how AI agents turn specifications into production software."
          align="center"
          theme="dark"
        />

        {/* ──────────────────────────────────────────────────────────────────
            DESKTOP VIEW (>= 768px): Full Procedural 3D WebGL Machine
            ────────────────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="hidden md:block mt-12 relative rounded-3xl border border-white/10 bg-black/90 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Subtle Top Info Bar */}
          <div className="px-5 py-3 border-b border-white/10 bg-[#141619]/90 flex items-center justify-between gap-3 text-xs text-muted-grey font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-warm-white font-medium">REAL-TIME PROCEDURAL WEBGL</span>
              <span className="text-white/20">|</span>
              <span className="text-white/50">NO PRE-RENDERED ASSETS</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-orange" />
                <span>DRAG TO ROTATE • SCROLL TO EXPLORE</span>
              </span>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div className="relative w-full h-[600px] lg:h-[700px]">
            <AgenticFactory3D height="100%" embed={true} />
          </div>
        </motion.div>

        {/* ──────────────────────────────────────────────────────────────────
            MOBILE VIEW (< 768px): High-Performance Interactive Station Hub
            Zero scroll hijacking, zero WebGL crash, instant touch responses
            ────────────────────────────────────────────────────────────────── */}
        <div className="block md:hidden mt-8">
          {mobileLoad3D ? (
            <div className="relative rounded-2xl border border-white/10 bg-black/90 shadow-xl overflow-hidden mb-6">
              <div className="p-3 border-b border-white/10 bg-[#141619] flex items-center justify-between text-xs font-mono">
                <span className="text-orange flex items-center gap-1.5 font-semibold">
                  <Activity className="w-3.5 h-3.5" /> 3D LAB ACTIVE
                </span>
                <button
                  type="button"
                  onClick={() => setMobileLoad3D(false)}
                  className="px-2.5 py-1 rounded bg-white/10 text-white text-[11px] hover:bg-white/20"
                >
                  Close 3D
                </button>
              </div>
              <div className="w-full h-[420px] relative">
                <AgenticFactory3D height="100%" embed={true} />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#141619]/90 backdrop-blur-md p-5 shadow-2xl mb-6">
              {/* Header badge */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-warm-white">
                    AGENTIC ASSEMBLY LINE
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-orange/15 text-orange border border-orange/30">
                  {activeData.badge}
                </span>
              </div>

              {/* Station Horizontal Selector Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
                {STATIONS.map((station) => {
                  const isCurrent = activeMobileStation === station.id;
                  const Icon = station.icon;
                  return (
                    <button
                      key={station.id}
                      type="button"
                      onClick={() => setActiveMobileStation(station.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 shrink-0 transition-all ${
                        isCurrent
                          ? 'bg-orange text-white shadow-[0_0_15px_rgba(240,120,43,0.4)]'
                          : 'bg-white/5 text-muted-grey hover:text-warm-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{station.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Station Display Card */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 mb-4">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange/15 border border-orange/30 flex items-center justify-center text-orange shrink-0">
                    <ActiveIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-warm-white">
                      {activeData.title}
                    </h3>
                    <p className="font-mono text-[11px] text-muted-grey">
                      Station: {activeMobileStation.toUpperCase()}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-grey leading-relaxed mb-4">
                  {activeData.details}
                </p>

                {/* Metrics 3-Col Bar */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                  {activeData.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-white/[0.03]">
                      <span className="block font-mono text-[10px] text-muted-grey">
                        {m.label}
                      </span>
                      <span className="block font-heading font-bold text-xs text-warm-white mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Option to launch 3D */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-grey">
                  Want the interactive 3D model?
                </span>
                <button
                  type="button"
                  onClick={() => setMobileLoad3D(true)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-warm-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <Box className="w-3.5 h-3.5 text-orange" />
                  <span>Launch 3D</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Five Pipeline Stations Grid for Desktop & Overview */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATIONS.map((station) => {
            const Icon = station.icon;
            const isSelected = activeMobileStation === station.id;
            return (
              <div
                key={station.id}
                onClick={() => setActiveMobileStation(station.id)}
                className={`p-3.5 rounded-xl border backdrop-blur-sm transition-all group cursor-pointer ${
                  isSelected
                    ? 'border-orange bg-[#181a1d] shadow-[0_0_15px_rgba(240,120,43,0.15)]'
                    : 'border-white/5 bg-[#141619]/60 hover:border-orange/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center transition-transform ${
                      isSelected
                        ? 'bg-orange text-white'
                        : 'bg-orange/10 text-orange group-hover:scale-110'
                    }`}
                  >
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
