"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Terminal, AlertCircle, Package, FolderTree, Code2, Zap } from "lucide-react"

export function TutorialContent() {
  return (
    <div className="space-y-12">
      {/* STEP 3: DEPENDENCIES */}
      <section id="dependencies">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            3
          </div>
          <div>
            <h2 className="text-2xl font-bold">Install Dependencies</h2>
            <p className="text-muted-foreground">Add Nexa SDK and required packages</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Core Dependencies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Install Nexa Wallet SDK</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`npm install @nexajs/wallet`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Official Nexa Wallet SDK with full HD wallet support, Rostrum integration, and transaction building.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Install BIP39 for Mnemonics</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`npm install bip39`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                For generating secure 12-word seed phrases (already a dependency of nexa-wallet-sdk).
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Install UI Components (Optional)</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`# Using shadcn/ui (recommended)
npx shadcn@latest init
npx shadcn@latest add button card input alert`}
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Beautiful, accessible UI components. Skip if you want to use your own styling.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configure Webpack for Browser Compatibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-yellow-500/10 border-yellow-500/20">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-600">Important!</AlertTitle>
              <AlertDescription className="text-sm">
                The Nexa SDK uses Node.js modules that don't exist in browsers. We need to configure webpack fallbacks.
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="text-sm font-semibold mb-2">Update <code className="bg-muted px-1 rounded">next.config.mjs</code></h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disable Node.js modules in browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      tls: false,
      net: false,
      fs: false,
      dns: false,
    }
    return config
  },
}

export default nextConfig`}
              </pre>
            </div>

            <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-semibold text-sm text-blue-600 mb-2">What This Does:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <strong>tls/net:</strong> Network modules (not needed in browser, Rostrum uses WebSockets)</li>
                <li>• <strong>fs:</strong> File system (not available in browser)</li>
                <li>• <strong>dns:</strong> DNS resolution (handled by browser)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* STEP 4: ARCHITECTURE */}
      <section id="understanding">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            4
          </div>
          <div>
            <h2 className="text-2xl font-bold">Understand the Architecture</h2>
            <p className="text-muted-foreground">How everything fits together</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Project Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`nexa-transaction-dapp/
├── app/
│   ├── page.tsx              # Main page with wallet UI
│   └── layout.tsx            # Root layout
├── lib/
│   ├── nexa-wallet.ts        # Wallet operations (generate, import, balance, send)
│   └── nexa-transactions.ts  # Transaction history fetching
├── components/
│   ├── wallet-manager.tsx    # Wallet creation/import UI
│   └── simple-transfer.tsx   # Transaction sending UI
├── next.config.mjs           # Webpack config
└── package.json`}
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm font-mono">
                <div className="font-bold">1. User clicks "Generate Wallet"</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">lib/nexa-wallet.ts: generateWallet()</div>
                <div className="ml-8 text-muted-foreground">• Generates 12-word seed phrase (BIP39)</div>
                <div className="ml-8 text-muted-foreground">• Creates Wallet instance</div>
                <div className="ml-8 text-muted-foreground">• Connects to Rostrum</div>
                <div className="ml-8 text-muted-foreground">• Gets Account '0'</div>
                <div className="ml-8 text-muted-foreground">• Extracts address from receiveKeys[0]</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">Returns: {"{ wallet, account, address, publicKey, privateKey, seedPhrase }"}</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">UI displays wallet details</div>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm font-mono">
                <div className="font-bold">2. User sends transaction</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">lib/nexa-wallet.ts: sendTransaction()</div>
                <div className="ml-8 text-muted-foreground">• Validates address format</div>
                <div className="ml-8 text-muted-foreground">• Checks minimum amount (10 NEXA)</div>
                <div className="ml-8 text-muted-foreground">• Builds transaction with SDK</div>
                <div className="ml-8 text-muted-foreground">• Signs with private key</div>
                <div className="ml-8 text-muted-foreground">• Broadcasts via Rostrum</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">Returns transaction ID</div>
                <div className="ml-4 text-muted-foreground">↓</div>
                <div className="ml-4">UI shows success + explorer link</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Badge variant="outline">Client-Side</Badge>
                  All operations happen in browser
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Wallets created locally</li>
                  <li>• Private keys never leave device</li>
                  <li>• Direct connection to Rostrum</li>
                  <li>• No backend server needed</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Badge variant="outline">Security</Badge>
                  Best practices built-in
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• BIP39 secure entropy</li>
                  <li>• HD wallet derivation</li>
                  <li>• Dust transaction prevention</li>
                  <li>• Address validation</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Badge variant="outline">State Management</Badge>
                  React hooks for wallet state
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• useState for wallet data</li>
                  <li>• useEffect for balance refresh</li>
                  <li>• Props for component communication</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Badge variant="outline">Network</Badge>
                  Testnet for development
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Testnet = safe testing</li>
                  <li>• Mainnet = real money</li>
                  <li>• Switch via network selector</li>
                  <li>• Same code for both!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* STEP 5: WALLET UTILS */}
      <section id="wallet-utils">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            5
          </div>
          <div>
            <h2 className="text-2xl font-bold">Create Wallet Utilities</h2>
            <p className="text-muted-foreground">Core wallet operations</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Create <code className="bg-muted px-2 py-0.5 rounded text-sm">lib/nexa-wallet.ts</code>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Create the file</AlertTitle>
              <AlertDescription>
                <pre className="text-xs mt-2 bg-muted p-2 rounded">mkdir lib && touch lib/nexa-wallet.ts</pre>
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="text-sm font-semibold mb-3">Full Code - Part 1: Imports & Setup</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`// lib/nexa-wallet.ts
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
              </pre>
              <div className="mt-3 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-sm">
                <strong className="text-blue-600">Why this pattern?</strong>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• <strong>Dynamic import:</strong> Avoids importing Rostrum during SSR</li>
                  <li>• <strong>Singleton pattern:</strong> Reuses connection across functions</li>
                  <li>• <strong>Network param:</strong> Supports testnet/mainnet switching</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Full Code - Part 2: Generate Wallet</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/**
 * Generates a new HD wallet with seed phrase
 */
export async function generateWallet(network: 'testnet' | 'mainnet' = 'testnet') {
  try {
    // 1. Generate 12-word seed phrase (128 bits entropy)
    const mnemonic = bip39.generateMnemonic(128)
    console.log('Generated seed phrase:', mnemonic)

    // 2. Ensure Rostrum connection
    const provider = await ensureRostrumConnection(network)

    // 3. Create Wallet instance from mnemonic
    const wallet = new Wallet(mnemonic)
    await wallet.initialize()

    // 4. Get Account '0' (the default account used by official wallets)
    const account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      throw new Error('Failed to initialize account 0')
    }

    // 5. Refresh account to sync with blockchain
    await account.refresh()

    // 6. Extract address and keys from receiveKeys[0]
    const receiveKey = account._accountKeys?.receiveKeys?.[0]
    if (!receiveKey) {
      throw new Error('No receive key found')
    }

    const address = receiveKey.address
    const publicKey = receiveKey.publicKey?.toString('hex') || ''
    const privateKey = receiveKey.privateKey?.toString('hex') || ''

    // 7. Get balance
    const balance = await getBalance(account, provider)

    console.log('✅ Wallet created:', { address, balance })

    return {
      wallet,           // SDK Wallet instance
      account,          // Account instance
      address,          // nexa:nqtsq5g5...
      publicKey,        // hex string
      privateKey,       // hex string (keep secret!)
      seedPhrase: mnemonic,
      network,
      balance
    }
  } catch (error: any) {
    console.error('❌ Error generating wallet:', error)
    throw new Error(\`Failed to generate wallet: \${error.message}\`)
  }
}`}
              </pre>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3 text-sm">
                  <strong className="text-purple-600">Step-by-Step Breakdown:</strong>
                  <ol className="mt-2 space-y-1 text-muted-foreground list-decimal list-inside">
                    <li><strong>bip39.generateMnemonic(128):</strong> Creates 12 random words from 2048-word dictionary</li>
                    <li><strong>ensureRostrumConnection:</strong> Connects to blockchain network</li>
                    <li><strong>new Wallet(mnemonic):</strong> Creates HD wallet from seed</li>
                    <li><strong>getAccount('0'):</strong> Gets default account (compatible with Wally/Otoplo)</li>
                    <li><strong>account.refresh():</strong> Syncs with blockchain to fetch balance</li>
                    <li><strong>receiveKeys[0]:</strong> First receiving address (main wallet address)</li>
                    <li><strong>getBalance:</strong> Fetches current balance in satoshis</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Full Code - Part 3: Import Wallet</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/**
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

    // 3. Restore wallet from mnemonic
    const wallet = new Wallet(seedPhrase.trim())
    await wallet.initialize()

    // 4. Get Account '0'
    const account = wallet.accountStore.getAccount('0')
    if (!account) {
      throw new Error('Failed to initialize account 0')
    }

    // 5. Refresh to sync
    await account.refresh()

    // 6. Extract address and keys
    const receiveKey = account._accountKeys?.receiveKeys?.[0]
    if (!receiveKey) {
      throw new Error('No receive key found')
    }

    const address = receiveKey.address
    const publicKey = receiveKey.publicKey?.toString('hex') || ''
    const privateKey = receiveKey.privateKey?.toString('hex') || ''

    // 7. Get balance
    const balance = await getBalance(account, provider)

    console.log('✅ Wallet restored:', { address, balance })

    return {
      wallet,
      account,
      address,
      publicKey,
      privateKey,
      seedPhrase: seedPhrase.trim(),
      network,
      balance
    }
  } catch (error: any) {
    console.error('❌ Error importing wallet:', error)
    throw new Error(\`Failed to import wallet: \${error.message}\`)
  }
}`}
              </pre>
            </div>

            <Alert className="bg-green-500/10 border-green-500/20">
              <Zap className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Compatibility Guaranteed! ✅</AlertTitle>
              <AlertDescription className="text-sm">
                Using <strong>Account '0'</strong> and <strong>receiveKeys[0]</strong> ensures your DApp generates 
                the <strong>exact same addresses</strong> as Wally and Otoplo wallets when using the same seed phrase!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Balance & Utility Functions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-3">Get Balance</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/**
 * Fetches balance for an account
 */
export async function getBalance(account: any, provider: any): Promise<bigint> {
  try {
    // Method 1: Try account.balance first (most reliable)
    if (account?.balance) {
      const confirmed = Number(account.balance.confirmed || 0)
      const unconfirmed = Number(account.balance.unconfirmed || 0)
      const totalSatoshis = confirmed + unconfirmed
      
      console.log('Balance from account:', totalSatoshis, 'satoshis',
        { confirmed, unconfirmed })
      
      return BigInt(totalSatoshis)
    }

    // Method 2: Fallback to Rostrum provider
    const address = account._accountKeys?.receiveKeys?.[0]?.address
    if (address && provider) {
      const balance = await provider.getBalance(address)
      const totalSatoshis = Number(balance.confirmed || 0) + 
                           Number(balance.unconfirmed || 0)
      return BigInt(totalSatoshis)
    }

    return BigInt(0)
  } catch (error) {
    console.error('Error fetching balance:', error)
    return BigInt(0)
  }
}`}
              </pre>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Format & Parse</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/**
 * Converts satoshis to NEXA (1 NEXA = 100 satoshis)
 */
export function formatNexa(satoshis: bigint | string): string {
  const sats = typeof satoshis === 'string' ? BigInt(satoshis) : satoshis
  const nexa = Number(sats) / 100
  return nexa.toFixed(2)
}

/**
 * Converts NEXA to satoshis
 */
export function parseNexa(nexa: string): bigint {
  const amount = parseFloat(nexa)
  return BigInt(Math.round(amount * 100))
}

/**
 * Validates Nexa address format
 */
export function validateAddress(address: string): boolean {
  try {
    const { isValidNexaAddress } = require('@nexajs/wallet')
    return isValidNexaAddress(address)
  } catch {
    // Fallback: basic format check
    return address.startsWith('nexa:') && address.length > 40
  }
}`}
              </pre>
              <div className="mt-3 rounded-lg bg-orange-500/10 border border-orange-500/20 p-3 text-sm">
                <strong className="text-orange-600">Important Unit Conversion:</strong>
                <div className="mt-2 text-muted-foreground">
                  • 1 NEXA = 100 satoshis (NOT 100,000,000 like Bitcoin!)<br/>
                  • Always work with satoshis internally (BigInt)<br/>
                  • Convert to NEXA only for display
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Send Transaction</h4>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`/**
 * Sends NEXA to another address
 */
export async function sendTransaction(
  wallet: any,          // Wallet instance
  account: any,         // Account instance  
  toAddress: string,
  amount: bigint,       // in satoshis
  network: 'testnet' | 'mainnet' = 'testnet'
) {
  try {
    // 1. Validate recipient address
    if (!validateAddress(toAddress)) {
      throw new Error('Invalid recipient address format')
    }

    // 2. Check minimum amount (dust prevention)
    const MIN_AMOUNT = BigInt(1000) // 10 NEXA minimum
    if (amount < MIN_AMOUNT) {
      throw new Error(\`Amount too small. Minimum: \${formatNexa(MIN_AMOUNT)} NEXA\`)
    }

    // 3. Ensure Rostrum connection
    await ensureRostrumConnection(network)

    // 4. Build transaction using SDK fluent API
    console.log('Building transaction...', { toAddress, amount: amount.toString() })
    
    const transaction = await wallet
      .newTransaction(account)
      .onNetwork(network)
      .sendTo(toAddress, amount)
      .populate()    // Fetch UTXOs
      .sign()        // Sign with private key
      .build()       // Finalize transaction

    // 5. Broadcast to network
    console.log('Broadcasting transaction...')
    const txid = await wallet.sendTransaction(transaction)

    console.log('✅ Transaction sent:', txid)

    // 6. Refresh account balance
    setTimeout(async () => {
      await account.refresh()
    }, 1000)

    return txid
  } catch (error: any) {
    console.error('❌ Transaction error:', error)
    
    // User-friendly error messages
    if (error.message?.includes('dust')) {
      throw new Error('Amount too small (dust). Minimum: 10 NEXA')
    }
    if (error.message?.includes('insufficient funds')) {
      throw new Error('Insufficient balance')
    }
    
    throw new Error(\`Transaction failed: \${error.message}\`)
  }
}`}
              </pre>
              <div className="mt-3 space-y-3">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Dust Transaction Prevention</AlertTitle>
                  <AlertDescription className="text-sm">
                    Nexa (like Bitcoin) rejects very small "dust" transactions to prevent network spam. 
                    We enforce a minimum of <strong>10 NEXA (1000 satoshis)</strong> to avoid rejection.
                  </AlertDescription>
                </Alert>

                <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 text-sm">
                  <strong className="text-green-600">SDK Fluent API Explained:</strong>
                  <div className="mt-2 font-mono text-xs space-y-1 text-muted-foreground">
                    <div>.newTransaction(account) <span className="text-green-600">← Start new tx with this account</span></div>
                    <div>.onNetwork(network) <span className="text-green-600">← Set testnet/mainnet</span></div>
                    <div>.sendTo(address, amount) <span className="text-green-600">← Recipient & amount</span></div>
                    <div>.populate() <span className="text-green-600">← Fetch UTXOs from blockchain</span></div>
                    <div>.sign() <span className="text-green-600">← Sign with private key</span></div>
                    <div>.build() <span className="text-green-600">← Create final transaction</span></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="bg-blue-500/10 border-blue-500/20">
          <Terminal className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-600">Complete <code>lib/nexa-wallet.ts</code> ✅</AlertTitle>
          <AlertDescription className="text-sm">
            You now have all the core wallet operations! Next, we'll create React components to use these functions.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* STEP 6: COMPONENTS */}
      <section id="components">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            6
          </div>
          <div>
            <h2 className="text-2xl font-bold">Build UI Components</h2>
            <p className="text-muted-foreground">Interactive wallet interface</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Main Page Component
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Create/Update <code className="bg-muted px-2 py-0.5 rounded">app/page.tsx</code></AlertTitle>
            </Alert>

            <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  // Wallet state (shared between components)
  const [wallet, setWallet] = useState<{
    address: string
    publicKey: string
    privateKey: string
    network?: string
    seedPhrase?: string
    balance?: bigint
    wallet?: any      // SDK Wallet instance
    account?: any     // SDK Account instance
  } | null>(null)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Nexa Transaction DApp
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create wallets, check balance, send transactions
          </p>
          {wallet && (
            <Badge className="mt-4">
              {wallet.network === 'mainnet' ? '🔴 Mainnet' : '🟢 Testnet'}
            </Badge>
          )}
        </div>

        {/* Components will go here */}
        <div className="grid gap-6">
          {/* Wallet Manager Component */}
          {/* Transaction Component */}
        </div>
      </div>
    </div>
  )
}`}
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Wallet Manager Component
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Create <code className="bg-muted px-2 py-0.5 rounded">components/wallet-manager.tsx</code></AlertTitle>
            </Alert>

            <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { generateWallet, importFromSeedPhrase, formatNexa } from '@/lib/nexa-wallet'

interface WalletManagerProps {
  wallet: any
  setWallet: (wallet: any) => void
}

export function WalletManager({ wallet, setWallet }: WalletManagerProps) {
  const [seedInput, setSeedInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [network, setNetwork] = useState<'testnet' | 'mainnet'>('testnet')

  // Generate new wallet
  const handleGenerate = async () => {
    try {
      setLoading(true)
      setError('')
      
      const newWallet = await generateWallet(network)
      
      // Refresh balance after a delay
      setTimeout(async () => {
        await newWallet.account.refresh()
        const balance = await newWallet.account.balance
        setWallet({ ...newWallet, balance: BigInt(balance?.confirmed || 0) })
      }, 2000)
      
      setWallet(newWallet)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Import existing wallet
  const handleImport = async () => {
    try {
      setLoading(true)
      setError('')
      
      const imported = await importFromSeedPhrase(seedInput, network)
      
      // Refresh balance
      setTimeout(async () => {
        await imported.account.refresh()
        const balance = await imported.account.balance
        setWallet({ ...imported, balance: BigInt(balance?.confirmed || 0) })
      }, 2000)
      
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
            {/* Network Selector */}
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

            {network === 'mainnet' && (
              <Alert className="bg-red-500/10 border-red-500">
                <AlertDescription>
                  ⚠️ MAINNET uses REAL MONEY! Use testnet for learning.
                </AlertDescription>
              </Alert>
            )}

            {/* Generate Wallet */}
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Generating...' : '🎲 Generate New Wallet'}
            </Button>

            {/* Import Wallet */}
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
            {/* Wallet Display */}
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium mb-1">Address:</div>
                <code className="text-xs bg-muted p-2 rounded block break-all">
                  {wallet.address}
                </code>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Balance:</div>
                <div className="text-2xl font-bold">
                  {formatNexa(wallet.balance || BigInt(0))} NEXA
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-1">Seed Phrase:</div>
                <code className="text-xs bg-yellow-500/10 border border-yellow-500 p-2 rounded block">
                  {wallet.seedPhrase}
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  ⚠️ Save this! Required to restore wallet
                </p>
              </div>

              <Button
                onClick={() => setWallet(null)}
                variant="outline"
                className="w-full"
              >
                Disconnect Wallet
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}`}
            </pre>
          </CardContent>
        </Card>

        <Alert className="bg-purple-500/10 border-purple-500/20">
          <Code2 className="h-4 w-4 text-purple-600" />
          <AlertTitle className="text-purple-600">Component Explanation</AlertTitle>
          <AlertDescription className="text-sm space-y-2">
            <div><strong>State Management:</strong> Uses props to share wallet state with parent</div>
            <div><strong>Network Selector:</strong> Visual buttons to choose testnet/mainnet</div>
            <div><strong>Generate Flow:</strong> Calls <code className="bg-muted px-1 rounded">generateWallet()</code> from utils</div>
            <div><strong>Import Flow:</strong> Validates and restores from seed phrase</div>
            <div><strong>Balance Refresh:</strong> Uses <code className="bg-muted px-1 rounded">setTimeout</code> to sync balance after wallet creation</div>
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* STEP 7: TRANSACTIONS */}
      <section id="transactions">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            7
          </div>
          <div>
            <h2 className="text-2xl font-bold">Add Transaction Component</h2>
            <p className="text-muted-foreground">Send NEXA to other addresses</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Transaction Component
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Create <code className="bg-muted px-2 py-0.5 rounded">components/transaction-sender.tsx</code></AlertTitle>
            </Alert>

            <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
{`"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sendTransaction, parseNexa, validateAddress } from '@/lib/nexa-wallet'

interface TransactionSenderProps {
  wallet: any
}

export function TransactionSender({ wallet }: TransactionSenderProps) {
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

      // Validate inputs
      if (!validateAddress(recipient)) {
        throw new Error('Invalid recipient address')
      }

      const amountSatoshis = parseNexa(amount)
      if (amountSatoshis < BigInt(1000)) {
        throw new Error('Minimum amount: 10 NEXA')
      }

      // Send transaction
      const txHash = await sendTransaction(
        wallet.wallet,
        wallet.account,
        recipient,
        amountSatoshis,
        wallet.network
      )

      setTxid(txHash)
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
            </pre>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* STEP 8: TESTING */}
      <section id="testing">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon text-background font-bold text-xl">
            8
          </div>
          <div>
            <h2 className="text-2xl font-bold">Test Your DApp</h2>
            <p className="text-muted-foreground">Verify everything works</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Testing Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-3">1. Generate Wallet</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside text-muted-foreground">
                  <li>Select Testnet network</li>
                  <li>Click "Generate New Wallet"</li>
                  <li>Verify seed phrase is displayed (12 words)</li>
                  <li>Copy and save the seed phrase</li>
                  <li>Verify address starts with "nexa:nqtsq5g5"</li>
                  <li>Wait 2-3 seconds for balance to sync</li>
                </ol>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-3">2. Test Import (Cross-Wallet Compatibility)</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside text-muted-foreground">
                  <li>Copy your seed phrase</li>
                  <li>Disconnect wallet</li>
                  <li>Click "Import Wallet"</li>
                  <li>Paste seed phrase</li>
                  <li>Verify same address is restored</li>
                  <li><strong>Bonus:</strong> Import same seed in Wally/Otoplo wallet - should match!</li>
                </ol>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-3">3. Get Testnet NEXA</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">You need testnet NEXA to test transactions:</p>
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded space-y-2">
                    <div><strong>Option A:</strong> Ask in Nexa Discord #testnet-faucet</div>
                    <div><strong>Option B:</strong> Use another wallet you control to send testnet NEXA</div>
                    <div><strong>Option C:</strong> Mine testnet blocks (advanced)</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-3">4. Send Transaction</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside text-muted-foreground">
                  <li>Ensure you have balance ≥ 10 NEXA</li>
                  <li>Enter recipient address (another wallet you control)</li>
                  <li>Enter amount (minimum 10 NEXA)</li>
                  <li>Click "Send Transaction"</li>
                  <li>Wait for confirmation</li>
                  <li>Click explorer link to verify on blockchain</li>
                </ol>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-3">5. Verify Compatibility</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✅</Badge>
                    <div>
                      <strong>Import your seed phrase into Wally wallet</strong>
                      <div className="text-xs">Should show same address and balance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✅</Badge>
                    <div>
                      <strong>Import your seed phrase into Otoplo wallet</strong>
                      <div className="text-xs">Should show same address and balance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✅</Badge>
                    <div>
                      <strong>Create wallet in Wally, import seed to your DApp</strong>
                      <div className="text-xs">Should restore same address</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="bg-green-500/10 border-green-500/20">
          <Zap className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600 text-lg">🎉 Congratulations!</AlertTitle>
          <AlertDescription>
            You've built a production-ready Nexa transaction DApp from scratch! You now understand:
            <ul className="mt-2 space-y-1 text-sm">
              <li>✅ HD wallet architecture (BIP39/BIP44)</li>
              <li>✅ Nexa SDK integration</li>
              <li>✅ Rostrum network communication</li>
              <li>✅ Transaction building and signing</li>
              <li>✅ Cross-wallet compatibility</li>
              <li>✅ Production best practices</li>
            </ul>
          </AlertDescription>
        </Alert>
      </section>
    </div>
  )
}

