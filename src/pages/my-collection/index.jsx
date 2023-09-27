
import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import { MyCollection } from '@/views/MyCollection'

export async function getStaticProps () {
  try {
    const [premiumNftsResponse, videoResponse] = await Promise.all([NftApi.premiumNfts(), resourcesVideoData()])

    return {
      props: {
        premiumNfts: premiumNftsResponse.data,
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

const MyCollectionPage = ({ premiumNfts, videos }) => {
  return (
    <>
      <Seo
        ogURL='/my-collection'
        title='My NFT Collection'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual My NFT Collection'
        description='Get to know the description, properties, and activities of varied digital collectibles. Mint Neptune Mutual NFTs with ease and share them with the world.'
      />

      <BaseLayout videos={videos}>
        <MyCollection premiumNfts={premiumNfts} />
      </BaseLayout>
    </>
  )
}

export default MyCollectionPage
