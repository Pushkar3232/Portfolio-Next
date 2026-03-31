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
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track scroll only for desktop visual state.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Use intersection observer to keep active state in sync with section visibility.
  useEffect(() => {
    const sectionItems = items.filter((item) => item.url.startsWith("#"))
    const sectionMap = new Map<string, string>()

    for (const item of sectionItems) {
      sectionMap.set(item.url.substring(1), item.name)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const nextTab = sectionMap.get(visible[0].target.id)
          if (nextTab) {
            setActiveTab(nextTab)
          }
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -40% 0px",
      },
    )

    sectionItems.forEach((item) => {
      const sectionId = item.url.substring(1)
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [items])

  const mobileItems = items.slice(0, 8)

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-0.75rem)] max-w-[calc(100%-1.5rem)] sm:hidden",
          className,
        )}
      >
        <div className="grid grid-cols-4 gap-1.5 border border-border bg-background/95 backdrop-blur-lg rounded-2xl p-2 shadow-xl">
          {mobileItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "flex min-h-11 flex-col items-center justify-center rounded-xl px-1 py-1.5 text-[10px] font-medium leading-tight transition-colors",
                  "text-foreground/80 hover:text-primary",
                  isActive && "bg-muted text-primary",
                )}
                aria-label={item.name}
              >
                <Icon size={16} strokeWidth={2.3} />
                <span className="mt-0.5 truncate max-w-full">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden sm:block",
          className,
        )}
      >
      <div
        className={cn(
          "flex items-center justify-center gap-3 border border-border backdrop-blur-lg py-1.5 px-1 rounded-full shadow-lg transition-all duration-300",
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
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors shrink-0 flex items-center justify-center gap-2",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
              aria-label={item.name}
            >
              <Icon size={16} strokeWidth={2.3} />
              <span>{item.name}</span>
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
        <div className="w-px h-6 bg-border/50 mx-1" />
        <AnimatedThemeToggle className="rounded-full" />
      </div>
      </div>
    </>
  )
}
