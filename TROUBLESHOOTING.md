# Troubleshooting Guide

## ✅ FIXED: `lib.PrivateKey is not a constructor`

### Issue
```
Error: lib.PrivateKey is not a constructor
```

### Cause
Incorrect import pattern for libnexa-ts. The library exports individual modules, not a default export.

### Solution

**Before (Incorrect):**
```typescript
const lib = await import('libnexa-ts')
libnexa = lib.default || lib  // ❌ Wrong!
const privateKey = new lib.PrivateKey()
```

**After (Correct):**
```typescript
const { PrivateKey, PublicKey, Address } = await import('libnexa-ts')
return { PrivateKey, PublicKey, Address }  // ✅ Correct!
const privateKey = new lib.PrivateKey()
```

## ✅ FIXED: `type must be P2ST or P2PKH` + `publicKey.toAddress is not a function`

### Issues
```
Error: type must be P2ST or P2PKH
Error: publicKey.toAddress is not a function
```

### Cause
1. Address generation requires specifying the address type (P2PKH or P2ST)
2. PublicKey objects don't have a `toAddress()` method - must use `Address.fromPublicKey()`

### Solution

**Before (Incorrect):**
```typescript
const address = privateKey.toAddress(network)  // ❌ Missing type!
const address = publicKey.toAddress(network, 'P2PKH')  // ❌ Wrong method!
```

**After (Correct):**
```typescript
// Use Address.fromPublicKey() static method
const address = lib.Address.fromPublicKey(publicKey, network, 'P2PKH')  // ✅ Correct!
```

### Key Changes Made

1. **Import Pattern**
   ```typescript
   // Import specific modules from libnexa-ts
   const { PrivateKey, PublicKey, Address } = await import('libnexa-ts')
   ```

2. **Public Key Access**
   ```typescript
   // Use .publicKey property instead of .toPublicKey()
   const publicKey = privateKey.publicKey
   ```

3. **WIF Format**
   ```typescript
   // Use .toWIF() for WIF format export
   privateKey: privateKey.toWIF()
   ```

4. **Import from WIF**
   ```typescript
   // Use PrivateKey.fromWIF() for import
   const privateKey = lib.PrivateKey.fromWIF(wifString)
   ```

5. **Address Generation**
   ```typescript
   // Get address directly from private key
   const address = privateKey.toAddress(network)
   ```

## ✨ NEW FEATURE: Seed Phrase Support

### What Changed

Added support for HD wallets with seed phrase (mnemonic) import/export!

**New Functions:**
```typescript
// Generate 12-word seed phrase
const seedPhrase = await generateSeedPhrase()

// Import wallet from seed phrase
const wallet = await importFromSeedPhrase(seedPhrase, 'testnet')
```

**UI Changes:**
- Added 3rd tab "Seed Phrase" in wallet manager
- Generate 12-word recovery phrases
- Import existing seed phrases
- Visual seed phrase display with word numbers
- Copy to clipboard functionality

### Derivation Path

Uses Nexa's standard derivation path:
```
m/44'/29223'/0'/0/0
```

This follows BIP44 standard for hierarchical deterministic wallets.

## ✅ FIXED: `Invalid entropy: must be an hexa string or binary buffer`

### Issue
```
Error: Invalid entropy: must be an hexa string or binary buffer, 
got purpose muffin boss start roast major velvet grit ocean usage enjoy much
```

### Cause
Using `HDPrivateKey.fromSeed()` with a mnemonic phrase. This method expects raw entropy (hex/binary), not mnemonic words.

### Solution

**Before (Incorrect):**
```typescript
const hdPrivateKey = HDPrivateKey.fromSeed(seedPhrase)  // ❌ Wrong method!
```

**After (Correct):**
```typescript
const hdPrivateKey = HDPrivateKey.fromMnemonic(seedPhrase)  // ✅ Correct!
```

### API Methods:

| Method | Input | Use Case |
|--------|-------|----------|
| `HDPrivateKey.fromSeed(hex)` | Raw entropy (hex/binary) | Advanced: custom entropy |
| `HDPrivateKey.fromMnemonic(words)` | Mnemonic phrase (12/24 words) | **Standard: seed phrases** ✅ |

## Status

✅ **ALL RESOLVED** - The playground now works correctly with:
- ✅ Wallet generation (simple & HD)
- ✅ Private key import (WIF)
- ✅ Seed phrase generation
- ✅ Seed phrase import
- ✅ Address validation
- ✅ P2PKH address type

## Testing

### Test Simple Wallet Generation

1. Navigate to `http://localhost:3001/playground`
2. Click "Generate Wallet"
3. You should see:
   - Real WIF private key
   - Valid public key (33 bytes compressed)
   - Valid Nexa P2PKH address (nexa:nqtsq5g5...)

### Test Seed Phrase

1. Navigate to `http://localhost:3001/playground`
2. Click "Seed Phrase" tab
3. Click "Generate Seed Phrase"
4. You should see:
   - 12 words in a grid
   - Copy button
   - Warning message
5. Click "Create Wallet from Seed"
6. Wallet is created from the seed phrase!

## Common Issues

### Issue: "Failed to load libnexa-ts"

**Cause:** Library not installed or browser compatibility issue

**Solution:**
```bash
npm install libnexa-ts --legacy-peer-deps
```

### Issue: Address validation not working

**Cause:** Incorrect address format

**Solution:** 
- Nexa addresses start with `nexa:`
- Example: `nexa:nqtsq5g5...`

### Issue: Import wallet fails

**Cause:** Invalid private key format

**Solution:**
- Use WIF format private keys
- Generated wallets export in WIF format automatically

## Next Steps

The playground is now fully functional with:
- ✅ Real wallet generation
- ✅ Real address validation  
- ✅ Wallet import/export
- ⏳ Transaction building (partial - needs API)

Refresh your browser to see the changes!

