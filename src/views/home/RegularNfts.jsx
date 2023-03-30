import { Slider } from '@/components/Slider/Slider'
import { getMarketplaceFiltersHref } from '@/utils/nft'
import Link from 'next/link'

const RegularNfts = ({ regularNfts }) => {
  return (
    <div className='regular nfts'>
      <h2>Regular NFTs</h2>
      <Slider gap={16}>
        {
        regularNfts.map((character) => {
          return (
            <Link key={character.name} href={getMarketplaceFiltersHref(character)}>
              <div className='character details with slider'>
                <div>
                  <img src={character.thumbnail} alt={character.name} />
                </div>
                <div className='character name'>{character.name}</div>
                <div className='supporting text'>{character.siblings} siblings</div>
              </div>
            </Link>
          )
        })
      }
      </Slider>
    </div>
  )
}

export { RegularNfts }
