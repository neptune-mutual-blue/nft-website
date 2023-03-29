import { ThemeContext } from '@/contexts/ThemeContext'
import { useContext } from 'react'

const HeroImage = () => {
  const { dark } = useContext(ThemeContext)
  return (
    <div className='hero image'>

      <img alt='' src='/assets/images/hero/merman.webp' />
      <img alt='' src='/assets/images/hero/neptune.webp' />
      <img alt='' src='/assets/images/hero/salacia.webp' />

      <svg viewBox='0 0 942 510' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_f_5846_499070)'>
          <path d='M231.406 320.872L254.422 190.942L365.791 229.55L516.139 179.434L655.35 136L748.529 163.471L778.227 213.587L805.698 334.237L766.719 548.436L655.35 607.833L283.749 548.436L176.835 486.812L136 389.179L231.406 320.872Z' fill={dark ? 'black' : 'white'} />
        </g>
        <defs>
          <filter id='filter0_f_5846_499070' x='0.129944' y='0.129944' width='941.439' height='743.572' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='67.935' result='effect1_foregroundBlur_5846_499070' />
          </filter>
        </defs>
      </svg>

    </div>

  )
}

export { HeroImage }
