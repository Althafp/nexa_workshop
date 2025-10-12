"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { WalletManager } from "@/components/playground/wallet-manager"
import { SimpleTransfer } from "@/components/playground/simple-transfer"
import { IntegrationInfo } from "@/components/playground/integration-info"

export default function PlaygroundPage() {
  const [wallet, setWallet] = useState<{
    address: string
    publicKey: string
    privateKey: string
    network?: string
    seedPhrase?: string
    balance?: bigint
    wallet?: any
    account?: any
  } | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/workshop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Workshop
          </Link>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full animate-pulse ${
              wallet?.network === 'mainnet' ? 'bg-red-500' : 'bg-neon'
            }`} />
            <span className={`text-sm font-medium ${
              wallet?.network === 'mainnet' ? 'text-red-500' : ''
            }`}>
              {wallet?.network === 'mainnet' ? 'Mainnet (REAL MONEY!)' : 'Testnet (Safe)'}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Testing Playground</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Create a wallet and test your smart contracts with live transactions
          </p>
        </div>

        <div className="mb-6">
          <IntegrationInfo />
        </div>

        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          {/* Wallet Section */}
          <div>
            <WalletManager wallet={wallet} setWallet={setWallet} />
          </div>

          {/* Main Content */}
          <div>
            {!wallet ? (
              <Card className="border-2 border-dashed">
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>
                    Create or import a wallet to start testing your smart contracts
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-12">
                  <p className="text-center text-muted-foreground">
                    👈 Create a wallet on the left to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="transfer" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transfer">Simple Transfer</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                <TabsContent value="transfer" className="mt-6">
                  <SimpleTransfer wallet={wallet} />
                </TabsContent>
                <TabsContent value="advanced" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Features</CardTitle>
                      <CardDescription>
                        Coming soon: Deploy custom contracts, interact with existing contracts, and more
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        This section will include advanced features like contract deployment, 
                        covenant testing, and token operations.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

