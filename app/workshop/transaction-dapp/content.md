# Complete Transaction DApp Tutorial

## Table of Contents
1. [Understanding Nexa Fundamentals](#fundamentals)
2. [Project Setup](#setup)
3. [Installing Dependencies](#dependencies)
4. [Understanding the Stack](#stack)
5. [Building the Wallet Component](#wallet)
6. [Implementing Transactions](#transactions)
7. [Testing on Testnet](#testing)
8. [Deploying to Production](#deployment)

---

## Step 1: Understanding Nexa Fundamentals {#fundamentals}

### What is Nexa?

Nexa is a blockchain platform designed for high-throughput transactions and smart contracts. Key features:

- **UTXO Model**: Like Bitcoin, uses Unspent Transaction Outputs
- **Native Tokens**: Built-in token support (no smart contracts needed for tokens)
- **Smart Contracts**: NexScript language for advanced functionality
- **High Speed**: Designed for 100,000+ TPS
- **Low Fees**: Minimal transaction costs

### What is an HD Wallet?

**HD (Hierarchical Deterministic) Wallet:**
- One seed phrase → Multiple addresses
- Follows BIP32/BIP44 standards
- 12 or 24-word recovery phrases
- Deterministic: Same seed = same addresses always

**Structure:**
```
Seed Phrase (12 words)
    ↓
Master Private Key
    ↓
Derivation Path: m/44'/29223'/0'/0/0
    ↓
Account #0 (Default)
    ↓
Multiple Addresses (receiveKeys[])
```

### What is Rostrum?

**Rostrum** is Nexa's network communication protocol (similar to Electrum for Bitcoin):

- **Purpose**: Query blockchain without running full node
- **Features**: Get balance, UTXOs, broadcast transactions
- **Servers**: Public servers or run your own
- **Protocol**: WebSocket-based, efficient

---

## Step 2: Create Your Project {#setup}

### Terminal Commands:

```bash
# Create Next.js project
npx create-next-app@latest nexa-transaction-dapp

# Prompts (select these):
✅ TypeScript? Yes
✅ ESLint? Yes  
✅ Tailwind CSS? Yes
✅ App Router? Yes
✅ Turbopack? No

# Navigate
cd nexa-transaction-dapp

# Start server
npm run dev
# Opens on http://localhost:3000
```

### Project Structure:

```
nexa-transaction-dapp/
├── app/
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Styles
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

---

## Step 3: Install Nexa Dependencies {#dependencies}

### Install Official SDK:

```bash
npm install nexa-wallet-sdk bip39 --legacy-peer-deps
```

### Why Each Package?

| Package | Purpose | Used For |
|---------|---------|----------|
| `nexa-wallet-sdk` | Official Nexa SDK | Wallet, transactions, Rostrum |
| `bip39` | Seed phrases | Generate 12-word mnemonics |

### Package Details:

**nexa-wallet-sdk:**
- Source: https://gitlab.com/nexa/wallet-sdk-ts
- Features:
  - Wallet class for HD wallets
  - rostrumProvider for network
  - Transaction builder (fluent API)
  - Token operations
  - Account management

**bip39:**
- Standard: BIP39 (Bitcoin Improvement Proposal 39)
- Creates: 12 or 24-word seed phrases
- Compatible: Works with all BIP39 wallets

---

## Step 4: Understanding the Stack {#stack}

### Complete Architecture:

```
┌─────────────────────────────────┐
│   YOUR DAPP (Browser)            │
│                                  │
│   Components:                    │
│   ├── WalletManager              │
│   ├── TransactionForm            │
│   └── TransactionHistory         │
│                                  │
│   Libraries:                     │
│   ├── nexa-wallet-sdk            │
│   │   ├── Wallet                 │
│   │   ├── rostrumProvider        │
│   │   └── Transaction            │
│   └── bip39                      │
│       └── generateMnemonic()     │
└──────────────┬──────────────────┘
               │
               │ Rostrum Protocol
               │ (WebSocket)
               ↓
┌─────────────────────────────────┐
│   ROSTRUM SERVER                 │
│   (Network Provider)             │
│                                  │
│   Provides:                      │
│   ├── Balance queries            │
│   ├── UTXO fetching              │
│   ├── Transaction broadcasting   │
│   └── Block updates              │
└──────────────┬──────────────────┘
               │
               │ Full Node Protocol
               ↓
┌─────────────────────────────────┐
│   NEXA BLOCKCHAIN                │
│   (Distributed Network)          │
│                                  │
│   ├── Full Nodes                 │
│   ├── Miners                     │
│   └── Consensus Rules            │
└─────────────────────────────────┘
```

### Data Flow Example:

**Creating a Wallet:**
```
1. User clicks "Generate Wallet"
   ↓
2. bip39.generateMnemonic()
   → Returns: "word1 word2 ... word12"
   ↓
3. new Wallet(mnemonic, 'testnet')
   → Creates HD wallet locally
   ↓
4. wallet.initialize()
   → Connects to Rostrum
   → Derives accounts
   ↓
5. accountStore.getAccount('0')
   → Gets default account
   ↓
6. account._accountKeys.receiveKeys[0]
   → Gets first address
   ↓
7. Display to user
   ✅ Address, balance, transactions
```

**Sending a Transaction:**
```
1. User enters recipient & amount
   ↓
2. wallet.newTransaction(account)
   .sendTo(address, amount)
   ↓
3. .populate()
   → Rostrum fetches your UTXOs
   → Calculates fees
   ↓
4. .sign()
   → Signs with private key (in browser!)
   ↓
5. .build()
   → Creates final transaction hex
   ↓
6. wallet.sendTransaction(tx)
   → Rostrum broadcasts to network
   ↓
7. Returns transaction ID
   ✅ Transaction on blockchain!
```

---

## Step 5: Create Wallet Utilities {#wallet}

### Create `lib/nexa-wallet.ts`:

```typescript
/**
 * Nexa Wallet Utilities
 * Using official nexa-wallet-sdk
 */

let rostrumConnected = false

/**
 * Connect to Rostrum network
 * 
 * WHY: Rostrum is Nexa's network provider (like Electrum for Bitcoin)
 * WHAT: Connects to public Rostrum servers
 * WHEN: Call before any wallet operations
 */
async function ensureRostrumConnection(network: 'mainnet' | 'testnet' = 'testnet') {
  if (typeof window === 'undefined') return false

  try {
    const { rostrumProvider } = await import('nexa-wallet-sdk')
    
    if (!rostrumConnected) {
      // Connect to network (uses default public servers)
      await rostrumProvider.connect(network)
      rostrumConnected = true
      console.log(`✅ Rostrum connected to ${network}`)
    }
    
    return true
  } catch (error) {
    console.error('Failed to connect to Rostrum:', error)
    return false
  }
}

/**
 * Generate new HD wallet with seed phrase
 * 
 * WHY: HD wallets are industry standard for crypto
 * WHAT: Creates 12-word seed + derives addresses
 * HOW: Uses BIP39 (seed) + BIP44 (derivation)
 */
export async function generateWallet(network: 'mainnet' | 'testnet' = 'testnet') {
  try {
    // Step 1: Connect to network
    await ensureRostrumConnection(network)
    
    // Step 2: Generate 12-word seed phrase (BIP39)
    const bip39 = await import('bip39')
    const mnemonic = bip39.generateMnemonic()
    
    // Step 3: Create wallet from seed
    const { Wallet } = await import('nexa-wallet-sdk')
    const wallet = new Wallet(mnemonic, network)
    
    // Step 4: Initialize (discovers accounts on blockchain)
    await wallet.initialize()
    
    // Step 5: Get default account (Account '0')
    // Official wallets (Wally, Otoplo) use account '0'
    const account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      throw new Error('Failed to get account')
    }

    // Step 6: Extract first receiving address
    const accountKeys = (account as any)._accountKeys
    const firstReceiveKey = accountKeys.receiveKeys[0]
    const address = firstReceiveKey.address
    
    // Step 7: Get balance
    const balance = account.balance || { confirmed: '0', unconfirmed: '0' }
    
    return {
      seedPhrase: mnemonic,
      address: address,
      balance: BigInt(Number(balance.confirmed) + Number(balance.unconfirmed)),
      network,
      wallet: wallet,
      account: account,
    }
  } catch (error) {
    console.error('Error generating wallet:', error)
    throw error
  }
}

/**
 * Get balance for address
 * 
 * WHY: Need to check how much NEXA user has
 * WHAT: Queries Rostrum for UTXO sum
 * HOW: account.balance or rostrumProvider.getBalance()
 */
export async function getBalance(
  address: string,
  network: 'mainnet' | 'testnet' = 'testnet',
  account?: any
): Promise<bigint> {
  try {
    if (account && account.balance) {
      // Use account balance if available
      const confirmed = Number(account.balance.confirmed || 0)
      const unconfirmed = Number(account.balance.unconfirmed || 0)
      return BigInt(confirmed + unconfirmed)
    }
    
    // Otherwise query Rostrum directly
    await ensureRostrumConnection(network)
    const { rostrumProvider } = await import('nexa-wallet-sdk')
    const balance = await rostrumProvider.getBalance(address)
    
    return BigInt(Number(balance) || 0)
  } catch (error) {
    console.error('Error fetching balance:', error)
    return BigInt(0)
  }
}

// ... more functions
```

### Key Concepts Explained:

**Account '0' vs '1.0':**
- **Account '0'**: Default account, used by official wallets (Wally, Otoplo)
- **Account '1.0'**: NEXA-specific account type
- **Account '2.0'**: Vault account (secure storage)

**Why we use Account '0':**
- Compatible with official wallets ✅
- Same addresses as Wally/Otoplo ✅
- Has `receiveKeys[]` array for multiple addresses

---

[Tutorial continues with Steps 6-10 covering React components, transaction building, etc.]

For the complete working code, see: http://localhost:3000/playground

