import { useContext } from 'react'

import { ThemeContext } from '@/contexts/ThemeContext'

const HeroImage = () => {
  const { dark } = useContext(ThemeContext)

  return (
    <div className='hero image'>
      <img alt='' src={`/assets/images/hero/${dark ? 'hero-dark' : 'hero-light'}.webp`} />
    </div>

  )
}

export { HeroImage }
