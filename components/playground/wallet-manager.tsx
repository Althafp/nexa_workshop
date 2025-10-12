"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Copy, Check, Eye, EyeOff, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateWallet, importFromSeedPhrase, getBalance, formatNexa } from "@/lib/nexa-wallet"

interface WalletManagerProps {
  wallet: {
    address: string
    publicKey: string
    privateKey: string
    network?: string
    seedPhrase?: string
    balance?: bigint
    wallet?: any // Wallet SDK instance
    account?: any // Account instance
  } | null
  setWallet: (wallet: { address: string; publicKey: string; privateKey: string; network?: string; seedPhrase?: string; balance?: bigint; wallet?: any; account?: any } | null) => void
}

export function WalletManager({ wallet, setWallet }: WalletManagerProps) {
  const [seedPhrase, setSeedPhrase] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState<'mainnet' | 'testnet'>('testnet')
  const [copied, setCopied] = useState<string | null>(null)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<bigint | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(false)

  // Set balance when wallet is loaded
  useEffect(() => {
    if (wallet?.balance !== undefined) {
      setBalance(wallet.balance)
    } else if (wallet?.address) {
      fetchBalance()
    }
  }, [wallet])

  const fetchBalance = async () => {
    if (!wallet?.address || !wallet?.account) return
    
    setBalanceLoading(true)
    try {
      // Refresh account from blockchain first
      if (wallet.account.refresh && typeof wallet.account.refresh === 'function') {
        await wallet.account.refresh()
        console.log('Account refreshed from blockchain')
      }
      
      // Get updated balance
      const bal = await getBalance(
        wallet.address, 
        wallet.network as 'mainnet' | 'testnet' || 'testnet',
        wallet.account
      )
      setBalance(bal)
      console.log('Balance updated to:', bal.toString(), 'satoshis')
    } catch (err) {
      console.error('Error fetching balance:', err)
      setBalance(BigInt(0))
    } finally {
      setBalanceLoading(false)
    }
  }

  const generateNewWallet = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const newWallet = await generateWallet(selectedNetwork)
      setWallet(newWallet as any)
      
      // Wait a moment then refresh balance from blockchain
      setTimeout(async () => {
        if (newWallet.account) {
          try {
            // Refresh account to get latest balance
            await newWallet.account.refresh?.()
            const updatedBalance = newWallet.account.balance
            if (updatedBalance) {
              const confirmed = Number(updatedBalance.confirmed || 0)
              const unconfirmed = Number(updatedBalance.unconfirmed || 0)
              setBalance(BigInt(confirmed + unconfirmed))
            }
          } catch (err) {
            console.error('Error refreshing balance:', err)
          }
        }
      }, 2000) // Wait 2 seconds for blockchain sync
    } catch (err) {
      console.error('Error generating wallet:', err)
      setError('Failed to generate wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const importFromMnemonic = async () => {
    if (!seedPhrase || seedPhrase.trim().split(/\s+/).length < 12) {
      setError("Please enter a valid seed phrase (12 or 24 words)")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const importedWallet = await importFromSeedPhrase(seedPhrase.trim(), selectedNetwork)
      setWallet(importedWallet as any)
      setSeedPhrase("")
      
      // Wait a moment then refresh balance from blockchain
      setTimeout(async () => {
        if (importedWallet.account) {
          try {
            // Refresh account to get latest balance
            await importedWallet.account.refresh?.()
            const updatedBalance = importedWallet.account.balance
            if (updatedBalance) {
              const confirmed = Number(updatedBalance.confirmed || 0)
              const unconfirmed = Number(updatedBalance.unconfirmed || 0)
              setBalance(BigInt(confirmed + unconfirmed))
              console.log('Balance refreshed:', confirmed + unconfirmed)
            }
          } catch (err) {
            console.error('Error refreshing balance:', err)
          }
        }
      }, 2000) // Wait 2 seconds for blockchain sync
    } catch (err) {
      console.error('Error importing from seed phrase:', err)
      setError('Failed to import wallet. Please check your seed phrase.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  if (wallet) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-neon" />
              <CardTitle>Your Wallet</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setWallet(null)}
            >
              Disconnect
            </Button>
          </div>
          <CardDescription>Testnet wallet for development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Address */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Address</Label>
            <div className="flex items-center gap-2">
              <Input
                value={wallet.address}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(wallet.address, "address")}
              >
                {copied === "address" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Seed Phrase */}
          {wallet.seedPhrase && (
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Seed Phrase (Keep Secret!)</Label>
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
                <p className="text-xs font-mono break-words">
                  {showSeedPhrase ? wallet.seedPhrase : '••••••••••••••••••••••••••••••••••••••••••••'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  className="flex-1"
                >
                  {showSeedPhrase ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Show
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(wallet.seedPhrase!, 'seed')}
                  className="flex-1"
                >
                  {copied === 'seed' ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <Alert>
            <AlertDescription className="text-xs">
              <strong>⚠️ Security:</strong> Never share your seed phrase! It can recover your entire wallet.
            </AlertDescription>
          </Alert>

          {/* Balance */}
          <div className={`rounded-lg p-4 ${
            wallet.network === 'mainnet' ? 'bg-red-500/10 border border-red-500/30' : 'bg-neon/10'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Balance</div>
              <Button
                size="sm"
                variant="ghost"
                onClick={fetchBalance}
                disabled={balanceLoading}
              >
                {balanceLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Refresh"
                )}
              </Button>
            </div>
            <div className="text-2xl font-bold">
              {balance !== null ? formatNexa(balance) : '...'} NEXA
            </div>
            <div className={`text-xs font-medium flex items-center gap-1 ${
              wallet.network === 'mainnet' ? 'text-red-500' : 'text-muted-foreground'
            }`}>
              <div className={`h-1.5 w-1.5 rounded-full ${
                wallet.network === 'mainnet' ? 'bg-red-500' : 'bg-neon'
              }`} />
              {wallet.network === 'testnet' ? 'Testnet (Safe)' : 'Mainnet (REAL MONEY!)'}
            </div>
          </div>
          
          {balance === BigInt(0) && (
            <Alert>
              <AlertDescription className="text-xs">
                💡 Balance showing 0? Click the <strong>"Refresh"</strong> button above to sync with blockchain.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-neon" />
          <CardTitle>Wallet</CardTitle>
        </div>
        <CardDescription>Create or import a wallet to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-neon/10 border-neon/20">
          <AlertDescription className="text-xs">
            <strong>Official Nexa Wallet SDK:</strong> Uses 12-word seed phrase with Rostrum provider for real blockchain access.
          </AlertDescription>
        </Alert>

        {/* Network Selector */}
        <div className="space-y-2">
          <Label htmlFor="network">Network</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              id="network-testnet"
              variant={selectedNetwork === 'testnet' ? 'default' : 'outline'}
              onClick={() => setSelectedNetwork('testnet')}
              className={selectedNetwork === 'testnet' ? 'bg-neon hover:bg-neon/90' : ''}
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${selectedNetwork === 'testnet' ? 'bg-background' : 'bg-neon'}`} />
                Testnet
              </div>
            </Button>
            <Button
              id="network-mainnet"
              variant={selectedNetwork === 'mainnet' ? 'default' : 'outline'}
              onClick={() => setSelectedNetwork('mainnet')}
              className={selectedNetwork === 'mainnet' ? 'bg-red-500 hover:bg-red-600' : 'border-red-500/50 text-red-500 hover:bg-red-500/10'}
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${selectedNetwork === 'mainnet' ? 'bg-background' : 'bg-red-500'}`} />
                Mainnet
              </div>
            </Button>
          </div>
          {selectedNetwork === 'mainnet' && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">
                <strong>⚠️ Warning:</strong> Mainnet uses REAL money! For learning, use Testnet.
              </AlertDescription>
            </Alert>
          )}
          {selectedNetwork === 'testnet' && (
            <p className="text-xs text-muted-foreground">
              ✅ Safe for learning - no real money involved
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Button onClick={generateNewWallet} className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Wallet...
                </>
              ) : (
                'Generate New Wallet'
              )}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Creates a new HD wallet with 12-word seed phrase
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or restore from seed</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seed-phrase">Seed Phrase (12 or 24 words)</Label>
            <textarea
              id="seed-phrase"
              placeholder="word1 word2 word3 ... (enter your 12 or 24 word seed phrase)"
              value={seedPhrase}
              onChange={(e) => {
                setSeedPhrase(e.target.value)
                setError(null)
              }}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-mono"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={importFromMnemonic} className="w-full" variant="outline" disabled={loading || !seedPhrase}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Restoring Wallet...
              </>
            ) : (
              'Restore from Seed Phrase'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

