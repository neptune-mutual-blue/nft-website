import { Icon } from '@/elements/Icon'
import { useEffect, useRef, useState } from 'react'

const ThemeSelector = () => {
  const [dark, setDark] = useState(false)

  const initial = useRef(true)

  const setInitialTheme = () => {
    const getTheme = () => {
      const theme = window.localStorage.getItem('theme')

      if (theme) {
        return theme
      }

      const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      return prefersDarkMode ? 'dark' : 'light'
    }

    setDark(getTheme() === 'dark')
  }

  useEffect(() => {
    if (initial.current) {
      initial.current = false
      setInitialTheme()
    } else {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }

    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

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

export default ThemeSelector
