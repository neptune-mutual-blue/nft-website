import React from 'react'

import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import { PersonaLevelGroups } from '@/config/persona'
import PersonaSelection from '@/views/my-persona/PersonaSelection'

function PersonaSetModal ({ visible, setVisible, characters, selections }) {
  return (
    <Modal className='persona set modal' visible={visible} setVisible={setVisible}>
      <div className='persona set successful'>
        <img className='nft collections logo' src='assets/images/persona/nft-collections.webp' alt='Neptune Mutual NFT Collections' />

        <div className='selections'>
          {PersonaLevelGroups.map(levelGroup => (
            <PersonaSelection
              className='embedded'
              key={levelGroup[0]}
              characters={characters}
              levels={levelGroup}
              selected={false}
              selection={selections[levelGroup[0]]}
              onClick={() => {}}
            />
          ))}
        </div>

        <h1>Congratulations! You have set your persona!</h1>
        <div className='cta'>
          <Button
            size='xl' onClick={() => {
              setVisible(false)
            }}
          >Continue
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default PersonaSetModal
