import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import NftCardWithBlurEffect from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { NftApi } from '@/service/nft-api'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { Summary } from '@/views/mint-nft/Summary'

export async function getServerSideProps (context) {
  const [premiumNftsResponse, mintingLevelResponse] = await Promise.all([NftApi.premiumNfts(), NftApi.mintingLevels()])

  return {
    props: {
      premiumNfts: premiumNftsResponse.data,
      mintingLevels: mintingLevelResponse.data
    }
  }
}

const MintingLevelsPage = ({ premiumNfts, mintingLevels }) => {
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
  )
}

export default MintingLevelsPage
