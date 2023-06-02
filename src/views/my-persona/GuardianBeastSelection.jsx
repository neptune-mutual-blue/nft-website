import React from 'react'

import { Button } from '@/components/Button/Button'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import {
  CharacterDetails,
  Personas
} from '@/config/persona'
import { useWeb3React } from '@web3-react/core'

const GuardianBeastSelection = ({ characters, levels, selection, onSelectionChange, setSelectedLevels, locked, onSetPersona }) => {
  const selectedValue = selection[levels.join('-')]

  const firstNft = characters.find(character => character.level === levels[0] && selectedValue === character.role)
  const secondNft = characters.find(character => character.level === levels[1] && selectedValue === character.role)

  const { active } = useWeb3React()

  return (
    <div className='guardian beast selection'>
      <div class={`options${locked ? ' locked' : ''}`}>
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
            checked={selectedValue === Personas.BEAST}
          />
          <label for={Personas.BEAST}>{Personas.BEAST}</label>
        </div>
      </div>
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

      <div className='cta'>
        {levels[0] !== 1 && !locked && (
          <Button
            onClick={() => {
              setSelectedLevels(levels.map(level => level - 2))
            }}
            variant='link-color' size='xl' iconLeading='arrow-left'
          >Previous
          </Button>
        )}
        {levels[0] !== 5 && !locked && (
          <Button
            onClick={() => {
              setSelectedLevels(levels.map(level => level + 2))
            }}
            size='xl' iconTrailing='arrow-right'
          >Next
          </Button>
        )}
        {(levels[0] === 5 || locked) && (
          <CustomTooltip disabled={!(locked || !active)} text={locked ? 'Your Persona is Locked' : 'Connect Your Wallet'}>
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
