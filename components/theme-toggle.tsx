"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    const stored = localStorage.getItem("theme") ?? (root.classList.contains("dark") ? "dark" : "light")
    const next = stored === "dark"
    setIsDark(next)
    root.classList.toggle("dark", next)
  }, [])

  if (!mounted) return null

  return (
    <Button
      size="sm"
      variant="secondary"
      className="rounded-xl border border-border hover:border-neon hover:text-neon transition-colors"
      aria-pressed={isDark}
      onClick={() => {
        const next = !isDark
        setIsDark(next)
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem("theme", next ? "dark" : "light")
      }}
    >
      {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      {isDark ? "Light" : "Dark"}
    </Button>
  )
}
