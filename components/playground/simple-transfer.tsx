"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send, CheckCircle2, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { validateAddress, sendTransaction, parseNexa } from "@/lib/nexa-wallet"
import { TransactionHistory } from "./transaction-history"

interface SimpleTransferProps {
  wallet: {
    address: string
    publicKey: string
    privateKey: string
    network?: string
    balance?: bigint
    wallet?: any // Wallet SDK instance
    account?: any // Account instance
  }
}

export function SimpleTransfer({ wallet }: SimpleTransferProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [validatingAddress, setValidatingAddress] = useState(false)
  const [addressValid, setAddressValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [txResult, setTxResult] = useState<{
    txid: string
    status: "success" | "error"
    message: string
  } | null>(null)

  const handleAddressChange = async (value: string) => {
    setRecipient(value)
    setError(null)
    
    if (value.length > 10) {
      setValidatingAddress(true)
      const isValid = await validateAddress(value)
      setAddressValid(isValid)
      setValidatingAddress(false)
      
      if (!isValid && value.length > 20) {
        setError("Invalid Nexa address format")
      }
    } else {
      setAddressValid(null)
    }
  }

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setError("Please fill in all fields")
      return
    }

    // Validate amount (minimum to avoid dust error)
    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Invalid amount")
      return
    }
    
    // Check minimum amount (dust threshold)
    const MIN_AMOUNT = 10 // 10 NEXA = 1000 satoshis minimum
    if (amountNum < MIN_AMOUNT) {
      setError(`Minimum amount is ${MIN_AMOUNT} NEXA to avoid dust rejection`)
      return
    }

    // Validate address
    const isValid = await validateAddress(recipient)
    if (!isValid) {
      setError("Invalid recipient address")
      return
    }

    setLoading(true)
    setTxResult(null)
    setError(null)

    try {
      if (!wallet.wallet || !wallet.account) {
        throw new Error('Wallet or account not available')
      }

      // Parse amount (wallet SDK expects string in satoshis)
      const amountStr = parseNexa(amount)
      
      // Send transaction using nexa-wallet-sdk
      const result = await sendTransaction({
        wallet: wallet.wallet,
        account: wallet.account,
        toAddress: recipient,
        amount: amountStr,
        network: (wallet.network || 'testnet') as 'mainnet' | 'testnet',
      })

      setTxResult({
        txid: result.txid,
        status: "success",
        message: `Successfully sent ${amount} NEXA to ${recipient.slice(0, 20)}...`,
      })
      
      // Clear form
      setRecipient("")
      setAmount("")
      setAddressValid(null)
    } catch (err) {
      console.error('Transaction error:', err)
      setTxResult({
        txid: "",
        status: "error",
        message: err instanceof Error ? err.message : "Transaction failed",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simple Transfer</CardTitle>
          <CardDescription>
            Send NEXA from your wallet to another address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-address">From</Label>
            <Input
              id="from-address"
              value={wallet.address}
              readOnly
              className="font-mono text-xs bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-address">To Address</Label>
            <div className="relative">
              <Input
                id="to-address"
                placeholder="nexa:nqtsq5g5..."
                value={recipient}
                onChange={(e) => handleAddressChange(e.target.value)}
                className={`font-mono text-xs pr-10 ${
                  addressValid === false ? 'border-red-500' : ''
                } ${addressValid === true ? 'border-green-500' : ''}`}
              />
              {validatingAddress && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
              )}
              {addressValid === true && !validatingAddress && (
                <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
              )}
              {addressValid === false && !validatingAddress && (
                <AlertTriangle className="absolute right-3 top-3 h-4 w-4 text-red-500" />
              )}
            </div>
            {addressValid === false && (
              <p className="text-xs text-red-500">Invalid Nexa address</p>
            )}
            {addressValid === true && (
              <p className="text-xs text-green-600">Valid Nexa address</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (NEXA)</Label>
            <Input
              id="amount"
              type="number"
              step="1"
              min="10"
              placeholder="100"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                setError(null)
              }}
            />
            <p className="text-xs text-muted-foreground">
              Minimum: 10 NEXA (to avoid dust rejection)
            </p>
            <p className="text-xs text-muted-foreground">
              1 NEXA = 100 satoshis
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleTransfer}
            disabled={loading || !recipient || !amount || addressValid === false}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Building Transaction...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Transaction
              </>
            )}
          </Button>

          <Alert>
            <AlertDescription className="text-xs">
              <strong>Production:</strong> Using official nexa-wallet-sdk with Rostrum provider for real testnet transactions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {txResult && (
        <Card className={txResult.status === "success" ? "border-green-500" : "border-red-500"}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {txResult.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
              <CardTitle>Transaction Result</CardTitle>
              <Badge variant={txResult.status === "success" ? "default" : "destructive"}>
                {txResult.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{txResult.message}</p>
            
            {txResult.status === "success" && txResult.txid && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Transaction ID</Label>
                  <div className="rounded-lg bg-muted p-3">
                    <code className="text-xs font-mono break-all">{txResult.txid}</code>
                  </div>
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    <strong>Note:</strong> Transaction created using libnexa-ts. Full testnet broadcasting requires Electrum/API integration.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <TransactionHistory wallet={wallet} latestTx={txResult} />
    </div>
  )
}

