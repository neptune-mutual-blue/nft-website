import React from 'react'

import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

const LockAndLevels = ({ locked, levels, short = false }) => {
  return (
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
            text: (short ? 'L' : 'Level ') + levels[0],
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
            text: (short ? 'L' : 'Level ') + levels[1],
            color: 'level' + levels[1]
          }
        ]}
      />
    </div>
  )
}

export default LockAndLevels
