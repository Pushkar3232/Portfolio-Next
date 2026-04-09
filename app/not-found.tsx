"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundCells } from "@/components/ui/background-ripple-effect";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundCells className="absolute inset-0 z-0 opacity-40 md:opacity-100" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/50 to-background opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="bg-primary/10 p-6 rounded-full mb-6 backdrop-blur-sm border border-primary/20">
                <Search className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Lost in Code?
              </h2>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-md mt-12 space-y-6"
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            The page you are looking for has vanished into digital dust. 
            Perhaps it was never here at all.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg font-semibold group">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg backdrop-blur-sm">
              <Link href="/#contact" className="flex items-center gap-2">
                Report Issue
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="h-px w-8 bg-border" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Error Code: UNKNOWN_PATH
          </p>
          <div className="h-px w-8 bg-border" />
        </motion.div>
      </div>

      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
