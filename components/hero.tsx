"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border",
        "bg-[radial-gradient(1000px_600px_at_50%_-200px,oklch(0.2_0_0)_0%,transparent_60%)] dark:bg-[radial-gradient(1000px_600px_at_50%_-200px,oklch(0.15_0_0)_0%,transparent_60%)]",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-neon" aria-hidden />
          <span className="text-sm font-semibold tracking-wide">Nexa Workshop</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 md:pb-24 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Welcome to Nexa Blockchain Workshop
          </h1>
          <p className="mt-4 max-w-prose text-pretty text-muted-foreground md:text-lg">
            Learn blockchain fundamentals and build production-ready DApps on Nexa with step-by-step guidance.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-2xl ring-2 ring-neon hover:ring-4 transition-all text-lg px-8 py-6">
              <Link href="/workshop" className="inline-flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                <span>Build Your Own DApp</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-2xl border-2 border-neon/50 hover:bg-neon hover:text-background transition-all text-lg px-8 py-6"
            >
              <Link href="/playground" className="inline-flex items-center gap-2">
                <span>Open DemO DApp</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="pointer-events-none mt-10 h-24 w-full select-none overflow-hidden"
          aria-hidden
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
          <div className="mt-6 grid grid-cols-4 gap-4 opacity-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-8 rounded-md border border-border/50 bg-card" />
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
