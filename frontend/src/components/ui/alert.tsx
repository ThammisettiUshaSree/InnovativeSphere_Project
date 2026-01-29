import * as React from "react"
import { cn } from "@/lib/utils"

type AlertVariant = "default" | "destructive"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
}

export function Alert({
  variant = "default",
  className,
  children,
  ...props
}: AlertProps) {
  const base =
    "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7"

  const variants = {
    default: "bg-background text-foreground",
    destructive: "border-red-300 bg-red-50 text-red-800",
  }

  return (
    <div
      role="alert"
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function AlertTitle({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none", className)}>
      {children}
    </h5>
  )
}

export function AlertDescription({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className={cn("text-sm [&_p]:leading-relaxed", className)}>
      {children}
    </div>
  )
}
