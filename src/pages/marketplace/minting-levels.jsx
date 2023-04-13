import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import Seo from '@/components/Seo/Seo'
import { BaseLayout } from '@/layouts/BaseLayout'
import { NftApi } from '@/service/nft-api'
import { resourcesVideoData } from '@/service/video-api'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { Summary } from '@/views/mint-nft/Summary'

export async function getStaticProps () {
  const [premiumNftsResponse, mintingLevelResponse, videoResponse] = await Promise.all([NftApi.premiumNfts(), NftApi.mintingLevels(), resourcesVideoData()])

  return {
    props: {
      premiumNfts: premiumNftsResponse.data,
      mintingLevels: mintingLevelResponse.data,
      videos: videoResponse
    },
    revalidate: 60 * 60 // one hour
  }
}

const MintingLevelsPage = ({ premiumNfts, mintingLevels, videos }) => {
  if (!mintingLevels) {
    return <></>
  }

  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '#',
      name: 'Minting Levels'
    }
  ]

  return (
    <>
      <Seo
        ogURL='/marketplace/minting-levels/'
        title='NFT Minting Levels / Neptune Mutual'
        ogImage='/assets/images/meta/minting-level.png'
        ogImageAlt='Neptune Mutual NFT Minting Level'
        description='Dive deeper to get the insights relating to multiple levels with our view-level page. Make informed decisions to maximize the value of your NFT investments.'
      />

      <BaseLayout videos={videos}>
        <div className='mint nft page only minting level'>
          <div className='breadcrumb and connect wallet'>
            <Breadcrumb items={crumbs} />
          </div>

          <div className='content inset'>

            <MintingLevels mintingLevels={mintingLevels} />
            <Summary />
          </div>
          <div className='explore minting collection'>
            <h3>Explore Our Collection</h3>
            <div className='nft characters'>
              {premiumNfts.slice(0, 6).map(nft => <NftCardWithBlurEffect key={nft.name} nft={nft} />)}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export default MintingLevelsPage
