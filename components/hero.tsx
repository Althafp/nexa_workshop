"use client"

import Link from "next/link"
import Image from "next/image"
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
          <Image 
            src="/nexa.jpg" 
            alt="Nexa Logo" 
            width={28} 
            height={28} 
            className="rounded-md"
          />
          <span className="text-sm font-semibold tracking-wide">Nexa Workshop</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-8 pt-10 md:pb-12 md:pt-16">
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
                <span>Start Learning</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="rounded-2xl border-2 border-neon/50 hover:bg-neon hover:text-background transition-all text-lg px-8 py-6"
            >
              <Link href="/playground" className="inline-flex items-center gap-2">
                <span>Open Demo DApp</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
