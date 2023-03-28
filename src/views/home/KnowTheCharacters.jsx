import { Button } from '@/components/Button/Button'
import { useState } from 'react'

const KnowTheCharacters = ({ charactersByPage }) => {
  const [page, setPage] = useState(1)

  return (

    <div className='know the characters'>
      <h2>Know the Characters</h2>
      {
        charactersByPage.map((characters, index) => (
          <div
            key={index}
            className={`character page${page === index + 1 ? '' : ' hidden'}`}
          >
            {characters.map((character) => (
              <div key={character.name} className='character details'>
                <div>
                  <img src={character.thumbnail} alt={character.name} />
                </div>
                <div>
                  <div className='character name'>{character.name}</div>
                  <div className='character description'>{character.description}</div>
                </div>
              </div>
            ))}
          </div>
        ))
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
