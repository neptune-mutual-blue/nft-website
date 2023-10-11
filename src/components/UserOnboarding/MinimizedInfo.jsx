import React from 'react'

import { Button } from '@/components/Button/Button'

const MinimizedInfo = ({ hide }) => {
  return (
    <div className='minimized guide info'>
      <div className='guide content'>
        <div>
          This guide will be available on this tray throughout the walkthrough.
        </div>

        <Button onClick={hide}>Got It</Button>
      </div>
    </div>
  )
}

export default MinimizedInfo
