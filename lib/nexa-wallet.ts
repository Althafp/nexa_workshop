/**
 * Nexa Wallet Integration using official nexa-wallet-sdk
 * https://gitlab.com/nexa/wallet-sdk-ts
 * 
 * Official SDK provides:
 * - HD wallet from seed phrases
 * - Rostrum network provider
 * - Transaction building & signing
 * - Token operations
 * - Real balance fetching
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
      console.log(`✅ Rostrum connected to ${network}`)
    }
    
    return true
  } catch (error) {
    console.error('Failed to connect to Rostrum:', error)
    return false
  }
}

/**
 * Generate a new HD wallet with seed phrase
 */
export async function generateWallet(network: 'mainnet' | 'testnet' = 'testnet') {
  try {
    // Ensure Rostrum is connected
    await ensureRostrumConnection(network)
    
    // Generate 12-word seed phrase using standalone BIP39 library
    // (Avoids libnexa conflict with nexa-wallet-sdk)
    const bip39 = await import('bip39')
    const mnemonic = bip39.generateMnemonic()
    
    console.log('Generated mnemonic:', mnemonic)
    
    // Create wallet from seed phrase using nexa-wallet-sdk
    const { Wallet } = await import('nexa-wallet-sdk')
    
    // Create wallet instance
    const wallet = new Wallet(mnemonic, network)
    
    // Initialize wallet (discovers accounts)
    await wallet.initialize()
    
    // List all available accounts to debug
    const allAccounts = wallet.accountStore.listAccounts()
    console.log('All available accounts:', allAccounts)
    
    // Try account '0' first (might be what official wallets use)
    let account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      // Fallback to '1.0' if '0' doesn't exist
      account = wallet.accountStore.getAccount('1.0')
    }
    
    if (!account) {
      throw new Error('Failed to get account from wallet')
    }
    
    console.log('Using account:', account)

    // Access account data - account '0' uses _accountKeys (plural) with receiveKeys array
    let address = ''
    let publicKey = ''
    let privateKey = ''
    
    // Check if this is a default account (has _accountKeys with receiveKeys)
    const accountKeys = (account as any)._accountKeys
    const accountKey = (account as any)._accountKey
    
    console.log('Account keys (plural):', accountKeys)
    console.log('Account key (singular):', accountKey)
    
    if (accountKeys && accountKeys.receiveKeys && accountKeys.receiveKeys.length > 0) {
      // Default account type - use first receive key
      const firstReceiveKey = accountKeys.receiveKeys[0]
      console.log('First receive key:', firstReceiveKey)
      console.log('Receive key properties:', Object.keys(firstReceiveKey))
      console.log('Receive key address:', firstReceiveKey.address)
      console.log('Receive key key:', firstReceiveKey.key)
      
      // Try different property names
      address = firstReceiveKey.address || firstReceiveKey.addr || ''
      
      // If still no address, try using account.getNewAddress()
      if (!address && typeof account.getNewAddress === 'function') {
        address = account.getNewAddress()
        console.log('Got address via getNewAddress():', address)
      }
      
      if (firstReceiveKey.key) {
        publicKey = firstReceiveKey.key.publicKey?.toString?.() || ''
        
        if (firstReceiveKey.key.privateKey && typeof firstReceiveKey.key.privateKey.toWIF === 'function') {
          privateKey = firstReceiveKey.key.privateKey.toWIF()
        }
      }
    } else if (accountKey) {
      // NEXA/Vault account type - use single _accountKey
      address = accountKey.address || ''
      
      if (accountKey.key) {
        publicKey = accountKey.key.publicKey?.toString?.() || ''
        
        if (accountKey.key.privateKey && typeof accountKey.key.privateKey.toWIF === 'function') {
          privateKey = accountKey.key.privateKey.toWIF()
        }
      }
    }
    
    console.log('Extracted data:', { 
      address, 
      hasPublicKey: !!publicKey, 
      hasPrivateKey: !!privateKey,
      accountType: accountKeys ? 'Default (receiveKeys)' : 'NEXA/Vault'
    })
    
    // Get account balance - make sure to convert to Number first
    const accountBalance = account.balance || { confirmed: '0', unconfirmed: '0' }
    const confirmed = Number(accountBalance.confirmed || 0)
    const unconfirmed = Number(accountBalance.unconfirmed || 0)
    const totalBalance = BigInt(confirmed + unconfirmed)
    
    console.log('✅ Wallet created:', {
      address,
      publicKey: publicKey ? publicKey.slice(0, 20) + '...' : 'none',
      privateKey: privateKey ? 'exists' : 'none',
      balance: totalBalance.toString(),
      confirmed,
      unconfirmed
    })

    return {
      seedPhrase: mnemonic,
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: totalBalance,
      network,
      wallet: wallet, // Keep wallet instance for transactions
      account: account, // Keep account reference
    }
  } catch (error) {
    console.error('Error generating wallet:', error)
    throw error
  }
}

/**
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
    
    // List all available accounts to debug
    const allAccounts = wallet.accountStore.listAccounts()
    console.log('All available accounts:', allAccounts)
    
    // Try account '0' first (might be what official wallets use)
    let account = wallet.accountStore.getAccount('0')
    
    if (!account) {
      // Fallback to '1.0' if '0' doesn't exist
      account = wallet.accountStore.getAccount('1.0')
    }
    
    if (!account) {
      throw new Error('Failed to get account from wallet')
    }
    
    console.log('Using account for restore:', account)

    // Access account data - account '0' uses _accountKeys (plural) with receiveKeys array
    let address = ''
    let publicKey = ''
    let privateKey = ''
    
    // Check if this is a default account (has _accountKeys with receiveKeys)
    const accountKeys = (account as any)._accountKeys
    const accountKey = (account as any)._accountKey
    
    if (accountKeys && accountKeys.receiveKeys && accountKeys.receiveKeys.length > 0) {
      // Default account type - use first receive key (THIS IS WHAT OFFICIAL WALLETS USE!)
      const firstReceiveKey = accountKeys.receiveKeys[0]
      console.log('First receive key:', firstReceiveKey)
      
      address = firstReceiveKey.address || ''
      
      if (firstReceiveKey.key) {
        publicKey = firstReceiveKey.key.publicKey?.toString?.() || ''
        
        if (firstReceiveKey.key.privateKey && typeof firstReceiveKey.key.privateKey.toWIF === 'function') {
          privateKey = firstReceiveKey.key.privateKey.toWIF()
        }
      }
    } else if (accountKey) {
      // NEXA/Vault account type - use single _accountKey
      address = accountKey.address || ''
      
      if (accountKey.key) {
        publicKey = accountKey.key.publicKey?.toString?.() || ''
        
        if (accountKey.key.privateKey && typeof accountKey.key.privateKey.toWIF === 'function') {
          privateKey = accountKey.key.privateKey.toWIF()
        }
      }
    }
    
    console.log('Restored address:', address)
    
    // Get account balance - make sure to convert to Number first
    const accountBalance = account.balance || { confirmed: '0', unconfirmed: '0' }
    const confirmed = Number(accountBalance.confirmed || 0)
    const unconfirmed = Number(accountBalance.unconfirmed || 0)
    const totalBalance = BigInt(confirmed + unconfirmed)
    
    console.log('✅ Wallet restored:', {
      address,
      balance: totalBalance.toString(),
      confirmed,
      unconfirmed
    })

    return {
      seedPhrase: seedPhrase.trim(),
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: totalBalance,
      network,
      wallet: wallet, // Keep wallet instance for transactions
      account: account, // Keep account reference
    }
  } catch (error) {
    console.error('Error importing wallet:', error)
    throw error
  }
}

/**
 * Get real balance for an address using account balance
 */
export async function getBalance(
  address: string,
  network: 'mainnet' | 'testnet' = 'testnet',
  account?: any
): Promise<bigint> {
  try {
    // If account is provided, use its balance directly
    if (account && account.balance) {
      const confirmed = Number(account.balance.confirmed || 0)
      const unconfirmed = Number(account.balance.unconfirmed || 0)
      const totalBalance = confirmed + unconfirmed
      console.log(`Balance from account: ${totalBalance} satoshis (confirmed: ${confirmed}, unconfirmed: ${unconfirmed})`)
      return BigInt(totalBalance)
    }
    
    // Otherwise use Rostrum provider
    await ensureRostrumConnection(network)
    
    const { rostrumProvider } = await import('nexa-wallet-sdk')
    
    // Get balance from Rostrum (returns Balance object or number)
    const balanceResult = await rostrumProvider.getBalance(address)
    
    // Handle both Balance object and number return types
    let balanceValue = 0
    if (typeof balanceResult === 'object' && balanceResult !== null) {
      // Balance object with confirmed/unconfirmed
      balanceValue = Number(balanceResult.confirmed || 0) + Number(balanceResult.unconfirmed || 0)
    } else {
      // Direct number
      balanceValue = Number(balanceResult || 0)
    }
    
    console.log(`Real balance for ${address}: ${balanceValue} satoshis`)
    return BigInt(balanceValue)
  } catch (error) {
    console.error('Error fetching balance:', error)
    return BigInt(0)
  }
}

/**
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
      message: `Sent ${Number(amount) / 100} NEXA to ${toAddress}`,
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
}

/**
 * Validate Nexa address using SDK utility
 */
export async function validateAddress(address: string): Promise<boolean> {
  try {
    const { isValidNexaAddress } = await import('nexa-wallet-sdk')
    
    // Use SDK's validation utility (may need network parameter)
    const isValid = isValidNexaAddress(address, 'testnet') || isValidNexaAddress(address, 'mainnet')
    return isValid
  } catch (error) {
    console.error('Address validation error:', error)
    // Fallback: basic format check
    return address.startsWith('nexa:') || address.startsWith('nexatest:')
  }
}

/**
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

