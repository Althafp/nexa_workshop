"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step1Understanding() {
  return (
    <div className="space-y-8">
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>What You'll Learn</AlertTitle>
        <AlertDescription>
          Understanding these concepts will help you build better DApps and debug issues confidently.
        </AlertDescription>
      </Alert>

      {/* What is Nexa */}
      <Card>
        <CardHeader>
          <CardTitle>What is Nexa?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Nexa is a next-generation blockchain platform designed for high-throughput transactions and smart contracts. 
            It combines the security of Bitcoin's UTXO model with the flexibility of modern smart contract platforms.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-semibold text-sm">Key Features:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• UTXO model (like Bitcoin)</li>
                <li>• Native tokens (no contracts needed)</li>
                <li>• 100,000+ TPS capacity</li>
                <li>• Low transaction fees</li>
                <li>• NexScript smart contracts</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-semibold text-sm">Why Build on Nexa:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Scalable infrastructure</li>
                <li>• Developer-friendly tools</li>
                <li>• Active community</li>
                <li>• Production-ready</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HD Wallets */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding HD Wallets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>What is an HD Wallet?</AlertTitle>
            <AlertDescription>
              HD (Hierarchical Deterministic) wallets use a single seed phrase to generate unlimited addresses. 
              This is the industry standard used by all modern crypto wallets like Wally and Otoplo.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg bg-muted p-4 space-y-3">
            <h4 className="font-semibold text-sm">How It Works:</h4>
            <div className="space-y-2 text-sm font-mono bg-background p-3 rounded">
              <div>Seed Phrase (12 words)</div>
              <div className="ml-4 text-muted-foreground">↓ BIP39 standard</div>
              <div>Master Private Key</div>
              <div className="ml-4 text-muted-foreground">↓ BIP32 derivation</div>
              <div>Derivation Path: m/44'/29223'/0'/0/0</div>
              <div className="ml-4 text-muted-foreground">↓ Account #0 (Default)</div>
              <div className="text-neon">Your Wallet Address</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-sm">
              <Badge className="mb-2">BIP39</Badge>
              <div className="text-muted-foreground">Converts entropy to 12/24 words</div>
            </div>
            <div className="text-sm">
              <Badge className="mb-2">BIP32</Badge>
              <div className="text-muted-foreground">Hierarchical key derivation</div>
            </div>
            <div className="text-sm">
              <Badge className="mb-2">BIP44</Badge>
              <div className="text-muted-foreground">Multi-coin wallet structure</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rostrum Provider */}
      <Card>
        <CardHeader>
          <CardTitle>Rostrum Network Provider</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            <strong>Rostrum</strong> is Nexa's network communication protocol (similar to Electrum for Bitcoin). 
            It allows your DApp to interact with the blockchain without running a full node.
          </p>

          <div className="rounded-lg border p-4 space-y-2">
            <h4 className="font-semibold text-sm">What Rostrum Does:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>✓ Fetches balance for addresses</li>
              <li>✓ Gets UTXOs (unspent outputs)</li>
              <li>✓ Broadcasts transactions</li>
              <li>✓ Subscribes to address updates</li>
              <li>✓ Queries blockchain data</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Account Types */}
      <Card>
        <CardHeader>
          <CardTitle>Account Types in Nexa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-l-4 border-l-neon bg-neon/5 p-4">
            <h4 className="font-semibold text-sm mb-2">Account '0' (Default) ← We use this!</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Used by official wallets (Wally, Otoplo)</li>
              <li>• Has multiple addresses (receiveKeys[], changeKeys[])</li>
              <li>• Best for compatibility</li>
              <li>• Structure: <code className="bg-muted px-1 rounded">_accountKeys.receiveKeys[0].address</code></li>
            </ul>
          </div>

          <div className="rounded-lg border-l-4 border-l-gray-400 bg-muted/50 p-4">
            <h4 className="font-semibold text-sm mb-2">Account '1.0' (NEXA)</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• NEXA-specific account type</li>
              <li>• Single address</li>
              <li>• Advanced use cases</li>
            </ul>
          </div>

          <Alert className="bg-yellow-500/10 border-yellow-500/20">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-600">Important for Compatibility!</AlertTitle>
            <AlertDescription className="text-sm">
              Always use <strong>Account '0'</strong> to ensure your DApp generates the same addresses 
              as Wally and Otoplo wallets when using the same seed phrase!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

    </div>
  )
}

