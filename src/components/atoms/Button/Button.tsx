"use client";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

type Variant =
  | "primary"
  | "secondary"
  | "secondary-dark"
  | "ghost"
  | "ghost-dark"
  | "outline";
type Size = "sm" | "md" | "lg";

const liquidTone: Record<Exclude<Variant, "ghost" | "ghost-dark">, string> = {
  primary: "dark bg-orange/90 text-white",
  secondary: "dark bg-white/5 text-warm-white",
  "secondary-dark": "bg-charcoal/5 text-charcoal",
  outline: "dark bg-orange/10 text-orange hover:text-white",
};

const liquidSize = { sm: "lg", md: "xl", lg: "xxl" } as const;

const ghostTone = {
  ghost: "text-warm-white hover:text-white",
  "ghost-dark": "text-charcoal hover:text-text-dark",
};
const ghostSize = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-base",
};

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  /** Agar diya, to click par us page par jayega (link ki tarah) */
  href?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const isDisabled = disabled || isLoading;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !href) return;
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      window.open(
        href,
        href.startsWith("http") ? "_blank" : "_self",
        "noopener,noreferrer"
      );
    } else {
      router.push(href);
    }
  };

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </span>
  );

  if (variant === "ghost" || variant === "ghost-dark") {
    return (
      <button
        type={href ? "button" : props.type}
        className={cn(
          "group inline-flex select-none items-center justify-center gap-2 rounded-full bg-transparent font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          ghostTone[variant],
          ghostSize[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <LiquidButton
      variant="default"
      size={liquidSize[size]}
      className={cn(
        "rounded-full text-[15px] font-semibold",
        liquidTone[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {content}
    </LiquidButton>
  );
}
