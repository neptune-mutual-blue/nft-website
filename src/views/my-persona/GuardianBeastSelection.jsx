import React from 'react'

import { Button } from '@/components/Button/Button'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import {
  CharacterDetails,
  Personas
} from '@/config/persona'
import { Icon } from '@/elements/Icon'
import LockAndLevels from '@/views/my-persona/LockAndLevels'
import { useWeb3React } from '@web3-react/core'

const GuardianBeastSelection = ({ characters, levels, selection, onSelectionChange, setSelectedLevels, locked, onSetPersona }) => {
  const selectedValue = selection[levels[0]]

  const firstNft = characters.find(character => { return character.level === levels[0] && selectedValue === character.role })
  const secondNft = characters.find(character => { return character.level === levels[1] && selectedValue === character.role })

  const { active } = useWeb3React()

  const buildOptions = (mobile) => {
    return (
      <div class={`options${locked ? ' locked' : ''}${mobile ? ' mobile' : ''}`}>
        <div class='option' data-active={selectedValue === Personas.GUARDIAN}>
          <input
            type='radio'
            name='option_type'
            id={Personas.GUARDIAN}
            value={Personas.GUARDIAN}
            onChange={(e) => {
              if (e.target.checked) {
                onSelectionChange(Personas.GUARDIAN)
              }
            }}
            className={selectedValue === Personas.GUARDIAN ? 'checked' : ''}
            checked={selectedValue === Personas.GUARDIAN}
          />
          <label for={Personas.GUARDIAN}>{Personas.GUARDIAN}</label>
        </div>
        <div class='option' data-active={selectedValue === Personas.BEAST}>
          <input
            type='radio'
            name='option_type'
            id={Personas.BEAST}
            value={Personas.BEAST}
            onChange={(e) => {
              if (e.target.checked) {
                onSelectionChange(Personas.BEAST)
              }
            }}
            className={selectedValue === Personas.BEAST ? 'checked' : ''}
            checked={selectedValue === Personas.BEAST}
          />
          <label for={Personas.BEAST}>{Personas.BEAST}</label>
        </div>
      </div>
    )
  }

  return (
    <div className='guardian beast selection'>
      <div className='levels'>
        <LockAndLevels locked={locked} levels={levels} />
      </div>
      {buildOptions(false)}
      <div className='image previews'>
        <div>
          <NftImageWithExpand nft={firstNft} />
          <div className='nft name'>{firstNft.name}</div>
          <Tags
            tags={[
              {
                id: '1',
                slug: '1',
                text: firstNft.stage,
                color: 'nft-selection'
              }
            ]}
          />
        </div>
        <div>
          <NftImageWithExpand nft={secondNft} />
          <div className='nft name'>{secondNft.name}</div>
          <Tags
            tags={[
              {
                id: '1',
                slug: '1',
                text: secondNft.stage,
                color: 'nft-evolution'
              }
            ]}
          />
        </div>
      </div>

      <div className='nft title'>"{firstNft.description}"</div>
      <div className='nft description'>{CharacterDetails[levels[0]][selectedValue]}</div>

      {!locked && levels[0] === 5 && (
        <div className='disclaimer'>
          <Icon variant='info-circle' size='lg' />
          <div>
            <div className='title'>Important</div>
            <div className='content'>This action is irreversible. Please choose carefully.</div>
          </div>
        </div>
      )}

      {buildOptions(true)}

      <div className='cta'>
        {levels[0] !== 1 && (
          <Button
            onClick={() => {
              setSelectedLevels(levels.map(level => { return level - 2 }))
            }}
            variant='link-color' size='xl' iconLeading='arrow-left'
          >Previous
          </Button>
        )}
        {levels[0] !== 5 && (
          <Button
            onClick={() => {
              setSelectedLevels(levels.map(level => { return level + 2 }))
            }}
            size='xl' iconTrailing='arrow-right'
          >Next
          </Button>
        )}
        {(levels[0] === 5) && (
          <CustomTooltip disabled={!locked} text='Your Persona is Locked'>
            <div>
              <Button
                size='xl'
                iconTrailing='lock-01'
                disabled={locked || !active}
                onClick={onSetPersona}
              >
                {locked ? 'Locked' : 'Select Persona'}
              </Button>
            </div>
          </CustomTooltip>

        )}
      </div>
    </div>
  )
}

export default GuardianBeastSelection
