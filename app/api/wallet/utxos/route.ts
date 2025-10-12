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

    // Get UTXOs from blockchain
    const utxos = await provider.getUtxos(address)

    return NextResponse.json({
      address,
      utxos: utxos.map(utxo => ({
        txid: utxo.txid,
        vout: utxo.vout,
        satoshis: utxo.satoshis.toString(),
      })),
      count: utxos.length,
      network,
    })
  } catch (error) {
    console.error('UTXO fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch UTXOs',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}


