"use client";

import React, { ElementType, ReactNode, RefObject } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineContentProps {
  as?: ElementType;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children?: ReactNode;
}

export function TimelineContent({
  as = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps & Record<string, unknown>) {
  const fallbackRef = React.useRef<HTMLElement>(null);
  const targetRef = timelineRef || fallbackRef;
  const isInView = useInView(targetRef as RefObject<Element>, {
    once: true,
    amount: 0.15,
  });

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const Component = (motion as unknown as Record<string, React.ElementType>)[as as string] || motion.div;

  return (
    <Component
      ref={timelineRef ? undefined : fallbackRef}
      variants={customVariants || defaultVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export default TimelineContent;
