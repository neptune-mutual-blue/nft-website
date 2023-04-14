import Link from 'next/link'

import CountUp from '@/components/CountUp/CountUp'
import { Slider } from '@/components/Slider/Slider'
import { getMarketplaceFiltersHref } from '@/utils/nft'

const RegularNfts = ({ regularNfts }) => {
  return (
    <div className='regular nfts'>
      <h2>Regular NFTs</h2>
      <Slider gap={16}>
        {
        regularNfts.map((character) => {
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
                <div className='supporting text'><CountUp number={character.siblings} localized /> siblings</div>
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
