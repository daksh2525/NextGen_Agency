import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'muted' | 'outline';
  className?: string;
}

/**
 * Small inline badge/tag component.
 * Used for service categories, technology tags, and status labels.
 */
export function Badge({ children, variant = 'muted', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'orange' && 'bg-orange/15 text-orange',
        variant === 'muted' && 'bg-surface-grey text-muted-grey',
        variant === 'outline' && 'border border-border-dark text-muted-grey',
        className,
      )}
    >
      {children}
    </span>
  );
}
