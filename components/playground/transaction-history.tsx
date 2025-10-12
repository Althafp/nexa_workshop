"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowDownCircle, ArrowUpCircle, RefreshCw } from "lucide-react"
import { getTransactionHistory } from "@/lib/nexa-transactions"

interface TransactionHistoryProps {
  wallet: {
    account?: any
    network?: string
  }
  latestTx?: {
    txid: string
    status: string
  } | null
}

export function TransactionHistory({ wallet, latestTx }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (wallet.account) {
      loadTransactions()
    }
  }, [wallet.account, latestTx])

  const loadTransactions = async () => {
    if (!wallet.account) return
    
    setLoading(true)
    try {
      const txHistory = await getTransactionHistory(wallet.account)
      setTransactions(txHistory)
    } catch (error) {
      console.error('Error loading transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Recent transactions on {wallet.network === 'mainnet' ? 'mainnet' : 'testnet'}
            </CardDescription>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={loadTransactions}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No transactions yet</p>
            <p className="text-xs mt-1">Send or receive NEXA to see your transaction history</p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.slice(0, 10).map((tx, index) => {
              const explorerUrl = wallet.network === 'mainnet' 
                ? `https://explorer.nexa.org/tx/${tx.txid}`
                : `https://testnet.nexa.org/tx/${tx.txid}`
              
              return (
                <div key={tx.txid || index} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    {tx.type === 'received' ? (
                      <ArrowDownCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <ArrowUpCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        {tx.type === 'received' ? 'Received' : 'Sent'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(Number(tx.amount) / 100).toFixed(2)} NEXA
                      </div>
                      {tx.txid && (
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-neon hover:underline font-mono mt-1 block truncate"
                          title={tx.txid}
                        >
                          {tx.txid.slice(0, 16)}...
                        </a>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={tx.isConfirmed ? "default" : "outline"} 
                    className={`text-xs flex-shrink-0 ${
                      tx.isConfirmed ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''
                    }`}
                  >
                    {tx.confirmations > 0 ? `${tx.confirmations} conf` : 'Unconfirmed'}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

