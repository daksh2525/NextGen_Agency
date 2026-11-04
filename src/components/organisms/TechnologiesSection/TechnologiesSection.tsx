"use client";

import { useState } from "react";
import {
  Code2,
  Palette,
  FileCode,
  Braces,
  Atom,
  AppWindow,
  Wind,
  Server,
  Zap,
  Database,
  Network,
  Radio,
  Terminal,
  Link as LinkIcon,
  Sparkles,
  Cpu,
  GitBranch,
  FolderGit2,
  Box,
  Flame,
  Send,
} from "lucide-react";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import {
  ToolchainMarquee,
  type ToolchainItem,
} from "@/components/ui/toolchain-marquee";

type TechCategory = "all" | "frontend" | "backend" | "ai" | "devops";

interface MobileTechItem {
  label: string;
  category: "frontend" | "backend" | "ai" | "devops";
  type: string;
  icon: React.ReactNode;
  accent: string;
}

const ALL_MOBILE_TECH: MobileTechItem[] = [
  // Frontend
  { label: "Next.js", category: "frontend", type: "Full-Stack React", icon: <AppWindow />, accent: "#171717" },
  { label: "React 19", category: "frontend", type: "UI Library", icon: <Atom />, accent: "#0891b2" },
  { label: "TypeScript", category: "frontend", type: "Strict Typing", icon: <Braces />, accent: "#3178c6" },
  { label: "Tailwind CSS", category: "frontend", type: "Utility Styling", icon: <Wind />, accent: "#0ea5e9" },
  { label: "JavaScript", category: "frontend", type: "Core Web", icon: <FileCode />, accent: "#d97706" },
  { label: "HTML5 / CSS3", category: "frontend", type: "Web Standards", icon: <Palette />, accent: "#e34f26" },

  // Backend
  { label: "Node.js", category: "backend", type: "Runtime", icon: <Server />, accent: "#16a34a" },
  { label: "Express.js", category: "backend", type: "REST Framework", icon: <Zap />, accent: "#475569" },
  { label: "MongoDB", category: "backend", type: "NoSQL Database", icon: <Database />, accent: "#059669" },
  { label: "REST APIs", category: "backend", type: "Architecture", icon: <Network />, accent: "#ea580c" },
  { label: "Socket.io", category: "backend", type: "Real-time", icon: <Radio />, accent: "#7c3aed" },

  // AI & ML
  { label: "Python", category: "ai", type: "Core Language", icon: <Terminal />, accent: "#2563eb" },
  { label: "LangChain", category: "ai", type: "Agent Framework", icon: <LinkIcon />, accent: "#0d9488" },
  { label: "RAG Architecture", category: "ai", type: "Neural Retrieval", icon: <Sparkles />, accent: "#db2777" },
  { label: "Generative AI", category: "ai", type: "LLM Pipeline", icon: <Cpu />, accent: "#e11d48" },

  // DevOps
  { label: "Docker", category: "devops", type: "Containerization", icon: <Box />, accent: "#0284c7" },
  { label: "GitHub Actions", category: "devops", type: "CI/CD Pipeline", icon: <FolderGit2 />, accent: "#24292e" },
  { label: "Git", category: "devops", type: "Version Control", icon: <GitBranch />, accent: "#f05032" },
  { label: "Firebase", category: "devops", type: "Cloud Platform", icon: <Flame />, accent: "#d97706" },
  { label: "Postman", category: "devops", type: "API Testing", icon: <Send />, accent: "#f97316" },
];

const stacks: ToolchainItem[][] = [
  // 1. Frontend
  [
    { label: "HTML5", icon: <Code2 />, accent: "#e34f26" },
    { label: "CSS3", icon: <Palette />, accent: "#264de4" },
    { label: "JavaScript", icon: <FileCode />, accent: "#d97706" },
    { label: "TypeScript", icon: <Braces />, accent: "#3178c6" },
    { label: "React.js", icon: <Atom />, accent: "#0891b2" },
    { label: "Next.js", icon: <AppWindow />, accent: "#171717" },
    { label: "Tailwind CSS", icon: <Wind />, accent: "#0ea5e9" },
  ],
  // 2. Backend
  [
    { label: "Node.js", icon: <Server />, accent: "#16a34a" },
    { label: "Express.js", icon: <Zap />, accent: "#475569" },
    { label: "MongoDB", icon: <Database />, accent: "#059669" },
    { label: "REST API", icon: <Network />, accent: "#ea580c" },
    { label: "Socket.io", icon: <Radio />, accent: "#7c3aed" },
  ],
  // 3. AI / ML
  [
    { label: "Python", icon: <Terminal />, accent: "#2563eb" },
    { label: "LangChain", icon: <LinkIcon />, accent: "#0d9488" },
    { label: "RAG", icon: <Sparkles />, accent: "#db2777" },
    { label: "Generative AI", icon: <Cpu />, accent: "#e11d48" },
  ],
  // 4. Tools & Platforms
  [
    { label: "Git", icon: <GitBranch />, accent: "#f05032" },
    { label: "GitHub", icon: <FolderGit2 />, accent: "#24292e" },
    { label: "Docker", icon: <Box />, accent: "#0284c7" },
    { label: "Firebase", icon: <Flame />, accent: "#d97706" },
    { label: "Postman", icon: <Send />, accent: "#f97316" },
  ],
];

const CATEGORY_TABS: Array<{ id: TechCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI & ML" },
  { id: "devops", label: "DevOps" },
];

/**
 * Technology stack section — light background.
 * Desktop: Animated continuous 4-row ToolchainMarquee.
 * Mobile: Clean categorized touchable cards with category filter chips, no floating navbar collision.
 */
export function TechnologiesSection() {
  const [activeTab, setActiveTab] = useState<TechCategory>("all");

  const filteredMobileTech =
    activeTab === "all"
      ? ALL_MOBILE_TECH
      : ALL_MOBILE_TECH.filter((item) => item.category === activeTab);

  return (
    <section
      id="tech-stack"
      className="w-full overflow-hidden bg-warm-white pt-28 pb-16 sm:py-20 lg:py-24 text-charcoal scroll-mt-24"
      aria-labelledby="tech-heading"
    >
      <div className="container-site mb-8 sm:mb-12">
        <SectionHeading
          id="tech-heading"
          eyebrow="TECH STACK"
          heading="Technologies We Master"
          description="A curated, modern stack selected for performance, developer experience, and long-term maintainability."
          align="center"
          theme="light"
        />
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          DESKTOP VIEW (>= 768px): Continuous 4-Row Toolchain Marquee
          ────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full">
        <ToolchainMarquee
          stacks={stacks}
          rows={4}
          duration={24}
          showControl
        />
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          MOBILE VIEW (< 768px): Tailored, Clean Categorized Grid
          ────────────────────────────────────────────────────────────────── */}
      <div className="block md:hidden px-4 max-w-lg mx-auto">
        {/* Category Pill Switcher */}
        <div className="flex items-center justify-start gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-orange text-white shadow-[0_2px_10px_rgba(240,120,43,0.3)]"
                    : "bg-white/80 border border-border-light text-muted-grey hover:text-charcoal hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Mobile Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredMobileTech.map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl border border-border-light/80 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center gap-2.5 transition-all active:scale-[0.98]"
            >
              {/* Icon Container */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.9]"
                style={{
                  backgroundColor: `color-mix(in srgb, ${item.accent} 12%, #ffffff)`,
                  color: item.accent,
                }}
              >
                {item.icon}
              </div>

              {/* Text Meta */}
              <div className="min-w-0">
                <span className="block font-semibold text-xs text-charcoal truncate">
                  {item.label}
                </span>
                <span className="block text-[10px] text-muted-grey truncate">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologiesSection;
