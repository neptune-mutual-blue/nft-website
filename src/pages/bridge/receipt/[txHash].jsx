import Seo from '@/components/Seo/Seo'
import { TransactionReceipt } from '@/views/bridge/TransactionReceipt'

const BridgeTransactionReceiptPage = () => {
  return (
    <>
      <Seo
        ogURL='/bridge/'
        title='NFT Bridge Transaction History'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual NFT Bridge Transaction History'
        description='Get to know the description, properties, and activities of varied digital collectibles. Mint Neptune Mutual NFTs with ease and share them with the world.'
      />

      <TransactionReceipt />
    </>
  )
}

export default BridgeTransactionReceiptPage
