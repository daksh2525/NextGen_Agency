'use client';

import Link from 'next/link';
import { ArrowUpRight, Globe, Layers, Cloud, Brain, BookOpen, Bot, Smartphone, ShoppingBag, Server, Palette, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scaleIn, VIEWPORT_ONCE } from '@/lib/animations';
import type { Service } from '@/types/service';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Layers,
  Cloud,
  Brain,
  BookOpen,
  Bot,
  Smartphone,
  ShoppingBag,
  Server,
  Palette,
  Wrench,
};

interface ServiceCardProps {
  service: Service;
  /** Additional Tailwind classes for bento grid sizing */
  className?: string;
  /** Minimum height variant for bento layout */
  size?: 'standard' | 'tall' | 'wide';
}

/**
 * Service card component for the bento grid layout.
 * See docs/design.md Section 11 for the visual specification.
 */
export function ServiceCard({ service, className, size = 'standard' }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] ?? Globe;

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(
        'group relative rounded-[20px] border border-border-dark bg-surface-grey p-6',
        'flex flex-col justify-between overflow-hidden',
        'transition-all duration-300 hover:border-orange/30 hover:scale-[1.01]',
        'cursor-pointer',
        size === 'standard' && 'min-h-[220px]',
        size === 'tall' && 'min-h-[340px]',
        size === 'wide' && 'min-h-[220px]',
        className,
      )}
    >
      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(240,120,43,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-orange transition-colors duration-300 group-hover:bg-orange/20">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-heading font-bold text-lg text-warm-white mb-2 leading-snug">
            {service.name}
          </h3>
          <p className="text-sm text-muted-grey leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Arrow link */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/services/${service.slug}`}
            className="text-sm font-medium text-muted-grey hover:text-orange transition-colors duration-200"
            aria-label={`Learn more about ${service.name}`}
          >
            Learn more
          </Link>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-border-dark text-muted-grey transition-all duration-300 group-hover:bg-orange group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Full-card link overlay */}
      <Link
        href={`/services/${service.slug}`}
        className="absolute inset-0 z-20"
        aria-label={service.name}
        tabIndex={-1}
      />
    </motion.div>
  );
}
