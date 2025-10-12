"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Play } from "lucide-react"
import { steps } from "./steps-data"

export default function TransactionDAppTutorial() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <Link 
            href="/workshop" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workshop
          </Link>
          <Button asChild size="sm">
            <Link href="/playground" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Test Working DApp
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-neon">Complete Tutorial</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Build a Transaction DApp
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guide to build a production-ready wallet DApp from scratch. 
            Generate wallets, check balance, and send transactions on Nexa blockchain.
          </p>
        </div>

        {/* Quick Info */}
        <Card className="mb-12 border-2 border-neon/20 bg-gradient-to-br from-neon/5 to-transparent">
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-neon">{steps.length}</div>
                <div className="text-sm text-muted-foreground">Steps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon flex items-center justify-center gap-2">
                  <Clock className="h-8 w-8" />
                  60
                </div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon">💯</div>
                <div className="text-sm text-muted-foreground">Compatible</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What You'll Learn</CardTitle>
            <CardDescription>
              By the end of this tutorial, you'll understand blockchain fundamentals and have a working DApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Blockchain Fundamentals:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>HD wallet architecture (BIP39/BIP44)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Seed phrases and key derivation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Rostrum network communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Transaction building & signing</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Development Skills:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Next.js + TypeScript setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>React state management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Nexa SDK integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-neon mt-0.5 flex-shrink-0" />
                    <span>Cross-wallet compatibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps List */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Tutorial Steps</h2>
          {steps.map((step) => (
            <Card key={step.number} className="hover:border-neon/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-lg flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/workshop/transaction-dapp/${step.number}`}>
                      Start
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-neon/10 to-transparent border-2 border-neon">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Start?</h3>
              <p className="text-muted-foreground">
                Begin your journey to building production-ready Nexa DApps
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/workshop/transaction-dapp/1">
                    Start Tutorial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/playground">
                    <Play className="mr-2 h-5 w-5" />
                    Test Working DApp
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
