'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/animations';

interface SectionHeadingProps {
  /** Small uppercase eyebrow text above the main heading */
  eyebrow?: string;
  /** Main heading text (H2 by default) */
  heading: string;
  /** Optional description paragraph below the heading */
  description?: string;
  /** Text alignment */
  align?: 'left' | 'center';
  /** Heading element level */
  level?: 2 | 3;
  /** Theme context — affects text colors */
  theme?: 'dark' | 'light';
  className?: string;
  /** Disable scroll animation (e.g. for hero headings handled separately) */
  animated?: boolean;
  /** Optional id passed to the heading element for aria-labelledby */
  id?: string;
}

/**
 * Reusable section heading with optional eyebrow, main title, and description.
 * Follows the typography hierarchy in docs/design.md Section 3.
 */
export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'center',
  level = 2,
  theme = 'dark',
  className,
  animated = true,
  id,
}: SectionHeadingProps) {
  const Heading = `h${level}` as 'h2' | 'h3';

  const textColor = theme === 'dark' ? 'text-warm-white' : 'text-charcoal';
  const descColor = theme === 'dark' ? 'text-muted-grey' : 'text-text-muted-dark';

  const content = (
    <div
      className={cn(
        'space-y-4',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest text-orange uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          'font-heading font-bold leading-tight',
          'text-[clamp(1.75rem,4vw,2.5rem)]',
          textColor,
        )}
      >
        {heading}
      </Heading>
      {description && (
        <p
          className={cn(
            'text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            descColor,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {content}
    </motion.div>
  );
}
