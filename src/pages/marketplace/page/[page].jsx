import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { resourcesVideoData } from '@/service/video-api'
import { getSSRData } from '@/utils/ssr'
import { Marketplace } from '@/views/Marketplace'

export async function getServerSideProps (context) {
  try {
    const { data, marketplaceFilters, pageData } = await getSSRData(context)
    const videoData = await resourcesVideoData()

    if (data.length === 0) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        data,
        marketplaceFilters,
        pageData,
        videos: videoData
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function MarketplacePage (props) {
  return (
    <>
      <Seo
        ogURL={'/marketplace/page/' + props.data[0].pageNumber + '/'}
        title='NFT Marketplace / Neptune Mutual'
        ogImage='/assets/images/meta/marketplace.png'
        ogImageAlt='Neptune Mutual NFT Marketplace'
        description='Mint your set of NFTs on our NFT marketplace. Unlock new levels, and grab a wide selection of digital assets. Participate, and join our vibrant NFT community.'
      />

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
