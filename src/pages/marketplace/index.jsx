import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { resourcesVideoData } from '@/service/video-api'
import { getSSRData } from '@/utils/ssr'
import { Marketplace } from '@/views/Marketplace'

export async function getServerSideProps (context) {
  const { data, marketplaceFilters, pageData } = await getSSRData(context)
  const videoData = await resourcesVideoData()

  return {
    props: {
      data,
      marketplaceFilters,
      pageData,
      videos: videoData.docs
    }
  }
}

export default function MarketplacePage (props) {
  return (
    <>
      <Seo title='NFT Marketplace / Neptune Mutual' ogImage='/assets/images/meta/marketplace.png' ogImageAlt='Neptune Mutual NFT Marketplace' />

      <BaseLayout videos={props.videos}>
        <Marketplace
          data={props.data}
          filters={props.marketplaceFilters}
          pageData={props.pageData}
        />
      </BaseLayout>
    </>
  )
}
