import Link from 'next/link'

import { Slider } from '@/components/Slider/Slider'
import { getMarketplaceFiltersHref } from '@/utils/nft'

const RegularNfts = ({ regularNfts }) => {
  return (
    <div className='regular nfts'>
      <h2>Regular NFTs</h2>
      <Slider gap={16}>
        {
        regularNfts.sort((obj1, obj2) => obj1.siblings - obj2.siblings).map((character) => {
          return (
            <div
              key={character.name}
              className='character details with slider'
            >
              <Link href={getMarketplaceFiltersHref(character)}>
                <div>
                  <img src={character.thumbnail} alt={character.name} />
                </div>
                <div className='character name'>{character.name}</div>
                <div className='supporting text'>{character.siblings} siblings</div>
              </Link>
            </div>
          )
        })
      }
      </Slider>
    </div>
  )
}

export { RegularNfts }
