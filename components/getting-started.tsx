"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Clipboard, Terminal } from "lucide-react"
import { useState } from "react"

type Step = {
  title: string
  command: string
  description?: string
}

const steps: Step[] = [
  {
    title: "Install NexScript CLI",
    command: "npm install -g @nexscript/nexc",
    description: "Install the global CLI to scaffold and manage projects.",
  },
  {
    title: "Set up SDK",
    command: "npm install @nexscript/nexscript",
    description: "Add the SDK to your project for building Nexa smart contracts.",
  },
  {
    title: "Test environment setup",
    command: "nexc dev",
    description: "Run a local environment to test contracts and interactions.",
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      size="sm"
      className="rounded-xl ring-1 ring-border hover:ring-neon transition"
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
    >
      {copied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

export function GettingStarted() {
  return (
    <div>
      <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Getting Started</h2>
      <p className="mt-2 text-muted-foreground">Run these steps in your terminal to set up.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <Card key={s.title} className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">{s.title}</CardTitle>
              <Terminal className="h-4 w-4 text-neon" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-3 font-mono text-sm">
                <span className="truncate">{s.command}</span>
                <CopyButton text={s.command} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Want a guided learning experience? Check out our{" "}
          <Link href="/workshop" className="font-semibold text-neon hover:underline">
            interactive workshop
          </Link>{" "}
          with step-by-step projects.
        </p>
      </div>
    </div>
  )
}
