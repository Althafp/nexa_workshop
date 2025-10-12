"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Layers, TrendingUp } from "lucide-react"

export function NexaBasics() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">What is Nexa?</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          A next-generation blockchain platform for high-throughput transactions and smart contracts
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 hover:border-neon/50 transition-colors">
          <CardHeader>
            <Zap className="h-10 w-10 text-neon mb-2" />
            <CardTitle className="text-lg">Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              100,000+ TPS capacity with instant confirmations for seamless user experience
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-neon/50 transition-colors">
          <CardHeader>
            <Shield className="h-10 w-10 text-neon mb-2" />
            <CardTitle className="text-lg">Secure & Proven</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built on UTXO model like Bitcoin, battle-tested and secure by design
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-neon/50 transition-colors">
          <CardHeader>
            <Layers className="h-10 w-10 text-neon mb-2" />
            <CardTitle className="text-lg">Smart Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Powerful NexScript for building DeFi, NFTs, and decentralized applications
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-neon/50 transition-colors">
          <CardHeader>
            <TrendingUp className="h-10 w-10 text-neon mb-2" />
            <CardTitle className="text-lg">Low Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Minimal transaction costs make it perfect for micropayments and frequent transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-neon/20 bg-gradient-to-br from-neon/5 to-transparent">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Why Build on Nexa?</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Badge className="bg-neon">Developer Friendly</Badge>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Official TypeScript SDK</li>
                  <li>✓ Comprehensive documentation</li>
                  <li>✓ Active community support</li>
                  <li>✓ Easy wallet integration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <Badge className="bg-neon">Production Ready</Badge>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Live mainnet with real users</li>
                  <li>✓ Testnet for development</li>
                  <li>✓ Compatible with modern tools</li>
                  <li>✓ Growing ecosystem</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

