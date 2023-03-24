import NftCardWithBlurEffect from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { Slider } from '@/components/Slider/Slider'

function PremiumNfts ({ premiumNfts }) {
  return (
    <div className='premium nfts'>
      <Slider gap={24}>
        {
        premiumNfts.map((character) => {
          return (
            <NftCardWithBlurEffect key={character.name} className='with slider' nft={character} />
          )
        })
      }
      </Slider>
    </div>
  )
}

export { PremiumNfts }
