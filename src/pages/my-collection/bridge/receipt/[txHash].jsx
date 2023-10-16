import { ethers } from 'ethers'

import Seo from '@/components/Seo/Seo'
import { bridgeConfig } from '@/config/bridge'
import { rpcUrls } from '@/lib/connect-wallet/utils/switch-network'
import { TransactionReceipt } from '@/views/bridge/TransactionReceipt'
import { createClient } from '@layerzerolabs/scan-client'

export async function getServerSideProps (context) {
  const client = createClient('testnet')

  const txHash = context.params.txHash

  const { messages } = await client.getMessagesBySrcTxHash(
    txHash
  )

  const tx = messages?.[0]
  const depChain = Object.values(bridgeConfig).find((x) => { return x.lzChainId === parseInt(tx.srcChainId) })

  const etherscanProvider = new ethers.providers.JsonRpcProvider(rpcUrls[depChain.chainId][0])

  const txReceipt = await etherscanProvider.getTransaction(txHash)

  return {
    props: {
      txDetails: {
        messages,
        fees: txReceipt.value.toString()
      }
    }
  }
}

const BridgeTransactionReceiptPage = ({ txDetails }) => {
  return (
    <>
      <Seo
        ogURL='/bridge/'
        title='NFT Bridge Transaction History'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual NFT Bridge Transaction History'
        description='Get to know the description, properties, and activities of varied digital collectibles. Mint Neptune Mutual NFTs with ease and share them with the world.'
      />

      <TransactionReceipt txDetails={txDetails} />
    </>
  )
}

export default BridgeTransactionReceiptPage
