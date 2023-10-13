import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import NftBridge from '@/views/bridge/NftBridge'

const BridgePage = ({ videos }) => {
  return (
    <>
      <Seo
        ogURL='/my-collection/bridge/'
        title='NFT Bridge / Neptune Mutual'
        ogImage='/assets/images/meta/nft-detail.png'
        ogImageAlt='Neptune Mutual NFT Bridge'
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      />

      <BaseLayout videos={videos}>
        <NftBridge />
      </BaseLayout>
    </>

  )
}

export default BridgePage
