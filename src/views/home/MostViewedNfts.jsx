import CountUp from '@/components/CountUp/CountUp'
import { abbreviateNumber } from '@/utils/abbreviate-number'
import { getMarketplaceFiltersHref } from '@/utils/nft'
import Link from 'next/link'

const MostViewedNfts = ({ mostViewedNfts }) => {
  return (
    <div className='most viewed nfts'>
      <h3>Most Viewed</h3>
      {
      mostViewedNfts.map((character) => {
        const views = abbreviateNumber(character.views)

        return (
          <Link key={character.name} href={getMarketplaceFiltersHref(character)}>
            <div className='character details'>
              <div>
                <img src={character.thumbnail} alt={character.name} />
              </div>
              <div>
                <div className='character name'>{character.name}</div>
                <div className='character description'>{character.description}</div>
                <div className='character viewed'>
                  Viewed{' '}
                  <span data-tooltip={views.long} data-flow='left'>
                    <CountUp number={views.result} symbol={views.symbol} />
                  </span>{' '}
                  times
                </div>
              </div>
            </div>
          </Link>
        )
      })
    }
    </div>
  )
}

export { MostViewedNfts }
