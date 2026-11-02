"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useAnimationFrame,
  useSpring,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types & Interfaces ---

export interface TeamMember {
  id: string | number;
  row: number;
  col: number;
  name: string;
  role?: string;
  imageUrl: string;
}

export interface PartnerLogo {
  name: string;
  icon: React.ReactNode;
}

export interface TechItem {
  name: string;
  icon: React.ReactNode;
}

export interface AgencyBentoGridProps {
  className?: string;
  teamTitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  teamMembers?: TeamMember[];
  statValue?: number;
  statSuffix?: string;
  statLabel?: string;
  statDescription?: string;
  partnerLogos?: PartnerLogo[];
  testimonialBrand?: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  techTitle?: string;
  techStack?: TechItem[];
}

// --- Crisp Inline Brand SVGs ---

const BrandIcons = {
  Google: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  ),
  Adobe: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#FA0F00">
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z" />
    </svg>
  ),
  Raycast: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="#FF6363">
      <path d="M6.002 15.998v2.999L0 12.996l1.499-1.499 4.503 4.501zm5.001 2v6.002l-4.502-4.502 1.499-1.5h3.003zM12.996 0l11.004 11.004-1.5 1.5-2.502-2.502v3.999l-3.501-3.501-.998.998 2.5 2.501-1.499 1.499-2.501-2.5-.998.998 3.501 3.501h-3.999l2.502 2.502-1.5 1.5L1.992 11.496l1.5-1.5 2.502 2.502V8.499l3.501 3.501.998-.998-2.5-2.501 1.499-1.499 2.501 2.5.998-.998-3.501-3.501h3.999L11.496 1.5 12.996 0z" />
    </svg>
  ),
  Microsoft: () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path
        fill="#F9AB00"
        d="M20.5 21.5a2.5 2.5 0 0 1-2.5-2.5V5a2.5 2.5 0 0 1 5 0v14a2.5 2.5 0 0 1-2.5 2.5z"
      />
      <path
        fill="#E37400"
        d="M12 21.5A2.5 2.5 0 0 1 9.5 19v-7a2.5 2.5 0 0 1 5 0v7a2.5 2.5 0 0 1-2.5 2.5zM3.5 21.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  ),
  OpenAI: () => (
    <svg
      viewBox="0 0 24 24"
      className="w-[18px] h-[18px] fill-zinc-800 dark:fill-zinc-100"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" />
    </svg>
  ),
  Supabase: () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path
        fill="#3ECF8E"
        d="M13.7 21.8c-.5.7-1.6.3-1.6-.5v-8.3h8.8c1.1 0 1.7 1.3 1 2.1l-8.2 6.7z"
      />
      <path
        fill="#3ECF8E"
        fillOpacity="0.72"
        d="M10.3 2.2c.5-.7 1.6-.3 1.6.5V11H3.1c-1.1 0-1.7-1.3-1-2.1l8.2-6.7z"
      />
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none">
      <circle cx="12" cy="12" r="2.1" fill="#38BDF8" />
      <g stroke="#38BDF8" strokeWidth="1.35">
        <ellipse rx="10" ry="4.2" transform="matrix(1 0 0 1 12 12)" />
        <ellipse rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path
        fill="currentColor"
        className="text-zinc-800 dark:text-zinc-100"
        d="M6.7 12.6c0 .6.1 1 .3 1.3l.2.3c.1.1.1.3 0 .4l-.6.4c-.1.1-.3.1-.4 0l-.3-.4c-.2-.3-.4-.6-.5-1-.5.6-1.2 1-2.1 1-1.1 0-1.9-.6-1.9-1.8 0-1.2.9-1.9 2.5-1.9h1.1v-.5c0-.8-.5-1.2-1.3-1.2-.5 0-1.1.2-1.6.4-.2.1-.3 0-.4-.2v-.4c0-.2.1-.3.3-.4.6-.3 1.3-.4 2-.4 1.5 0 2.3.7 2.3 2.2v1.8zm-2.4.7c.6 0 1.2-.3 1.4-.9v-.9h-1c-.9 0-1.4.4-1.4 1 0 .5.4.8 1 .8zm5.9 1.1c-.2 0-.3-.1-.4-.3L8.2 8.7c-.1-.2 0-.4.2-.4h.8c.2 0 .3.1.4.3l1.1 4.2 1-4.2c.1-.2.2-.3.4-.3h.6c.2 0 .3.1.4.3l1 4.2 1.1-4.2c.1-.2.2-.3.4-.3h.7c.2 0 .3.2.2.4l-1.6 5.5c-.1.2-.2.3-.4.3h-.6c-.2 0-.3-.1-.4-.3l-1-4.1-1 4.1c-.1.2-.2.3-.4.3h-.6zm9.5.1c-.8 0-1.6-.2-2.1-.5-.2-.1-.3-.2-.3-.4v-.4c0-.2.2-.3.3-.2.5.3 1.2.5 1.9.5.8 0 1.2-.3 1.2-.8 0-.5-.3-.7-1.1-.9l-.9-.3c-1.1-.3-1.6-.9-1.6-1.8 0-1.1.9-1.8 2.3-1.8.7 0 1.4.1 1.9.4.2.1.3.2.3.4v.4c0 .2-.2.3-.3.2-.5-.2-1-.4-1.7-.4-.7 0-1.1.3-1.1.8 0 .4.3.7 1 .9l.9.3c1.2.4 1.7.9 1.7 1.8 0 1.1-.9 1.8-2.2 1.8z"
      />
      <path
        fill="#FF9900"
        d="M19.4 17.5c-2.3 1.6-5.6 2.5-8.4 2.5-4 0-7.6-1.5-10.3-3.9-.2-.2 0-.5.2-.3 2.9 1.7 6.6 2.7 10.3 2.7 2.5 0 5.3-.5 7.9-1.6.3-.2.6.3.3.6zm.9-1c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3 1.3-.9 3.4-.6 3.6-.3.2.3-.1 2.4-1.3 3.4-.2.2-.4.1-.3-.1.3-.7.9-2.2.7-2.6z"
      />
    </svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path
        fill="#FFA000"
        d="M4.2 18.6L6.9 3.2c.1-.6.9-.8 1.2-.2l3.1 5.8-7 9.8z"
      />
      <path
        fill="#F57F17"
        d="M4.2 18.6l9.6-9.2-2.6-4.9c-.3-.5-1-.5-1.3 0L4.2 18.6z"
      />
      <path
        fill="#FFCA28"
        d="M4.2 18.6l11.9-11.4c.4-.4 1.1-.2 1.2.4l2.5 11-7.8 4.4-7.8-4.4z"
      />
    </svg>
  ),
};

// --- Default Data with reliable Unsplash portraits ---

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 1,
    row: 1,
    col: 2,
    name: "Aarav Sharma",
    role: "Engineering Lead",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    row: 2,
    col: 1,
    name: "David Chen",
    role: "Staff Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    row: 2,
    col: 3,
    name: "Marcus Vance",
    role: "Product Architect",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    row: 3,
    col: 2,
    name: "Priya Patel",
    role: "AI Systems",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
];

const DEFAULT_PARTNERS: PartnerLogo[] = [
  { name: "Google", icon: <BrandIcons.Google /> },
  { name: "Adobe", icon: <BrandIcons.Adobe /> },
  { name: "Raycast", icon: <BrandIcons.Raycast /> },
  { name: "Microsoft", icon: <BrandIcons.Microsoft /> },
];

const DEFAULT_TECH: TechItem[] = [
  { name: "Analytics", icon: <BrandIcons.Analytics /> },
  { name: "OpenAI", icon: <BrandIcons.OpenAI /> },
  { name: "Supabase", icon: <BrandIcons.Supabase /> },
  { name: "React", icon: <BrandIcons.React /> },
  { name: "AWS", icon: <BrandIcons.AWS /> },
  { name: "Firebase", icon: <BrandIcons.Firebase /> },
];

// --- Subcomponents ---

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1] as const,
    });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return <span className="tabular-nums">{display}</span>;
}

/**
 * Velocity-Controlled Right-to-Left Marquee
 */
function InteractiveMarquee({
  children,
  baseSpeed = 38,
  gapClass = "gap-3",
  paddingRight = "12px",
}: {
  children: React.ReactNode;
  baseSpeed?: number;
  gapClass?: string;
  paddingRight?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const xPercent = useMotionValue(0);
  const smoothFactor = useSpring(1, { stiffness: 120, damping: 25 });

  useEffect(() => {
    smoothFactor.set(isHovered ? 0.28 : 1);
  }, [isHovered, smoothFactor]);

  useAnimationFrame((_, delta) => {
    const velocity = (baseSpeed / 1000) * (delta / 16.67) * smoothFactor.get();
    let next = xPercent.get() - velocity;
    if (next <= -100) {
      next += 100;
    }
    xPercent.set(next);
  });

  const xTransform = useTransform(xPercent, (v) => `${v}%`);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex w-full overflow-hidden select-none"
    >
      {[0, 1].map((trackIdx) => (
        <motion.div
          key={trackIdx}
          style={{ x: xTransform, paddingRight }}
          className={cn("flex shrink-0 items-center min-w-full", gapClass)}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}

// --- Main Polished Bento Grid Component ---

export function AgencyBentoGrid({
  className,
  teamTitle = "Get to know our dream team",
  ctaText = "Chat with Alex",
  onCtaClick,
  teamMembers = DEFAULT_TEAM,
  statValue = 100,
  statSuffix = "+",
  statLabel = "Companies served",
  statDescription = "We design and build websites that drive results and help your business grow. No Calls. No BS. Just Results.",
  partnerLogos = DEFAULT_PARTNERS,
  testimonialBrand = "CURSOR",
  testimonialQuote = "“Since adding the AI assistant to our store, our support load has dropped by nearly 60% Customers now get instant answers about supplements, dosages.”",
  testimonialAuthor = "James Finley",
  testimonialRole = "Founder, Primer",
  techTitle = "Technologies we use",
  techStack = DEFAULT_TECH,
}: AgencyBentoGridProps) {
  const [hoveredMemberId, setHoveredMemberId] = useState<
    string | number | null
  >(null);

  const cardSurface =
    "bg-white dark:bg-zinc-900 rounded-[22px] ring-1 ring-black/[0.04] dark:ring-white/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_-6px_rgba(0,0,0,0.03)] transition-shadow duration-500 hover:shadow-[0_2px_4px_rgba(0,0,0,0.03),0_16px_32px_-8px_rgba(0,0,0,0.06)]";

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const repeatedPartners = [...partnerLogos, ...partnerLogos];
  const repeatedTech = [...techStack, ...techStack];

  return (
    <section
      className={cn(
        "w-full py-10 px-4 md:px-6 bg-[#F2F0ED] dark:bg-zinc-950 antialiased selection:bg-zinc-900 selection:text-white flex justify-center items-center",
        className
      )}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.08 }}
        className="max-w-[1120px] w-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-[92px_1fr_92px] gap-3.5"
      >
        {/* CARD 1: Dream Team */}
        <motion.div
          variants={cardVariants}
          className={cn(
            cardSurface,
            "md:col-span-4 md:row-span-3 overflow-hidden flex flex-col justify-between group/team"
          )}
        >
          <div className="relative w-full h-[348px] overflow-hidden">
            <div className="grid grid-cols-5 gap-2.5 w-[130%] -ml-[15%] -mt-[38px]">
              {Array.from({ length: 20 }).map((_, idx) => {
                const r = Math.floor(idx / 5);
                const c = idx % 5;
                const member = teamMembers.find(
                  (m) => m.row === r && m.col === c
                );
                const isHovered = member && hoveredMemberId === member.id;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.018,
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                    onMouseEnter={() =>
                      member && setHoveredMemberId(member.id)
                    }
                    onMouseLeave={() => member && setHoveredMemberId(null)}
                    whileHover={
                      member
                        ? { y: -3, scale: 1.04 }
                        : {
                            backgroundColor: "rgba(0,0,0,0.015)",
                            scale: 0.98,
                          }
                    }
                    className={cn(
                      "aspect-square rounded-[15px] relative transition-colors duration-300",
                      member
                        ? "bg-white dark:bg-zinc-800 p-[3px] ring-1 ring-black/[0.08] dark:ring-white/[0.12] shadow-[0_10px_22px_-5px_rgba(0,0,0,0.18),0_2px_6px_-1px_rgba(0,0,0,0.08)] z-10 cursor-pointer"
                        : "border border-zinc-200/75 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-800/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                    )}
                  >
                    {member && (
                      <>
                        <div className="w-full h-full rounded-[12px] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                          <motion.img
                            animate={{ scale: isHovered ? 1.08 : 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-inset ring-black/10" />
                        </div>

                        <motion.div
                          initial={false}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 4,
                            scale: isHovered ? 1 : 0.92,
                          }}
                          transition={{ duration: 0.16 }}
                          className="pointer-events-none absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-950/90 dark:bg-white/95 text-white dark:text-zinc-900 text-[9px] font-medium tracking-tight whitespace-nowrap shadow-md z-30"
                        >
                          {member.name}
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-zinc-900 via-white/90 dark:via-zinc-900/90 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/50 dark:from-zinc-900/50 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-7 bg-gradient-to-r from-white/75 dark:from-zinc-900/75 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-7 bg-gradient-to-l from-white/75 dark:from-zinc-900/75 to-transparent z-20" />
          </div>

          <div className="p-6 pt-1 relative z-30">
            <h3 className="text-[15px] font-medium tracking-[-0.015em] text-zinc-900 dark:text-zinc-100 mb-3.5">
              {teamTitle}
            </h3>

            <motion.button
              onClick={onCtaClick}
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.02, y: -1 },
                tap: { scale: 0.97, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="group/btn relative inline-flex items-center gap-2.5 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 pl-1.5 pr-4 py-1.5 rounded-[12px] text-[12.5px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.2),0_6px_16px_-4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.16)] cursor-pointer overflow-hidden"
            >
              <motion.span
                variants={{
                  hover: { rotate: 90, scale: 1.06 },
                  tap: { scale: 0.92 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="w-6 h-6 rounded-[8px] bg-gradient-to-b from-[#FFCA28] to-[#F59E0B] flex items-center justify-center text-white shadow-[0_1px_3px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.45)]"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <circle cx="4" cy="4" r="1.1" />
                  <circle cx="8" cy="4" r="1.1" />
                  <circle cx="12" cy="4" r="1.1" />
                  <circle cx="4" cy="8" r="1.1" />
                  <circle cx="8" cy="8" r="1.35" />
                  <circle cx="12" cy="8" r="1.1" />
                  <circle cx="4" cy="12" r="1.1" />
                  <circle cx="8" cy="12" r="1.1" />
                  <circle cx="12" cy="12" r="1.1" />
                </svg>
              </motion.span>
              <span className="pr-0.5">{ctaText}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* CARD 2: 100+ Companies Served */}
        <motion.div
          variants={cardVariants}
          className={cn(
            cardSurface,
            "md:col-span-4 md:row-span-2 p-7 md:p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px] group/stat"
          )}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-4 grid grid-cols-3 gap-2 w-[230px] opacity-70 dark:opacity-20"
            style={{
              maskImage:
                "radial-gradient(circle at 75% 38%, black 15%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at 75% 38%, black 15%, transparent 72%)",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-[12px] border border-zinc-200/80 dark:border-zinc-700/60 bg-gradient-to-br from-orange-50/30 via-transparent to-transparent"
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="text-[64px] md:text-[74px] font-medium tracking-[-0.045em] text-zinc-950 dark:text-white leading-[0.95] flex items-baseline select-none"
            >
              <AnimatedNumber value={statValue} />
              <span className="font-normal text-[56px] md:text-[64px] ml-0.5 text-zinc-900 dark:text-zinc-200">
                {statSuffix}
              </span>
            </motion.div>
            <p className="text-[13.5px] font-normal tracking-[-0.01em] text-zinc-500 dark:text-zinc-400 mt-2.5">
              {statLabel}
            </p>
          </div>

          <p className="relative z-10 text-[13px] leading-[1.55] tracking-[-0.008em] text-zinc-500/90 dark:text-zinc-400 max-w-[30ch] mt-10 text-balance">
            {statDescription}
          </p>
        </motion.div>

        {/* CARD 3: Partner Logos Marquee */}
        <motion.div
          variants={cardVariants}
          className={cn(
            cardSurface,
            "md:col-span-4 md:row-span-1 px-3 py-4 flex items-center relative overflow-hidden min-w-0"
          )}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-zinc-900 via-white/80 dark:via-zinc-900/80 to-transparent z-10" />

          <InteractiveMarquee
            baseSpeed={26}
            gapClass="gap-2.5"
            paddingRight="10px"
          >
            {repeatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                whileHover={{ y: -1.5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[11px] bg-white dark:bg-zinc-800/90 ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] hover:ring-black/[0.12] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] shrink-0 cursor-default transition-shadow"
              >
                {partner.icon}
                <span className="text-[11.5px] font-medium tracking-[-0.01em] text-zinc-700 dark:text-zinc-200 whitespace-nowrap">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </InteractiveMarquee>
        </motion.div>

        {/* CARD 4: CURSOR Testimonial */}
        <motion.div
          variants={cardVariants}
          className={cn(
            cardSurface,
            "md:col-span-4 md:row-span-1 p-6 md:p-7 flex flex-col justify-between relative overflow-hidden group/quote"
          )}
        >
          <div
            className="pointer-events-none absolute -right-4 -top-4 bottom-0 grid grid-cols-3 gap-1.5 w-[210px] opacity-90 dark:opacity-25 transition-transform duration-700 group-hover/quote:scale-[1.03]"
            style={{
              maskImage:
                "radial-gradient(circle at 80% 50%, black 18%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at 80% 50%, black 18%, transparent 72%)",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const isHighlighted = i === 4 || i === 5 || i === 7;
              return (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-[10px] border border-amber-500/[0.12]",
                    isHighlighted
                      ? "bg-gradient-to-br from-amber-500/[0.16] to-orange-400/[0.06]"
                      : "bg-amber-500/[0.04]"
                  )}
                />
              );
            })}
          </div>

          <div className="relative z-10">
            <span className="inline-block text-[11px] font-bold tracking-[0.16em] text-zinc-500/90 dark:text-zinc-400 uppercase mb-3 font-mono select-none">
              {testimonialBrand}
            </span>
            <blockquote className="text-[12.8px] leading-[1.55] tracking-[-0.008em] text-zinc-500 dark:text-zinc-400 text-pretty">
              {testimonialQuote}
            </blockquote>
          </div>

          <div className="relative z-10 mt-5 flex items-center gap-1.5 text-[12px] tracking-[-0.01em]">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              — {testimonialAuthor}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 font-normal">
              {testimonialRole}
            </span>
          </div>
        </motion.div>

        {/* CARD 5: Technologies We Use (No Hover Movement / No Scale / No Cut) */}
        <motion.div
          variants={cardVariants}
          className={cn(
            cardSurface,
            "md:col-span-8 md:row-span-1 px-7 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden min-w-0"
          )}
        >
          <h4 className="text-[13.5px] font-medium tracking-[-0.015em] text-zinc-900 dark:text-zinc-100 shrink-0 z-20">
            {techTitle}
          </h4>

          <div className="relative flex-1 w-full min-w-0 overflow-hidden py-2.5">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-zinc-900 via-white/85 dark:via-zinc-900/85 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-zinc-900 via-white/85 dark:via-zinc-900/85 to-transparent z-10" />

            <InteractiveMarquee
              baseSpeed={22}
              gapClass="gap-3.5"
              paddingRight="14px"
            >
              {repeatedTech.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="relative w-11 h-11 rounded-[13px] bg-zinc-50/80 dark:bg-zinc-800/80 border border-zinc-200/70 dark:border-zinc-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 cursor-default select-none"
                >
                  {tech.icon}
                </div>
              ))}
            </InteractiveMarquee>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AgencyBentoGrid;
