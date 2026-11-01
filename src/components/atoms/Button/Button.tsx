'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Button variant definitions using class-variance-authority */
const buttonVariants = cva(
  // Base classes
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:opacity-50 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-orange text-white hover:bg-orange-dark hover:shadow-[0_0_24px_rgba(240,120,43,0.25),0_4px_12px_rgba(240,120,43,0.15)] active:scale-[0.98]',
        secondary:
          'bg-transparent border border-warm-white/20 text-warm-white hover:bg-white/8 active:scale-[0.98]',
        'secondary-dark':
          'bg-transparent border border-charcoal/20 text-charcoal hover:bg-black/5 active:scale-[0.98]',
        ghost:
          'bg-transparent text-warm-white hover:text-white group active:scale-[0.98]',
        'ghost-dark':
          'bg-transparent text-charcoal hover:text-text-dark group active:scale-[0.98]',
        outline:
          'bg-transparent border border-orange text-orange hover:bg-orange hover:text-white active:scale-[0.98]',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-[15px]',
        lg: 'px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Shows loading spinner and disables interaction */
  isLoading?: boolean;
  /** Icon rendered before the button label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the button label */
  rightIcon?: React.ReactNode;
  /** Applies full width to the button */
  fullWidth?: boolean;
}

/**
 * Primary Button atom.
 * See docs/design.md Section 9 for all variant specifications.
 *
 * @example
 * <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
 *   Start Your Project
 * </Button>
 */
export function Button({
  children,
  variant,
  size,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
