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
import * as bip39 from 'bip39'
import { Wallet } from '@nexajs/wallet'

// Rostrum connection (shared across all operations)
let rostrumProvider: any = null

/**
 * Ensures Rostrum is connected before operations
 */
async function ensureRostrumConnection(network: 'testnet' | 'mainnet' = 'testnet') {
  if (!rostrumProvider) {
    const { rostrumProvider: provider } = await import('@nexajs/wallet')
    rostrumProvider = provider
  }
  
  if (!rostrumProvider.isConnected) {
    await rostrumProvider.connect(network)
    console.log(\`✅ Rostrum connected to \${network}\`)
  }
  
  return rostrumProvider
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
 * Generates a new HD wallet with seed phrase
 */
export async function generateWallet(network: 'testnet' | 'mainnet' = 'testnet') {
  try {
    // 1. Generate 12-word seed phrase
    const mnemonic = bip39.generateMnemonic(128)
    
    // 2. Connect to Rostrum
    const provider = await ensureRostrumConnection(network)
    
    // 3. Create Wallet from mnemonic
    const wallet = new Wallet(mnemonic)
    await wallet.initialize()
    
    // 4. Get Account '0' (default account)
    const account = wallet.accountStore.getAccount('0')
    if (!account) throw new Error('Failed to initialize account')
    
    // 5. Refresh account to sync balance
    await account.refresh()
    
    // 6. Extract address and keys
    const receiveKey = account._accountKeys?.receiveKeys?.[0]
    if (!receiveKey) throw new Error('No receive key found')
    
    return {
      wallet,
      account,
      address: receiveKey.address,
      publicKey: receiveKey.publicKey?.toString('hex') || '',
      privateKey: receiveKey.privateKey?.toString('hex') || '',
      seedPhrase: mnemonic,
      network,
      balance: BigInt(0)
    }
  } catch (error: any) {
    throw new Error(\`Failed to generate wallet: \${error.message}\`)
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
 * Restores wallet from existing seed phrase
 */
export async function importFromSeedPhrase(
  seedPhrase: string,
  network: 'testnet' | 'mainnet' = 'testnet'
) {
  try {
    // 1. Validate seed phrase
    if (!bip39.validateMnemonic(seedPhrase.trim())) {
      throw new Error('Invalid seed phrase')
    }
    
    // 2. Connect to network
    const provider = await ensureRostrumConnection(network)
    
    // 3. Restore wallet
    const wallet = new Wallet(seedPhrase.trim())
    await wallet.initialize()
    
    // 4. Get Account '0'
    const account = wallet.accountStore.getAccount('0')
    if (!account) throw new Error('Failed to initialize account')
    
    // 5. Refresh to sync
    await account.refresh()
    
    // 6. Extract address and keys
    const receiveKey = account._accountKeys?.receiveKeys?.[0]
    if (!receiveKey) throw new Error('No receive key found')
    
    return {
      wallet,
      account,
      address: receiveKey.address,
      publicKey: receiveKey.publicKey?.toString('hex') || '',
      privateKey: receiveKey.privateKey?.toString('hex') || '',
      seedPhrase: seedPhrase.trim(),
      network,
      balance: BigInt(0)
    }
  } catch (error: any) {
    throw new Error(\`Failed to import wallet: \${error.message}\`)
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
 * Converts satoshis to NEXA (1 NEXA = 100 satoshis)
 */
export function formatNexa(satoshis: bigint | string): string {
  const sats = typeof satoshis === 'string' ? BigInt(satoshis) : satoshis
  return (Number(sats) / 100).toFixed(2)
}

/**
 * Converts NEXA to satoshis
 */
export function parseNexa(nexa: string): bigint {
  return BigInt(Math.round(parseFloat(nexa) * 100))
}

/**
 * Validates Nexa address format
 */
export function validateAddress(address: string): boolean {
  try {
    const { isValidNexaAddress } = require('@nexajs/wallet')
    return isValidNexaAddress(address)
  } catch {
    return address.startsWith('nexa:') && address.length > 40
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
 * Sends NEXA to another address
 */
export async function sendTransaction(
  wallet: any,
  account: any,
  toAddress: string,
  amount: bigint,
  network: 'testnet' | 'mainnet' = 'testnet'
) {
  try {
    // 1. Validate address
    if (!validateAddress(toAddress)) {
      throw new Error('Invalid recipient address')
    }
    
    // 2. Check minimum (dust prevention)
    const MIN_AMOUNT = BigInt(1000) // 10 NEXA
    if (amount < MIN_AMOUNT) {
      throw new Error('Minimum: 10 NEXA')
    }
    
    // 3. Connect to network
    await ensureRostrumConnection(network)
    
    // 4. Build transaction
    const transaction = await wallet
      .newTransaction(account)
      .onNetwork(network)
      .sendTo(toAddress, amount)
      .populate()  // Fetch UTXOs
      .sign()      // Sign with private key
      .build()     // Finalize
    
    // 5. Broadcast
    const txid = await wallet.sendTransaction(transaction)
    
    // 6. Refresh balance
    setTimeout(() => account.refresh(), 1000)
    
    return txid
  } catch (error: any) {
    if (error.message?.includes('dust')) {
      throw new Error('Amount too small. Minimum: 10 NEXA')
    }
    throw new Error(\`Transaction failed: \${error.message}\`)
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

