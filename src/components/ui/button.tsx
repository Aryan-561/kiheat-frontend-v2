"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// --- 1. Animation Configuration ---
// This matches the smooth physics of your footer links
const slideTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
}

const slideVariants = {
  initial: { y: "-100%" }, // Starts hidden above
  hover: { y: 0 },         // Slides down to fill
}

// --- 2. Interface Update ---
// We extend motion props so we can pass animation props if needed
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  effect?: "slide" | "none" // Add this new prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, effect = "none", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // CASE A: If the "slide" effect is requested
    if (effect === "slide" && !asChild) {
      return (
        <motion.button
          className={cn(
            buttonVariants({ variant, size, className }),
            // Force relative/overflow-hidden for the mask to work
            "relative overflow-hidden transition-none hover:bg-transparent"
          )}
          initial="initial"
          whileHover="hover"
          // We cast to any here because Framer Motion types conflict slightly with React refs
          {...(props as any)}
          ref={ref}
        >
          {/* 1. Content (Z-10 ensures it stays on top of the slide) */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {props.children}
          </span>

          {/* 2. The Sliding Background */}
          <motion.div
            className={cn(
              "absolute inset-0 z-0",
              // Logic: If it's an outline/ghost button, slide is Primary color.
              // If it's a solid button, you might want a different color (like black or white).
              // Here we default to primary/10 or primary depending on the look you want.
              variant === "outline" || variant === "ghost" 
                ? "bg-primary text-primary-foreground" 
                : "bg-black/20 dark:bg-white/20" // Subtle overlay for solid buttons
            )}
            variants={slideVariants}
            transition={slideTransition}
          />
        </motion.button>
      )
    }

    // CASE B: Standard Button (No Animation Overhead)
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }