/**
 * Transaction history utilities using nexa-wallet-sdk
 */

/**
 * Get transaction history for an account
 */
export async function getTransactionHistory(account: any): Promise<any[]> {
  try {
    if (!account) {
      return []
    }

    // Get transactions from account (returns a Map)
    const transactions = await account.getTransactions()
    
    console.log('Transaction history (Map):', transactions)
    console.log('Transaction count:', transactions?.size || 0)
    
    // Convert Map to Array
    let txArray: any[] = []
    if (transactions instanceof Map) {
      txArray = Array.from(transactions.values())
    } else if (Array.isArray(transactions)) {
      txArray = transactions
    }
    
    console.log('Transaction array:', txArray)
    
    // Map to simpler format for UI
    const mappedTransactions = txArray.map((tx: any) => {
      // Determine if received or sent based on amount sign
      const amount = Number(tx.amount || tx.value || 0)
      const isReceived = amount > 0
      
      return {
        txid: tx.txid || tx.hash || tx.id || '',
        amount: Math.abs(amount), // Use absolute value for display
        type: isReceived ? 'received' : 'sent',
        timestamp: tx.timestamp || tx.time || Date.now(),
        confirmations: tx.confirmations || tx.conf || 0,
        address: tx.address || '',
        isConfirmed: (tx.confirmations || tx.conf || 0) > 0,
      }
    })
    
    console.log('Mapped transactions:', mappedTransactions)
    
    return mappedTransactions
  } catch (error) {
    console.error('Error fetching transaction history:', error)
    return []
  }
}

/**
 * Watch for new transactions on an account
 */
export async function subscribeToTransactions(
  wallet: any,
  account: any,
  callback: (notification: any) => void
) {
  try {
    // Get all addresses from account
    const addresses = account.getAddresses?.() || []
    const addressStrings = addresses.map((addr: any) => addr.address || addr)
    
    console.log('Subscribing to addresses:', addressStrings)
    
    // Subscribe to address notifications
    await wallet.subscribeToAddressNotifications(addressStrings, callback)
    
    return () => {
      // Unsubscribe function
      wallet.unsubscribeFromAddressNotifications(addressStrings, callback)
    }
  } catch (error) {
    console.error('Error subscribing to transactions:', error)
    return () => {}
  }
}

