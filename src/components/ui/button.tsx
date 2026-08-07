import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drip-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-drip-500 text-obsidian hover:bg-drip-400 hover:shadow-glow-drip",
        gold: "bg-gold-500 text-obsidian hover:bg-gold-400 hover:shadow-glow-gold",
        motion:
          "bg-motion-500 text-white hover:bg-motion-400 hover:shadow-glow-motion",
        outline:
          "border border-white/20 bg-transparent text-white hover:border-drip-500 hover:text-drip-500",
        "outline-gold":
          "border border-gold-500/40 bg-transparent text-gold-500 hover:bg-gold-500/10",
        ghost: "bg-transparent text-white hover:bg-white/10",
        link: "bg-transparent text-drip-500 underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
