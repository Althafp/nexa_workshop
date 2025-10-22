"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Send } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step6Transactions() {
  return (
    <div className="space-y-8">
      <Alert>
        <Send className="h-4 w-4" />
        <AlertTitle>What You'll Do</AlertTitle>
        <AlertDescription>
          Add transaction sending functionality to your DApp.
        </AlertDescription>
      </Alert>

      {/* Create Transaction Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Create Transaction Component
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create <code className="bg-muted px-1 rounded">components/transaction-sender.tsx</code>:
          </p>
          
          <CodeBlock 
            filename="components/transaction-sender.tsx"
            code={`"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sendTransaction, parseNexa, validateAddress } from '@/lib/nexa-wallet'

interface Props {
  wallet: any
}

export function TransactionSender({ wallet }: Props) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [txid, setTxid] = useState('')

  const handleSend = async () => {
    try {
      setLoading(true)
      setError('')
      setTxid('')

      // Validate address
      const isValid = await validateAddress(recipient)
      if (!isValid) {
        throw new Error('Invalid recipient address')
      }

      // Parse amount to satoshis (returns string)
      const amountStr = parseNexa(amount)
      const amountNum = parseFloat(amountStr)
      
      if (amountNum < 1000) {
        throw new Error('Minimum: 10 NEXA')
      }

      // Send transaction using new params object signature
      const result = await sendTransaction({
        wallet: wallet.wallet,
        account: wallet.account,
        toAddress: recipient,
        amount: amountStr,
        network: (wallet.network || 'testnet') as 'mainnet' | 'testnet',
      })

      setTxid(result.txid)
      setRecipient('')
      setAmount('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!wallet) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Connect a wallet to send transactions
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient Address</label>
          <Input
            placeholder="nexa:nqtsq5g5..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (NEXA)</label>
          <Input
            type="number"
            placeholder="10.00"
            min="10"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Minimum: 10 NEXA</p>
        </div>

        <Button
          onClick={handleSend}
          disabled={loading || !recipient || !amount}
          className="w-full"
        >
          {loading ? 'Sending...' : '💸 Send Transaction'}
        </Button>

        {error && (
          <Alert className="bg-red-500/10 border-red-500">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {txid && (
          <Alert className="bg-green-500/10 border-green-500">
            <AlertDescription>
              ✅ Transaction sent!
              <br />
              <a
                href={\`https://explorer.nexa.org/tx/\${txid}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline break-all"
              >
                View on Explorer
              </a>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}`}
            language="typescript"
          />
        </CardContent>
      </Card>

      {/* Add to Page */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Add to Main Page
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Update <code className="bg-muted px-1 rounded">app/page.tsx</code> to include transactions:
          </p>
          
          <CodeBlock 
            filename="app/page.tsx (final)"
            code={`"use client"

import { useState } from 'react'
import { WalletManager } from '@/components/wallet-manager'
import { TransactionSender } from '@/components/transaction-sender'

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
          <WalletManager wallet={wallet} setWallet={setWallet} />
          <TransactionSender wallet={wallet} />
        </div>
      </div>
    </div>
  )
}`}
            language="typescript"
          />

          <Alert className="bg-green-500/10 border-green-500/20">
            <AlertDescription className="text-sm">
              🎉 Your DApp is complete! Test it by sending a transaction!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

    </div>
  )
}

