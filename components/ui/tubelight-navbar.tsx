"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggle } from "./animated-theme-toggle"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position to update active section and navbar appearance
  useEffect(() => {
    const sectionItems = items.filter((item) => item.url.startsWith("#"))

    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      const windowHeight = window.innerHeight
      let newActive = activeTab

      // Find the section that is currently most visible in viewport
      for (const item of sectionItems) {
        const el = document.getElementById(item.url.substring(1))
        if (el) {
          const rect = el.getBoundingClientRect()
          // If section is in or near viewport (within -200px to 200px of viewport center), mark as active
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2 - 200) {
            newActive = item.name
          }
        }
      }

      setActiveTab(newActive)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items, activeTab])

  return (
    <div
      className={cn(
        "fixed bottom-3 sm:bottom-auto sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-0.75rem)] sm:w-auto",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center gap-1 sm:gap-3 border border-border backdrop-blur-lg py-2 sm:py-1.5 px-2 sm:px-1 rounded-full shadow-lg transition-all duration-300",
          scrolled
            ? "bg-background/80 shadow-xl border-border/80"
            : "bg-background/5 shadow-lg",
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2.5 sm:px-6 py-2.5 sm:py-2 rounded-full transition-colors shrink-0",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden flex items-center justify-center">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        <div className="w-px h-6 bg-border/50 mx-0.5 sm:mx-1" />
        <AnimatedThemeToggle className="rounded-full" />
      </div>
    </div>
  )
}
