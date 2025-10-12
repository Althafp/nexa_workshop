"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Code, Wallet, ArrowLeftRight } from "lucide-react"

export default function WorkshopPage() {
  const projects = [
    {
      id: 1,
      title: "Transaction DApp (Full Tutorial)",
      description: "Build a complete wallet DApp from scratch - create wallets, check balance, send transactions. Learn every detail!",
      difficulty: "Beginner",
      duration: "60 min",
      icon: Wallet,
      topics: ["Wallet SDK", "Rostrum", "Transactions", "React/TypeScript"],
      href: "/workshop/transaction-dapp"
    },
    {
      id: 2,
      title: "Smart Contract DApp",
      description: "Create a DApp that deploys and interacts with NexScript smart contracts on the blockchain",
      difficulty: "Intermediate",
      duration: "45 min",
      icon: ArrowLeftRight,
      topics: ["NexScript", "Contract Deployment", "Contract Calls"],
      href: "/workshop/contract-dapp"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-neon" aria-hidden />
            <span className="text-sm font-semibold tracking-wide">Nexa Workshop</span>
          </Link>
          <Button asChild variant="outline">
            <Link href="/playground">
              <Code className="mr-2 h-4 w-4" />
              Existing Dapp
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Build Your Own Nexa DApp
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Complete step-by-step tutorials to build real DApps from scratch. Learn Nexa fundamentals, 
            wallet integration, smart contracts, and blockchain development.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <Card key={project.id} className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-neon/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-neon/10 p-3">
                      <Icon className="h-6 w-6 text-neon" />
                    </div>
                    <Badge variant="secondary">{project.difficulty}</Badge>
                  </div>
                  <CardTitle className="mt-4">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full group-hover:bg-neon group-hover:text-background transition-colors">
                    <Link href={project.href}>
                      Start Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Testing CTA */}
        <Card className="mt-8 border-2 border-dashed border-neon/30">
          <CardHeader>
            <CardTitle>Ready to Test Your DApp?</CardTitle>
            <CardDescription>
              Use our testing playground to create a wallet and interact with your smart contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" variant="outline" className="border-neon text-neon hover:bg-neon hover:text-background">
              <Link href="/playground">
                <Code className="mr-2 h-4 w-4" />
                Open Existing Dapp
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}


