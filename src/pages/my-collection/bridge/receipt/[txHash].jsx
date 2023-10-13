import Seo from '@/components/Seo/Seo'
import { TransactionReceipt } from '@/views/bridge/TransactionReceipt'
import { createClient } from '@layerzerolabs/scan-client'

export async function getServerSideProps (context) {
  const client = createClient('testnet')

  const { messages } = await client.getMessagesBySrcTxHash(
    context.params.txHash
  )

  console.log(messages)

  return {
    props: {
      txDetails: {
        messages
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
