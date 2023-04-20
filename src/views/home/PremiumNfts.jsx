import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { Slider } from '@/components/Slider/Slider'

function PremiumNfts ({ premiumNfts }) {
  return (
    <div className='premium nfts'>
      <Slider gap={16}>
        {
        premiumNfts.sort((obj1, obj2) => obj1.siblings - obj2.siblings).map((character) => {
          return (
            <NftCardWithBlurEffect
              key={character.name}
              className='with slider' nft={character}
            />
          )
        })
      }
      </Slider>
    </div>
  )
}

export { PremiumNfts }
