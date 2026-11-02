"use client";

import * as React from "react";
import {
  Activity,
  AppWindow,
  Atom,
  Blocks,
  Box,
  Braces,
  CirclePlay,
  Cpu,
  Feather,
  Grid3X3,
  Orbit,
  Pause,
  Play,
  Sparkles,
  Wind,
  Waves,
  Zap,
} from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

export type ToolchainItem = {
  label: string;
  icon: React.ReactNode;
  accent: string;
};

export type ToolchainMarqueeProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  items?: ToolchainItem[];
  stacks?: ToolchainItem[][];
  duration?: number;
  rows?: number;
  showControl?: boolean;
};

const defaultStacks: ToolchainItem[][] = [
  [
    { label: "React 19", icon: <Atom />, accent: "#62c7de" },
    { label: "TypeScript", icon: <Braces />, accent: "#5685d8" },
    { label: "Framer Motion", icon: <Waves />, accent: "#9b79ff" },
    { label: "Paper Shaders", icon: <Sparkles />, accent: "#df8eb4" },
    { label: "Base UI", icon: <Grid3X3 />, accent: "#d3a562" },
  ],
  [
    { label: "Next.js", icon: <AppWindow />, accent: "#b8b8b8" },
    { label: "Tailwind CSS", icon: <Wind />, accent: "#59c8e6" },
    { label: "Radix UI", icon: <Blocks />, accent: "#a995ff" },
    { label: "Lucide", icon: <Feather />, accent: "#ef8c7f" },
    { label: "Vite", icon: <Zap />, accent: "#d5a0ff" },
  ],
  [
    { label: "GSAP", icon: <Activity />, accent: "#9fd55d" },
    { label: "Three.js", icon: <Box />, accent: "#b9b9b9" },
    { label: "Rive", icon: <Orbit />, accent: "#6f9cf5" },
    { label: "Lottie", icon: <CirclePlay />, accent: "#65d7c7" },
    { label: "WebGL", icon: <Cpu />, accent: "#e49769" },
  ],
];

function ToolchainGroup({
  groupRef,
  items,
  hidden = false,
}: {
  groupRef?: React.Ref<HTMLDivElement>;
  items: ToolchainItem[];
  hidden?: boolean;
}) {
  return (
    <div
      ref={groupRef}
      className="flex items-center shrink-0 gap-2 sm:gap-3 pr-2 sm:pr-3"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <span
          className="inline-flex items-center justify-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border text-xs sm:text-[13px] font-medium text-[#171716] shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default select-none"
          key={`${hidden ? "copy-" : ""}${item.label}`}
          style={
            {
              "--tool-accent": item.accent,
              borderColor: `color-mix(in srgb, ${item.accent} 30%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${item.accent} 7%, #ffffff)`,
            } as React.CSSProperties
          }
        >
          <span
            className="flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 [&>svg]:stroke-[1.8]"
            style={{ color: item.accent }}
            aria-hidden="true"
          >
            {item.icon}
          </span>
          <span className="text-[#171716] font-medium">{item.label}</span>
        </span>
      ))}
    </div>
  );
}

function ToolchainRow({
  direction,
  duration,
  items,
  paused,
  reduceMotion,
}: {
  direction: "left" | "right";
  duration: number;
  items: ToolchainItem[];
  paused: boolean;
  reduceMotion: boolean;
}) {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const groupRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef(0);
  const [copyCount, setCopyCount] = React.useState(4);
  const x = useMotionValue(0);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group || typeof ResizeObserver === "undefined") return;

    function updateCopyCount() {
      const viewportWidth = viewport?.clientWidth ?? 0;
      const groupWidth = group?.offsetWidth ?? 0;
      if (viewportWidth === 0 || groupWidth === 0) return;

      setCopyCount(Math.max(2, Math.ceil(viewportWidth / groupWidth) + 1));
    }

    updateCopyCount();
    const observer = new ResizeObserver(updateCopyCount);
    observer.observe(viewport);
    observer.observe(group);

    return () => observer.disconnect();
  }, [items]);

  React.useEffect(() => {
    if (reduceMotion) {
      progressRef.current = 0;
      x.set(0);
    }
  }, [reduceMotion, x]);

  useAnimationFrame((_time, delta) => {
    if (reduceMotion || paused) return;

    const groupWidth = groupRef.current?.offsetWidth ?? 0;
    if (groupWidth === 0) return;

    const distance = (groupWidth / Math.max(duration, 1)) * (delta / 1000);
    const progress = (progressRef.current + distance) % groupWidth;
    progressRef.current = progress;
    x.set(direction === "left" ? -progress : progress - groupWidth);
  });

  return (
    <div
      ref={viewportRef}
      className="w-full overflow-hidden relative"
      data-direction={direction}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max will-change-transform"
        style={{ x }}
      >
        {Array.from(
          { length: reduceMotion ? 1 : copyCount },
          (_, copyIndex) => (
            <ToolchainGroup
              groupRef={copyIndex === 0 ? groupRef : undefined}
              items={items}
              hidden={copyIndex > 0}
              key={copyIndex}
            />
          )
        )}
      </motion.div>
    </div>
  );
}

export function ToolchainMarquee({
  className,
  duration = 22,
  items,
  rows = 3,
  showControl = false,
  stacks,
  ...props
}: ToolchainMarqueeProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [paused, setPaused] = React.useState(false);
  const rowCount = Math.max(1, Math.min(8, Math.round(rows)));
  const customStacks = stacks?.filter((stack) => stack.length > 0);
  const resolvedStacks = customStacks?.length
    ? customStacks
    : items?.length
    ? [items]
    : defaultStacks;

  function togglePlayback() {
    const nextPaused = !paused;
    setPaused(nextPaused);
  }

  return (
    <div
      {...props}
      className={cn(
        "relative w-full overflow-hidden flex flex-col gap-3.5",
        className
      )}
      data-slot="toolchain-marquee"
      data-reduced-motion={reduceMotion || undefined}
    >
      <div className="flex flex-col gap-2.5 sm:gap-3.5 w-full overflow-hidden">
        {Array.from({ length: rowCount }, (_, index) => (
          <ToolchainRow
            direction={index % 2 === 0 ? "left" : "right"}
            duration={duration * (1 + ((index % 3) - 1) * 0.06)}
            items={resolvedStacks[index % resolvedStacks.length]}
            key={index}
            paused={paused}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      {!reduceMotion && showControl && (
        <button
          className="self-center inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#d4d4d4] bg-white text-[#171716] shadow-sm hover:bg-[#e9e8e3] transition-colors [&>svg]:w-3.5 [&>svg]:h-3.5 cursor-pointer mt-4"
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play tool animation" : "Pause tool animation"}
          aria-pressed={paused}
        >
          {paused ? <Play /> : <Pause />}
        </button>
      )}
    </div>
  );
}

export default ToolchainMarquee;
