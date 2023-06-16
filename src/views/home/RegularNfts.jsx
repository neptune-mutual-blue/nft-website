import Link from 'next/link'

import { Slider } from '@/components/Slider/Slider'
import { formatText } from '@/utils/helpers'
import { getMarketplaceFiltersHref } from '@/utils/nft'

const RegularNfts = ({ regularNfts }) => {
  return (
    <div className='regular nfts'>
      <h2>Regular NFTs</h2>
      <Slider gap={16}>
        {
        regularNfts.sort((obj1, obj2) => { return obj1.siblings - obj2.siblings }).map((character) => {
          return (
            <div
              key={character.name}
              className='character details with slider'
            >
              <Link href={getMarketplaceFiltersHref(character)}>
                <div>
                  <img src={character.thumbnail} aria-labelledby={formatText(character.name)} alt='' />
                </div>
                <div id={formatText(character.name)} className='character name'>{character.name}</div>
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
