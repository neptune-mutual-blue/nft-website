import { Button } from '@/components/Button/Button'
import { useState } from 'react'
import Link from 'next/link'
import { getMarketplaceFiltersHref } from '@/utils/nft'

const KnowTheCharacters = ({ charactersByPage }) => {
  const [page, setPage] = useState(1)

  return (

    <div className='know the characters'>
      <h2>Know the Characters</h2>
      {
        charactersByPage.map((characters, index) => {
          return (
            <div
              key={index}
              className={`character page${page === index + 1 ? '' : ' hidden'}`}
            >
              {characters.map((character) => {
                return (
                  <Link
                    href={getMarketplaceFiltersHref(character)}
                    key={character.name}
                    className='character details'
                  >
                    <div>
                      <img src={character.thumbnail} alt={character.name} />
                    </div>
                    <div>
                      <div className='character name'>{character.name}</div>
                      <div className='character description'>{character.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })
      }

      <div className='pagination'>
        <Button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1)
          }}
          variant='secondary-gray'
          icon='only'
          iconLeading='arrow-left'
        >
          Previous
        </Button>

        <div>
          Page {page} of{charactersByPage.length}
        </div>

        <Button
          disabled={page === charactersByPage.length}
          onClick={() => {
            setPage(page + 1)
          }} variant='secondary-gray' icon='only' iconLeading='arrow-right'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export { KnowTheCharacters }
