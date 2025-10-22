"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code2, Terminal, Zap } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Step4WalletUtils() {
  return (
    <div className="space-y-8">
      <Alert>
        <Code2 className="h-4 w-4" />
        <AlertTitle>What You'll Do</AlertTitle>
        <AlertDescription>
          Create utility functions for wallet operations: generate, import, balance, and transactions.
        </AlertDescription>
      </Alert>

      {/* Create lib folder and file */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              1
            </div>
            Create Wallet Utils File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Create a new folder and file for wallet operations:
          </p>
          
          <CodeBlock 
            code={`mkdir lib
touch lib/nexa-wallet.ts`}
            language="bash"
          />

          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertDescription className="text-sm">
              On Windows, use: <code className="bg-muted px-1 rounded">mkdir lib && type nul > lib\\nexa-wallet.ts</code>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Imports and Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              2
            </div>
            Add Imports & Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Open <code className="bg-muted px-1 rounded">lib/nexa-wallet.ts</code> and add:
          </p>
          
          <CodeBlock 
            filename="lib/nexa-wallet.ts"
            code={`// lib/nexa-wallet.ts
/**
 * Nexa Wallet Integration using official nexa-wallet-sdk
 * https://gitlab.com/nexa/wallet-sdk-ts
 */

let rostrumConnected = false

/**
 * Ensure Rostrum provider is connected
 */
async function ensureRostrumConnection(network: 'mainnet' | 'testnet' = 'testnet') {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const { rostrumProvider } = await import('nexa-wallet-sdk')
    
    if (!rostrumConnected) {
      // Connect to network as per SDK docs
      await rostrumProvider.connect(network)
      rostrumConnected = true
      console.log(\`✅ Rostrum connected to \${network}\`)
    }
    
    return true
  } catch (error) {
    console.error('Failed to connect to Rostrum:', error)
    return false
  }
}`}
            language="typescript"
          />

          <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4 text-sm">
            <strong className="text-purple-600">Why this pattern?</strong>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>• <strong>Dynamic import:</strong> Avoids importing during server-side rendering</li>
              <li>• <strong>Singleton:</strong> Reuses connection across all functions</li>
              <li>• <strong>Network param:</strong> Supports testnet/mainnet switching</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Generate Wallet Function */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              3
            </div>
            Generate Wallet Function
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add this function to create new HD wallets:
          </p>
          
          <CodeBlock 
            filename="lib/nexa-wallet.ts (add to file)"
            code={`/**
 * Generate a new HD wallet with seed phrase
 */
export async function generateWallet(network: 'mainnet' | 'testnet' = 'testnet') {
  try {
    // Ensure Rostrum is connected
    await ensureRostrumConnection(network)
    
    // Generate 12-word seed phrase using standalone BIP39 library
    const bip39 = await import('bip39')
    const mnemonic = bip39.generateMnemonic()
    
    // Create wallet from seed phrase using nexa-wallet-sdk
    const { Wallet } = await import('nexa-wallet-sdk')
    
    // Create wallet instance
    const wallet = new Wallet(mnemonic, network)
    
    // Initialize wallet (discovers accounts)
    await wallet.initialize()
    
    // Try account '0' first (official wallet compatibility)
    let account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      // Fallback to '1.0' if '0' doesn't exist
      account = wallet.accountStore.getAccount('1.0')
    }
    
    if (!account) {
      throw new Error('Failed to get account from wallet')
    }

    // Extract address and keys
    let address = ''
    let publicKey = ''
    let privateKey = ''
    
    // Check for default account type (has receiveKeys)
    const accountKeys = (account as any)._accountKeys
    const accountKey = (account as any)._accountKey
    
    if (accountKeys && accountKeys.receiveKeys && accountKeys.receiveKeys.length > 0) {
      const firstReceiveKey = accountKeys.receiveKeys[0]
      address = firstReceiveKey.address || ''
      
      if (firstReceiveKey.key) {
        publicKey = firstReceiveKey.key.publicKey?.toString?.() || ''
        if (firstReceiveKey.key.privateKey && typeof firstReceiveKey.key.privateKey.toWIF === 'function') {
          privateKey = firstReceiveKey.key.privateKey.toWIF()
        }
      }
    } else if (accountKey) {
      address = accountKey.address || ''
      
      if (accountKey.key) {
        publicKey = accountKey.key.publicKey?.toString?.() || ''
        if (accountKey.key.privateKey && typeof accountKey.key.privateKey.toWIF === 'function') {
          privateKey = accountKey.key.privateKey.toWIF()
        }
      }
    }
    
    // Get balance
    const accountBalance = account.balance || { confirmed: '0', unconfirmed: '0' }
    const confirmed = Number(accountBalance.confirmed || 0)
    const unconfirmed = Number(accountBalance.unconfirmed || 0)
    const totalBalance = BigInt(confirmed + unconfirmed)

    return {
      seedPhrase: mnemonic,
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: totalBalance,
      network,
      wallet: wallet,
      account: account,
    }
  } catch (error) {
    console.error('Error generating wallet:', error)
    throw error
  }
}`}
            language="typescript"
          />

          <Alert className="bg-green-500/10 border-green-500/20">
            <Zap className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Account '0' for Compatibility!</AlertTitle>
            <AlertDescription className="text-sm">
              Using Account '0' and receiveKeys[0] ensures your DApp generates the same addresses as Wally and Otoplo!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Import Wallet Function */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              4
            </div>
            Import Wallet Function
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add this function to restore wallets from seed phrases:
          </p>
          
          <CodeBlock 
            filename="lib/nexa-wallet.ts (add to file)"
            code={`/**
 * Import wallet from seed phrase
 */
export async function importFromSeedPhrase(
  seedPhrase: string,
  network: 'mainnet' | 'testnet' = 'testnet'
) {
  try {
    // Ensure Rostrum is connected
    await ensureRostrumConnection(network)
    
    const { Wallet } = await import('nexa-wallet-sdk')
    
    // Create wallet from seed phrase
    const wallet = new Wallet(seedPhrase.trim(), network)
    
    // Initialize wallet (discovers accounts)
    await wallet.initialize()
    
    // Try account '0' first
    let account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      account = wallet.accountStore.getAccount('1.0')
    }
    
    if (!account) {
      throw new Error('Failed to get account from wallet')
    }

    // Extract address and keys (same logic as generateWallet)
    let address = ''
    let publicKey = ''
    let privateKey = ''
    
    const accountKeys = (account as any)._accountKeys
    const accountKey = (account as any)._accountKey
    
    if (accountKeys && accountKeys.receiveKeys && accountKeys.receiveKeys.length > 0) {
      const firstReceiveKey = accountKeys.receiveKeys[0]
      address = firstReceiveKey.address || ''
      
      if (firstReceiveKey.key) {
        publicKey = firstReceiveKey.key.publicKey?.toString?.() || ''
        if (firstReceiveKey.key.privateKey && typeof firstReceiveKey.key.privateKey.toWIF === 'function') {
          privateKey = firstReceiveKey.key.privateKey.toWIF()
        }
      }
    } else if (accountKey) {
      address = accountKey.address || ''
      
      if (accountKey.key) {
        publicKey = accountKey.key.publicKey?.toString?.() || ''
        if (accountKey.key.privateKey && typeof accountKey.key.privateKey.toWIF === 'function') {
          privateKey = accountKey.key.privateKey.toWIF()
        }
      }
    }
    
    // Get balance
    const accountBalance = account.balance || { confirmed: '0', unconfirmed: '0' }
    const confirmed = Number(accountBalance.confirmed || 0)
    const unconfirmed = Number(accountBalance.unconfirmed || 0)
    const totalBalance = BigInt(confirmed + unconfirmed)

    return {
      seedPhrase: seedPhrase.trim(),
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: totalBalance,
      network,
      wallet: wallet,
      account: account,
    }
  } catch (error) {
    console.error('Error importing wallet:', error)
    throw error
  }
}`}
            language="typescript"
          />
        </CardContent>
      </Card>

      {/* Utility Functions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              5
            </div>
            Add Utility Functions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add these helper functions for balance and formatting:
          </p>
          
          <CodeBlock 
            filename="lib/nexa-wallet.ts (add to file)"
            code={`/**
 * Format amount in NEXA (from satoshis)
 */
export function formatNexa(satoshis: bigint): string {
  const nexa = Number(satoshis) / 100
  return nexa.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

/**
 * Parse amount to satoshis (from NEXA)
 */
export function parseNexa(nexa: string): string {
  const amount = parseFloat(nexa)
  if (isNaN(amount)) {
    throw new Error('Invalid amount')
  }
  const satoshis = Math.floor(amount * 100)
  return satoshis.toString()
}

/**
 * Validate Nexa address using SDK utility
 */
export async function validateAddress(address: string): Promise<boolean> {
  try {
    const { isValidNexaAddress } = await import('nexa-wallet-sdk')
    
    // Use SDK's validation utility
    const isValid = isValidNexaAddress(address, 'testnet') || 
                    isValidNexaAddress(address, 'mainnet')
    return isValid
  } catch (error) {
    console.error('Address validation error:', error)
    // Fallback: basic format check
    return address.startsWith('nexa:') || address.startsWith('nexatest:')
  }
}`}
            language="typescript"
          />

          <div className="rounded-lg bg-orange-500/10 border border-orange-500/20 p-4 text-sm">
            <strong className="text-orange-600">Important Unit Conversion:</strong>
            <div className="mt-2 text-muted-foreground">
              • 1 NEXA = 100 satoshis (NOT 100,000,000 like Bitcoin!)<br/>
              • Always work with satoshis internally (BigInt)<br/>
              • Convert to NEXA only for display
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send Transaction Function */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon text-background font-bold text-sm">
              6
            </div>
            Send Transaction Function
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add the transaction sending function:
          </p>
          
          <CodeBlock 
            filename="lib/nexa-wallet.ts (add to file)"
            code={`/**
 * Send transaction using official SDK
 */
export async function sendTransaction(params: {
  wallet: any // Wallet instance
  account: any // Account instance
  toAddress: string
  amount: string // Amount in satoshis (as string)
  network: 'mainnet' | 'testnet'
}) {
  try {
    const { wallet, account, toAddress, amount, network } = params
    
    console.log('Sending transaction:', { toAddress, amount, network })

    // Check if amount is above dust threshold
    const amountNum = Number(amount)
    if (amountNum < 1000) { // 1000 satoshis = 10 NEXA minimum
      throw new Error('Amount too small (dust). Minimum is 10 NEXA (1000 satoshis)')
    }

    // Build and sign transaction using wallet SDK's fluent API
    const tx = await wallet.newTransaction(account)
      .onNetwork(network)
      .sendTo(toAddress, amount) // Amount in satoshis
      .populate() // Fetches UTXOs and calculates fees
      .sign() // Signs with wallet
      .build() // Builds final transaction
    
    console.log('Transaction built:', tx)

    // Broadcast transaction to network
    const txid = await wallet.sendTransaction(tx)
    
    console.log('Transaction broadcasted:', txid)
    
    return {
      txid: txid,
      success: true,
      message: \`Sent \${Number(amount) / 100} NEXA to \${toAddress}\`,
    }
  } catch (error) {
    console.error('Transaction error:', error)
    
    // Provide helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('dust')) {
        throw new Error('Transaction rejected: Amount too small. Minimum is 10 NEXA.')
      }
      if (error.message.includes('Insufficient')) {
        throw new Error('Insufficient balance. Check your balance and try again.')
      }
    }
    
    throw error
  }
}`}
            language="typescript"
          />

          <Alert className="bg-blue-500/10 border-blue-500/20">
            <AlertDescription className="text-sm">
              <strong>Dust prevention:</strong> Nexa rejects very small transactions to prevent spam. 
              We enforce a minimum of 10 NEXA.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Complete */}
      <Card className="bg-green-500/10 border-2 border-green-500/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">✅ Wallet Utils Complete!</h3>
          <p className="text-sm text-muted-foreground">
            You now have all core wallet operations. Next, we'll create the UI components to use these functions!
          </p>
        </CardContent>
      </Card>

    </div>
  )
}

