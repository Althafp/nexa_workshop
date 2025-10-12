# Libnexa-ts Integration Guide

This document explains how the workshop playground has been integrated with **libnexa-ts**, the official TypeScript/JavaScript SDK for Nexa blockchain.

## 🔗 Documentation

Official libnexa-ts documentation: https://nexa.gitlab.io/libnexa-ts/

## ✅ What's Implemented

### 1. **Real Wallet Generation**

The playground now uses **libnexa-ts** for cryptographically secure wallet generation:

```typescript
import { generateWallet } from '@/lib/nexa'

// Generates real Nexa testnet wallet
const wallet = await generateWallet('testnet')
// Returns: { privateKey, publicKey, address, network }
```

**Features:**
- ✅ Real private key generation using libnexa-ts `PrivateKey` class
- ✅ Proper public key derivation
- ✅ Correct Nexa address format (testnet/mainnet)
- ✅ WIF format private keys

**Components Updated:**
- `components/playground/wallet-manager.tsx` - Uses real key generation
- `lib/nexa.ts` - Wallet utilities

### 2. **Wallet Import**

Import existing wallets using WIF format private keys:

```typescript
import { importWallet } from '@/lib/nexa'

// Import from WIF private key
const wallet = await importWallet(wifPrivateKey, 'testnet')
```

**Features:**
- ✅ WIF format validation
- ✅ Automatic public key and address derivation
- ✅ Network specification (testnet/mainnet)
- ✅ Error handling for invalid keys

### 3. **Address Validation**

Real-time address validation using libnexa-ts:

```typescript
import { validateAddress } from '@/lib/nexa'

const isValid = await validateAddress('nexa:nqtsq5g5...')
```

**Features:**
- ✅ Real Nexa address format validation
- ✅ Visual feedback (green checkmark / red X)
- ✅ Async validation as user types
- ✅ Prevents invalid addresses in transactions

**Components Updated:**
- `components/playground/simple-transfer.tsx` - Real-time validation

### 4. **Transaction Building** (Partial)

Basic transaction structure using libnexa-ts:

```typescript
import { sendTransaction } from '@/lib/nexa'

const result = await sendTransaction({
  from: senderAddress,
  to: recipientAddress,
  amount: amountInSatoshis,
  privateKey: senderPrivateKey
})
```

**Current Status:**
- ✅ Transaction parameter validation
- ✅ Amount conversion (NEXA ↔ satoshis)
- ✅ Address validation
- ⏳ UTXO fetching (requires API integration)
- ⏳ Transaction signing (requires UTXO data)
- ⏳ Broadcasting (requires Electrum/API connection)

## 🏗️ Technical Implementation

### Webpack Configuration

Added Node.js polyfills for browser compatibility in `next.config.mjs`:

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.resolve.fallback = {
      crypto: false,
      stream: false,
      buffer: false,
      process: false,
    }
  }
  return config
}
```

### Library Utilities (`lib/nexa.ts`)

Core utilities for Nexa blockchain operations:

**Functions:**
1. `initLibNexa()` - Dynamic import for client-side only
2. `generateWallet()` - Create new wallet
3. `importWallet()` - Import from private key
4. `validateAddress()` - Validate Nexa addresses
5. `getBalance()` - Fetch address balance (placeholder)
6. `sendTransaction()` - Build and send transactions (partial)
7. `formatNexa()` - Convert satoshis to NEXA
8. `parseNexa()` - Convert NEXA to satoshis

### Client-Side Only Loading

libnexa-ts is loaded dynamically on client-side to avoid SSR issues:

```typescript
let libnexa: LibNexa | null = null

export async function initLibNexa() {
  if (typeof window === 'undefined') {
    return null
  }
  
  if (!libnexa) {
    const lib = await import('libnexa-ts')
    libnexa = lib.default || lib
  }
  
  return libnexa
}
```

## 🚧 What's Needed for Full Testnet Integration

To connect to real Nexa testnet, the following needs to be implemented:

### 1. **Electrum Server Connection**

Connect to Nexa Electrum servers for blockchain data:

```typescript
// Example (pseudo-code)
import { ElectrumClient } from 'electrum-client'

const electrum = new ElectrumClient(
  'testnet.nexa.org',
  50001,
  'ssl'
)

await electrum.connect()
```

### 2. **UTXO Fetching**

Fetch unspent transaction outputs for an address:

```typescript
async function getUtxos(address: string) {
  // Query Electrum server or API
  const utxos = await electrum.blockchain_address_listunspent(address)
  return utxos
}
```

### 3. **Transaction Building**

Build complete transactions with inputs/outputs:

```typescript
import { Transaction } from 'libnexa-ts'

const tx = new Transaction()
  .from(utxos)
  .to(recipientAddress, amount)
  .change(changeAddress)
  .sign(privateKey)
```

### 4. **Transaction Broadcasting**

Broadcast signed transactions to the network:

```typescript
async function broadcastTransaction(txHex: string) {
  const txid = await electrum.blockchain_transaction_broadcast(txHex)
  return txid
}
```

### 5. **Balance Fetching**

Get real balance from blockchain:

```typescript
async function getBalance(address: string) {
  const balance = await electrum.blockchain_address_get_balance(address)
  return balance.confirmed + balance.unconfirmed
}
```

## 📦 Required Packages

**Installed:**
```json
{
  "libnexa-ts": "latest",
  "vite-plugin-node-polyfills": "latest"
}
```

**For Full Integration (Future):**
```json
{
  "electrum-client": "^0.x.x",
  "@nexscript/nexscript": "latest"  // For smart contracts
}
```

## 🎓 Educational Value

### For Students

The current implementation teaches:

1. **Cryptography Basics**
   - Private/public key pairs
   - Address derivation
   - Digital signatures

2. **Blockchain Concepts**
   - UTXOs (concept explained in code)
   - Transaction structure
   - Address formats

3. **Library Integration**
   - Dynamic imports
   - Async operations
   - Error handling
   - Type safety with TypeScript

4. **Real-World Development**
   - Client-side only operations
   - Browser compatibility
   - Progressive enhancement

## 🔐 Security Notes

**Current Implementation:**
- ✅ Uses real cryptography (libnexa-ts)
- ✅ Proper key generation
- ✅ No keys sent to server
- ✅ Client-side only operations

**Production Requirements:**
- 🔒 Never expose private keys
- 🔒 Use hardware wallets for large amounts
- 🔒 Implement key encryption
- 🔒 Secure storage (not localStorage)
- 🔒 HTTPS only
- 🔒 Content Security Policy

## 📝 Example Usage

### Generate Wallet

```typescript
// In wallet-manager.tsx
const generateWallet = async () => {
  setLoading(true)
  try {
    const newWallet = await createWallet('testnet')
    // newWallet contains:
    // - privateKey: "KxYB4..." (WIF format)
    // - publicKey: "02abc..." (33 bytes compressed)
    // - address: "nexa:nqtsq5g5..." (Nexa format)
    // - network: "testnet"
    setWallet(newWallet)
  } catch (err) {
    console.error('Error:', err)
  } finally {
    setLoading(false)
  }
}
```

### Validate Address

```typescript
// In simple-transfer.tsx
const handleAddressChange = async (value: string) => {
  setRecipient(value)
  
  if (value.length > 10) {
    setValidatingAddress(true)
    const isValid = await validateAddress(value)
    setAddressValid(isValid)
    setValidatingAddress(false)
  }
}
```

### Convert Amounts

```typescript
// Convert NEXA to satoshis
const sats = parseNexa("1000") // Returns: 100000n (BigInt)

// Convert satoshis to NEXA
const nexa = formatNexa(100000n) // Returns: "1,000"
```

## 🌐 API Integration Points

For complete testnet functionality, integrate these APIs:

### Option 1: Electrum Protocol
```
testnet.nexa.org:50001 (SSL)
```

### Option 2: REST API (if available)
```
GET /api/address/{address}/balance
GET /api/address/{address}/utxos
POST /api/transaction/broadcast
```

### Option 3: NexScript SDK
```typescript
import { ElectrumNetworkProvider } from '@nexscript/nexscript'

const provider = new ElectrumNetworkProvider('testnet')
const balance = await provider.getBalance(address)
```

## 🎯 Next Steps for Full Integration

1. **Choose API Provider**
   - Set up Electrum client, OR
   - Use REST API, OR
   - Integrate @nexscript/nexscript

2. **Implement UTXO Management**
   - Fetch UTXOs
   - Select coins for transaction
   - Calculate fees

3. **Complete Transaction Flow**
   - Build transaction with UTXOs
   - Sign transaction
   - Broadcast to network
   - Monitor confirmations

4. **Add Faucet Integration**
   - Link to testnet faucet
   - Auto-request test coins
   - Display pending faucet requests

5. **Enhanced Features**
   - Transaction history
   - QR code generation
   - Multi-signature support
   - HD wallet support

## 📚 Resources

- [Libnexa-ts Docs](https://nexa.gitlab.io/libnexa-ts/)
- [Nexa Specification](https://www.nexa.org/spec/)
- [NexScript Docs](https://docs.nexscript.org/)
- [Nexa Explorer](https://explorer.nexa.org/)

---

**Status**: ✅ Phase 1 Complete (Wallet Management & Validation)
**Next**: ⏳ Phase 2 (Full Transaction Support with API)


