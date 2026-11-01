'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import { scaleIn, VIEWPORT_ONCE } from '@/lib/animations';

interface ProjectCardProps {
  name: string;
  tagline: string;
  category: string;
  thumbnail?: string;
  slug: string;
  comingSoon?: boolean;
  className?: string;
}

/**
 * Portfolio project card with hover zoom effect on image.
 * See docs/design.md Section 11 for the visual specification.
 */
export function ProjectCard({
  name,
  tagline,
  category,
  thumbnail,
  slug,
  comingSoon = false,
  className,
}: ProjectCardProps) {
  if (comingSoon) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className={cn(
          'rounded-[20px] border border-border-dark bg-surface-grey overflow-hidden',
          className,
        )}
      >
        <div className="aspect-video bg-charcoal flex items-center justify-center">
          <p className="text-muted-grey text-sm">Coming Soon</p>
        </div>
        <div className="p-6">
          <Badge variant="muted" className="mb-3">{category}</Badge>
          <h3 className="font-heading font-bold text-lg text-warm-white mb-2">{name}</h3>
          <p className="text-sm text-muted-grey">{tagline}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={cn(
        'group rounded-[20px] border border-border-dark bg-surface-grey overflow-hidden',
        'transition-all duration-300 hover:border-orange/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        className,
      )}
    >
      {/* Image with zoom effect */}
      <div className="aspect-video overflow-hidden bg-charcoal">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-grey to-charcoal flex items-center justify-center">
            <span className="text-muted-grey text-sm">Project Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <Badge variant="orange" className="mb-3">{category}</Badge>
        <h3 className="font-heading font-bold text-lg text-warm-white mb-2 leading-snug">
          {name}
        </h3>
        <p className="text-sm text-muted-grey leading-relaxed mb-4">{tagline}</p>
        <Link
          href={`/portfolio/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-orange hover:gap-3 transition-all duration-200"
          aria-label={`View ${name} case study`}
        >
          View Case Study
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
