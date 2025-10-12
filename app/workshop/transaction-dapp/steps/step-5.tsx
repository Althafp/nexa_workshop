"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Layout } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step5Components() {
  return (
    <div className="space-y-8">
      <Alert>
        <Layout className="h-4 w-4" />
        <AlertTitle>What You'll Do</AlertTitle>
        <AlertDescription>
          Create UI components for wallet management and display.
        </AlertDescription>
      </Alert>

      {/* Main Page */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Update Main Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Replace your <code className="bg-muted px-1 rounded">app/page.tsx</code> with this:
          </p>
          
          <CodeBlock 
            filename="app/page.tsx"
            code={`"use client"

import { useState } from 'react'

export default function Home() {
  const [wallet, setWallet] = useState<any>(null)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Nexa Transaction DApp</h1>
          <p className="mt-2 text-muted-foreground">
            Create wallets, check balance, send transactions
          </p>
        </div>

        <div className="grid gap-6">
          {/* Components will go here */}
          <p className="text-center text-muted-foreground">
            Wallet components coming next...
          </p>
        </div>
      </div>
    </div>
  )
}`}
            language="typescript"
          />
        </CardContent>
      </Card>

      {/* Install shadcn/ui */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Install UI Components
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Install shadcn/ui for beautiful components:
          </p>
          
          <CodeBlock 
            code={`npx shadcn@latest init -y
npx shadcn@latest add button card input alert badge`}
            language="bash"
          />

          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertDescription className="text-sm">
              This adds pre-built, customizable components to your project.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Create Wallet Manager Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              3
            </div>
            Create Wallet Manager Component
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create <code className="bg-muted px-1 rounded">components/wallet-manager.tsx</code>:
          </p>
          
          <CodeBlock 
            filename="components/wallet-manager.tsx"
            code={`"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { generateWallet, importFromSeedPhrase, formatNexa } from '@/lib/nexa-wallet'

interface Props {
  wallet: any
  setWallet: (wallet: any) => void
}

export function WalletManager({ wallet, setWallet }: Props) {
  const [seedInput, setSeedInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet')
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleGenerate = async () => {
    try {
      setLoading(true)
      setError('')
      const newWallet = await generateWallet(network)
      setWallet(newWallet)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    try {
      setLoading(true)
      setError('')
      const imported = await importFromSeedPhrase(seedInput, network)
      setWallet(imported)
      setSeedInput('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!wallet ? (
          <>
            <div className="flex gap-2">
              <Button
                variant={network === 'testnet' ? 'default' : 'outline'}
                onClick={() => setNetwork('testnet')}
                className="flex-1"
              >
                🟢 Testnet
              </Button>
              <Button
                variant={network === 'mainnet' ? 'default' : 'outline'}
                onClick={() => setNetwork('mainnet')}
                className="flex-1"
              >
                🔴 Mainnet
              </Button>
            </div>

            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? 'Generating...' : '🎲 Generate Wallet'}
            </Button>

            <div className="space-y-2">
              <Input
                placeholder="Enter 12-word seed phrase"
                value={seedInput}
                onChange={(e) => setSeedInput(e.target.value)}
              />
              <Button
                onClick={handleImport}
                disabled={loading || !seedInput}
                variant="outline"
                className="w-full"
              >
                {loading ? 'Importing...' : '📥 Import Wallet'}
              </Button>
            </div>

            {error && (
              <Alert className="bg-red-500/10 border-red-500">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">Address:</div>
                <div className="flex gap-2">
                  <code className="text-xs bg-muted p-2 rounded block break-all flex-1">
                    {wallet.address}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.address)
                      setCopied('address')
                      setTimeout(() => setCopied(null), 2000)
                    }}
                  >
                    {copied === 'address' ? '✓' : '📋'}
                  </Button>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Seed Phrase:</div>
                <code className="text-xs bg-yellow-500/10 border border-yellow-500 p-2 rounded block">
                  {showSeedPhrase ? wallet.seedPhrase : '••••••••••••••••••••••••••••••••'}
                </code>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    className="flex-1"
                  >
                    {showSeedPhrase ? '🙈 Hide' : '👁️ Show'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(wallet.seedPhrase)
                      setCopied('seed')
                      setTimeout(() => setCopied(null), 2000)
                    }}
                    className="flex-1"
                  >
                    {copied === 'seed' ? '✓ Copied' : '📋 Copy'}
                  </Button>
                </div>
              </div>

              <Button onClick={() => setWallet(null)} variant="outline" className="w-full">
                Disconnect
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}`}
            language="typescript"
          />
        </CardContent>
      </Card>

      {/* Use Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              4
            </div>
            Add Component to Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Import and use the WalletManager in <code className="bg-muted px-1 rounded">app/page.tsx</code>:
          </p>
          
          <CodeBlock 
            filename="app/page.tsx (update)"
            code={`"use client"

import { useState } from 'react'
import { WalletManager } from '@/components/wallet-manager'

export default function Home() {
  const [wallet, setWallet] = useState<any>(null)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Nexa Transaction DApp</h1>
          <p className="mt-2 text-muted-foreground">
            Create wallets, check balance, send transactions
          </p>
        </div>

        <WalletManager wallet={wallet} setWallet={setWallet} />
      </div>
    </div>
  )
}`}
            language="typescript"
          />

          <Alert className="bg-green-500/10 border-green-500/20">
            <AlertDescription className="text-sm">
              ✅ Test it! You can now generate and import wallets!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

    </div>
  )
}

