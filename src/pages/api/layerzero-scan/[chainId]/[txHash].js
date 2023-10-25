import { getMessagesBySrcTxHash } from '@layerzerolabs/scan-client'

const LAYERZERO_CHAIN_MAPPING = {
  1: 101,
  56: 102,
  137: 109,
  42161: 110,
  80001: 10109,
  4002: 10112
}

export default async function handler (
  req,
  res
) {
  const { chainId, txHash } = req.query

  try {
    const { messages } = await getMessagesBySrcTxHash(
      LAYERZERO_CHAIN_MAPPING[chainId],
      txHash
    )

    const tx = messages?.[0]

    if (!tx) { throw new Error('Transaction Not Found') }

    res.status(200).json({ data: tx })
  } catch (error) {
    console.error(error)
    res.status(200).json({ message: 'Transaction Not Found' })
  }

  return null
}
