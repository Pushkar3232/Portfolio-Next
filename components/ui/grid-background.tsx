"use client"

import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  className?: string
}

export const GridBackground = ({ className }: GridBackgroundProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 bg-background",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, var(--tile-glow) 0%, transparent 60%)
        `,
        backgroundSize: "40px 40px, 40px 40px, 100% 100%",
      }}
    />
  )
}
