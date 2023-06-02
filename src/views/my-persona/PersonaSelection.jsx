import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

const PersonaSelection = ({ locked, levels, selected, characters, selection, onClick, className = '' }) => {
  const firstNft = characters.find(character => character.level === levels[0] && selection === character.role)
  const secondNft = characters.find(character => character.level === levels[1] && selection === character.role)

  return (
    <button className={`persona selection${className ? ' ' + className : ''}${selected ? ' selected' : ''}`} onClick={onClick}>
      <div className='lock status and levels'>
        <div className='lock icon'>
          <Icon variant={locked ? 'lock-01' : 'lock-unlocked-01'} size='sm' />
        </div>
        <div className='separator first' />
        <Tags
          tags={[
            {
              id: '1',
              slug: '1',
              text: 'Level ' + levels[0],
              color: 'level' + levels[0]
            }
          ]}
        />
        <div className='separator' />
        <Tags
          tags={[
            {
              id: '1',
              slug: '1',
              text: 'Level ' + levels[1],
              color: 'level' + levels[1]
            }
          ]}
        />
      </div>

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

    </button>
  )
}

export default PersonaSelection
