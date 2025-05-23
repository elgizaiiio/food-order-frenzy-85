
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md",
        blue: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        indigo: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
        lightBlue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        pharmacy: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md",
        pillBlue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-full font-medium",
        outlineBlue: "border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-400",
        personalCare: "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md",
        personalCarePill: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-full font-medium",
        personalCareOutline: "border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-400",
        gym: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md", 
        gymOutline: "border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-400",
        gymAction: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        gymPill: "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-full font-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
        checkout: "h-14 px-6 rounded-xl text-lg font-bold",
        pill: "h-8 px-4 rounded-full text-sm",
        gym: "h-12 px-6 rounded-lg text-base font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
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
