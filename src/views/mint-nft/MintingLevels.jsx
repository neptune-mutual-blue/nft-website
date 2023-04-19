import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

const MintingLevels = ({ mintingLevels }) => {
  const guardians = mintingLevels.filter(character => character.role === 'Guardian' && character.level !== 7)
  const beasts = mintingLevels.filter(character => character.role === 'Beast' && character.level !== 7)
  const level7Character = mintingLevels.find(character => character.level === 7)

  guardians.sort((a, b) => a.level - b.level)
  beasts.sort((a, b) => a.level - b.level)

  const renderCharacter = (character) => {
    return (
      <div key={`${character.name}_${character.role}_${character.level}`} className='character'>
        <div className='img wrapper'>
          <img src={character.thumbnail} alt={character.name} />
          <div className='siblings'>{character.siblings}</div>
        </div>
        <Tags
          tags={[
            {
              id: '1',
              slug: '1',
              text: `Level ${character.level}`,
              color: 'level' + character.level
            }
          ]}
        />
        <div className='name'>
          {character.name}
        </div>
        <div className='stage'>
          {character.stage}
        </div>
      </div>
    )
  }

  return (
    <div className='nft minting levels'>

      <div className='heading'>Minting Levels</div>

      <div className='categorization'>
        <div>
          <div className='info'>
            <Icon variant='guardian' />
            <div className='title'>Guardians</div>
            <div className='description'>
              The Guardians are the protectors of DeFi. They are ancient beings who have sworn to defend the DeFi world against any threat and breaches.
            </div>
          </div>
          <div className='characters'>
            {guardians.map(renderCharacter)}
          </div>
        </div>
        <div>
          <div className='info'>
            <Icon variant='beast' />
            <div className='title'>Beasts</div>
            <div className='description'>
              The Beasts are fierce and formidable creatures that roam the wilds of the DeFi world. They are known for their strength, speed, and fearlessness.
            </div>
          </div>
          <div className='characters'>
            {beasts.map(renderCharacter)}
          </div>
        </div>
      </div>
      <div className='merging box' />
      <div className='final card'>
        <div className='img wrapper'>
          <img src={level7Character.thumbnail} alt='' srcSet='' />
          <div className='siblings'>
            {level7Character.siblings}
          </div>
        </div>
        <Tags
          tags={[
            {
              id: '1',
              slug: '1',
              text: `Level ${level7Character.level}`,
              color: 'level' + level7Character.level
            }
          ]}
        />
        <div className='name'>{level7Character.name}</div>
      </div>
    </div>
  )
}

export { MintingLevels }
