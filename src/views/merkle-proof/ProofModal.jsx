import React, { useState } from 'react'

import Listbox from '@/components/Listbox/Listbox'
import { Modal } from '@/components/Modal/Modal'
import { Tags } from '@/components/Tags/Tags'

const optionRender = (option) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tags
        tags={[
          {
            id: '1',
            slug: '1',
            text: `Level ${option.level}`,
            color: 'level' + option.level
          }
        ]}
      />
      <div>
        {option.value}
      </div>
    </div>
  )
}

const OPTIONS = [
  {
    value: 'Delphinus',
    level: 1,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Sabersquatch',
    level: 1,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Delphinus',
    level: 2,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Sabersquatch',
    level: 2,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Aquavallo',
    level: 3,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Gargantuworm',
    level: 3,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Aquavallo',
    level: 4,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Gargantuworm',
    level: 4,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Salacia',
    level: 5,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Merman Serpent',
    level: 5,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Epic Salacia',
    level: 6,
    persona: 1,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Diabolic Merman Serpent',
    level: 6,
    persona: 2,
    render: function () { return optionRender(this) }
  },
  {
    value: 'Legendary Neptune',
    level: 7,
    persona: 0,
    render: function () { return optionRender(this) }
  }
]

const ProofModal = ({ open, setOpen, merkleRoot, merkleRootLive }) => {
  const [family, setFamily] = useState('Delphinus')
  return (
    <Modal
      visible={open} setVisible={setOpen}
    >
      <div className='proof modal'>
        <h1>Merkle Proof</h1>

        <div className='root'>
          <span className='key'>Actual Root: </span>
          {merkleRootLive}
        </div>
        <div className='root'>
          <span className='key'>Current Root: </span>
          {merkleRoot}

          <div className={`indicator${merkleRoot === merkleRootLive ? ' match' : ''}`}>
            <div className={`dot${merkleRoot === merkleRootLive ? ' match' : ''}`} />
            {merkleRootLive === merkleRoot ? 'Match' : 'Illegal Root'}
          </div>
        </div>

        <h2>Proof</h2>

        <div className='merkle-proof'>[]</div>

        <Listbox options={OPTIONS} value={family} setValue={setFamily} />
      </div>
    </Modal>
  )
}

export default ProofModal
