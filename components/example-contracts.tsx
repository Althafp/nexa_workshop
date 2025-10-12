"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"
import { motion } from "framer-motion"

const items = [
  { title: "Hello Nexa", desc: "Minimal example contract printing a greeting." },
  { title: "Escrow", desc: "Funds held until conditions are met." },
  { title: "Timelock", desc: "Execute transactions after a set time." },
  { title: "Streaming Payments", desc: "Continuous money streams over time." },
]

export function ExampleContracts() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Example Contracts</h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="rounded-2xl border-border/80 bg-card/70">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>{item.title}</CardTitle>
                <Code2 className="h-4 w-4 text-neon" />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                <Button
                  variant="secondary"
                  className="rounded-xl border border-border hover:border-neon hover:text-neon transition-colors"
                >
                  View Code
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
