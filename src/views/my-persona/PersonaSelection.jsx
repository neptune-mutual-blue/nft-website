import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { Button } from '@/components/Button/Button'
import GuardianBeastSelection from '@/views/my-persona/GuardianBeastSelection'
import LockAndLevels from '@/views/my-persona/LockAndLevels'

const PersonaSelectionWrapper = ({ mobile, children, ...props }) => {
  if (mobile) {
    return (
      <div {...props}>
        {children}
      </div>
    )
  }

  return (
    <button {...props}>
      {children}
    </button>
  )
}

const PersonaSelection = ({ locked, levels, selected, characters, selection, onClick, className = '' }) => {
  const firstNft = characters.find(character => { return character.level === levels[0] && selection === character.role })
  const secondNft = characters.find(character => { return character.level === levels[1] && selection === character.role })

  const [viewMore, setViewMore] = useState(false)

  const [mobile, setMobile] = useState(typeof window === 'undefined' ? false : window.innerWidth < 768)

  // choose the screen size
  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [])

  // create an event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <PersonaSelectionWrapper mobile={mobile} className={`persona selection${className ? ' ' + className : ''}${selected ? ' selected' : ''}`} onClick={onClick}>
      <LockAndLevels levels={levels} locked={locked} />

      <div className={`current selection ${selection ? selection.toLowerCase() : 'no selection'}`}>
        {!selection && 'Unspecified'}
        {selection && (
          <div className={`content${selection ? ' ' + selection.toLowerCase() : ''}`}>
            <div className='label'>{selection}</div>
            <div className='images'>
              <img src={firstNft.thumbnail} alt={firstNft.name} />
              <img src={secondNft.thumbnail} alt={secondNft.name} />
            </div>
          </div>
        )}
      </div>

      {viewMore && (
        <div className='mobile details'>
          <GuardianBeastSelection
            onSetPersona={() => {}}
            locked
            levels={levels}
            characters={characters}
            selection={{ [levels[0]]: selection }}
            setSelectedLevels={() => {}}
            onSelectionChange={() => { }}
          />
        </div>
      )}

      {mobile && (
        <div className={`mobile view more${viewMore ? ' expanded' : ''}`}>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setViewMore(!viewMore)
            }} variant='link-color' size='xl' iconTrailing='chevron-down'
          >{viewMore ? 'View Less' : 'View More'}
          </Button>
        </div>
      )}

    </PersonaSelectionWrapper>
  )
}

export default PersonaSelection
