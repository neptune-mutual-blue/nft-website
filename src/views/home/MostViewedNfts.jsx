import Link from 'next/link'

import { abbreviateNumber } from '@/utils/abbreviate-number'
import { formatText } from '@/utils/helpers'
import { getMarketplaceFiltersHref } from '@/utils/nft'

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
                <img src={character.thumbnail} aria-labelledby={formatText(character.name)} alt='' />
              </div>
              <div>
                <div id={formatText(character.name)} className='character name'>{character.name}</div>
                <div className='character description'>{character.description}</div>
                <div className='character viewed'>
                  Viewed{' '}
                  <span data-tooltip={views.long} data-flow='left'>
                    {views.result}{views.symbol}
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
