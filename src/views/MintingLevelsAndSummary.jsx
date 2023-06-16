import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { Summary } from '@/views/mint-nft/Summary'

const MintingLevelsAndSummary = ({ premiumNfts, mintingLevels }) => {
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

    <div className='mint nft page'>
      <div className='breadcrumb and connect wallet'>
        <Breadcrumb items={crumbs} />
        <ConnectWallet />
      </div>

      <div className='content inset'>

        <MintingLevels mintingLevels={mintingLevels} />
        <Summary />
      </div>
      <div className='explore minting collection'>
        <h3>Explore Our Collection</h3>
        <div className='nft characters'>
          {premiumNfts.slice(0, 6).map(nft => { return <NftCardWithBlurEffect key={nft.name} nft={nft} /> })}
        </div>
      </div>
    </div>
  )
}

export { MintingLevelsAndSummary }
