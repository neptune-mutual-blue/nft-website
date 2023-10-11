import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { resourcesVideoData } from '@/service/video-api'
import { TransactionHistory } from '@/views/bridge/TransactionHistory'

export async function getStaticProps () {
  try {
    const [videoResponse] = await Promise.all([resourcesVideoData()])

    return {
      props: {
        videos: videoResponse
      },
      revalidate: 60 * 60 // 1 hour
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

const BridgeTransactionsPage = ({ videos }) => {
  return (
    <>
      <Seo
        ogURL='/bridge/transactions'
        title='NFT Bridge Transaction History'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual NFT Bridge Transaction History'
        description='Get to know the description, properties, and activities of varied digital collectibles. Mint Neptune Mutual NFTs with ease and share them with the world.'
      />

      <BaseLayout videos={videos}>
        <TransactionHistory />
      </BaseLayout>
    </>
  )
}

export default BridgeTransactionsPage
