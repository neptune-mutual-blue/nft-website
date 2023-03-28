import { ThemeContext } from '@/contexts/ThemeContext'
import { Icon } from '@/elements/Icon'
import { useContext } from 'react'

const ThemeSelector = () => {
  const { dark, setDark } = useContext(ThemeContext)

  return (
    <label className='theme selector label'>
      <span>Dark Mode</span>
      <input
        type='checkbox' id='DarkModeInputCheckbox' checked={dark} onChange={(e) => {
          setDark(e.target.checked)
        }}
      />
      <div className='switch'>
        <i id='MoonStarFilled'>
          <Icon variant='moon-star-filled' size='md' />
        </i>
        <i id='SunFilled'>
          <Icon variant='sun-filled' size='md' />
        </i>
      </div>
    </label>
  )
}

export { ThemeSelector }
