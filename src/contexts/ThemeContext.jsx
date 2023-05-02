import {
  createContext,
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/router'

const getValidThemeValue = (value) => {
  if (['dark', 'light'].includes(value)) {
    return value
  }

  return undefined
}

const isValidUrl = (href) => {
  try {
    // eslint-disable-next-line no-new
    new URL(href) // Throws error for relative urls
    return true
  } catch (error) { }
  return false
}

const isSameHost = (href) => {
  const url = new URL(href)
  const currentUrl = new URL(window.location)
  return url.host === currentUrl.host
}

const supportsTheme = (href) => {
  if (!isValidUrl(href) || isSameHost(href)) {
    return false
  }

  const hostsWithSameHeader = ['nft.neptunemutual.com', 'neptunemutual.com', 'explorer.neptunemutual.net']

  const url = new URL(href)

  if (!hostsWithSameHeader.includes(url.host)) {
    return false
  }

  return true
}

const addTheme = (href, theme) => {
  if (!theme) {
    return href
  }

  const url = new URL(href)
  url.searchParams.set('theme', theme)
  return url.href
}

const getTheme = () => {
  if (typeof window === 'undefined') {
    return
  }

  // Look for URL search param `theme` for first source of truth
  const url = new URL(window.location)

  const themeFromURL = getValidThemeValue(url.searchParams.get('theme'))

  if (themeFromURL) {
    return themeFromURL
  }

  const themeFromLocalStorage = getValidThemeValue(window.localStorage.getItem('theme'))

  if (themeFromLocalStorage) {
    return themeFromLocalStorage
  }

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDarkMode ? 'dark' : 'light'
}

const cleanUrl = () => {
  const url = new URL(window.location)
  url.searchParams.delete('theme') // remove theme

  window.history.pushState({}, undefined, url)
}

const ThemeContext = createContext()

export function ThemeProvider ({ children }) {
  const [dark, setDark] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setDark(getTheme() === 'dark')
    cleanUrl()
  }, [])

  useEffect(() => {
    if (dark) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark')
      return
    }

    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
  }, [dark])

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    const linksWithThemes = document.querySelectorAll('a')

    linksWithThemes.forEach(link => {
      if (supportsTheme(link.href)) {
        link.href = addTheme(link.href, getValidThemeValue(theme))
      }
    })
  }, [dark, router.pathname])

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
