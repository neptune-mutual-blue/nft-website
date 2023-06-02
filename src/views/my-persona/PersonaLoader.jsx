import React from 'react'

import Skeleton from '@/components/Skeleton'

const PersonaLoader = () => {
  return (
    <div className='persona loader'>
      <Skeleton />
      <Skeleton />
    </div>
  )
}

export default PersonaLoader
