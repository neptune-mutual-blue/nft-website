import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import { Slider } from '@/components/Slider/Slider'
import Link from 'next/link'
import { getMarketplaceFiltersHref } from '@/utils/nft'

function PremiumNfts ({ premiumNfts }) {
  return (
    <div className='premium nfts'>
      <Slider gap={16}>
        {
        premiumNfts.map((character) => {
          return (
            <Link
              key={character.name}
              href={getMarketplaceFiltersHref(character)}
            >
              <NftCardWithBlurEffect className='with slider' nft={character} />
            </Link>
          )
        })
      }
      </Slider>
    </div>
  )
}

export { PremiumNfts }
