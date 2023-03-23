import { abbreviateNumber } from '@/utils/abbreviate-number'

const MostViewedNfts = ({ mostViewedNfts }) => {
  return (
    <div className='most viewed nfts'>
      <h3>Most Viewed</h3>
      {
      mostViewedNfts.map((character) => {
        const views = abbreviateNumber(character.views)

        return (
          <div key={character.name} className='character details'>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
            <div>
              <div className='character name'>{character.name}</div>
              <div className='character description'>{character.description}</div>
              <div className='character viewed'>
                Viewed{' '}
                <span data-tooltip={views.long} data-flow='left'>
                  {views.short}
                </span>{' '}
                times
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export { MostViewedNfts }
