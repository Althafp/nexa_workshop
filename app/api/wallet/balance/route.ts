import { NextRequest, NextResponse } from 'next/server'
import { ElectrumNetworkProvider } from '@nexscript/nexscript'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const address = searchParams.get('address')
    const network = searchParams.get('network') || 'testnet'

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      )
    }

    // Initialize Electrum provider (server-side)
    const provider = new ElectrumNetworkProvider(
      network === 'testnet' ? 'testnet4' : 'mainnet'
    )

    // Get UTXOs and calculate balance
    const utxos = await provider.getUtxos(address)
    const balance = utxos.reduce((total, utxo) => {
      return total + BigInt(utxo.satoshis || 0)
    }, BigInt(0))

    return NextResponse.json({
      address,
      balance: balance.toString(),
      utxoCount: utxos.length,
      network,
    })
  } catch (error) {
    console.error('Balance fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch balance',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}


