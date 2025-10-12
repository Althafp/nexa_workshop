"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, Rocket } from "lucide-react"

export function WorkshopPreview() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Learning Path</h2>
        <p className="mt-2 text-muted-foreground">
          Build real DApps from scratch or explore working examples
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-t-4 border-t-neon">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-neon/10 w-fit p-2">
              <BookOpen className="h-5 w-5 text-neon" />
            </div>
            <CardTitle className="text-xl">Learn Fundamentals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Start with the basics of smart contract development on Nexa with clear, beginner-friendly tutorials
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-neon">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-neon/10 w-fit p-2">
              <Code className="h-5 w-5 text-neon" />
            </div>
            <CardTitle className="text-xl">Build Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Follow guided projects to create real dApps with working code examples and explanations
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-neon">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-neon/10 w-fit p-2">
              <Rocket className="h-5 w-5 text-neon" />
            </div>
            <CardTitle className="text-xl">Test Live</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use our testing playground to deploy and interact with your contracts on testnet
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-neon/10 to-transparent border-neon/30 hover:border-neon/50 transition-all">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-neon/10 w-fit p-3">
              <Code className="h-6 w-6 text-neon" />
            </div>
            <CardTitle className="text-2xl">Build Your Own DApp</CardTitle>
            <CardDescription className="mt-2">
              Follow complete tutorials to build real DApps from scratch with detailed explanations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-neon" />
                <span>Transaction DApp - Full wallet & send functionality</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-neon" />
                <span>Smart Contract DApp - Deploy and interact with contracts</span>
              </div>
            </div>
            <Button asChild size="lg" className="w-full bg-neon hover:bg-neon/90">
              <Link href="/workshop">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 hover:border-blue-500/50 transition-all">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-blue-500/10 w-fit p-3">
              <Rocket className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle className="text-2xl">Try Transaction DApp</CardTitle>
            <CardDescription className="mt-2">
              Experience a working transaction DApp with live blockchain integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Create HD wallets with seed phrases</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Send real transactions on testnet/mainnet</span>
              </div>
            </div>
            <Button asChild size="lg" variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10">
              <Link href="/playground">
                Open DApp
                <Code className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


