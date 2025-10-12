"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Hammer, Rocket, Terminal } from "lucide-react"
import { useState } from "react"

const steps = [
  { key: "write", label: "Write Contract", icon: BookOpen },
  { key: "compile", label: "Compile", icon: Hammer },
  { key: "deploy", label: "Deploy", icon: Rocket },
  { key: "interact", label: "Interact", icon: Terminal },
]

export function TutorialSidebar() {
  const [current, setCurrent] = useState("write")

  return (
    <div className="flex flex-col gap-2">
      {steps.map((s) => {
        const Icon = s.icon
        const active = s.key === current
        return (
          <Button
            key={s.key}
            variant={active ? "default" : "ghost"}
            className={active ? "justify-start rounded-xl ring-1 ring-neon" : "justify-start rounded-xl"}
            onClick={() => setCurrent(s.key)}
          >
            <Icon className="mr-2 h-4 w-4" />
            {s.label}
          </Button>
        )
      })}
    </div>
  )
}
