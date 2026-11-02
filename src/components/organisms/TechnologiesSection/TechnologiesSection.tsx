"use client";

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

/**
 * Technology stack section — light background, animated ToolchainMarquee.
 * Displays production-grade frontend, backend, AI/ML, and DevOps toolchains.
 */
export function TechnologiesSection() {
  return (
    <section
      id="tech-stack"
      className="w-full overflow-hidden bg-warm-white section-padding text-charcoal"
      aria-labelledby="tech-heading"
    >
      <div className="container-site mb-12">
        <SectionHeading
          id="tech-heading"
          eyebrow="TECH STACK"
          heading="Technologies We Master"
          description="A curated, modern stack selected for performance, developer experience, and long-term maintainability."
          align="center"
          theme="light"
        />
      </div>

      <div className="w-full">
        <ToolchainMarquee
          stacks={stacks}
          rows={4}
          duration={24}
          showControl
        />
      </div>
    </section>
  );
}

export default TechnologiesSection;
