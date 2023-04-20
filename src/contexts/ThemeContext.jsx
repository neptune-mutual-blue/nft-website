import {
  createContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { useRouter } from 'next/router'

const getTheme = () => {
  if (typeof window === 'undefined') {
    return
  }

  // Look for URL search param `theme` for first source of truth
  const urlSearch = window.location.search

  if (urlSearch) {
    const params = new URLSearchParams(urlSearch.slice(1))

    if (params.has('theme') && ['dark', 'light'].includes(params.get('theme'))) {
      return params.get('theme')
    }
  }

  const theme = window.localStorage.getItem('theme')

  if (theme) {
    return theme
  }

  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDarkMode ? 'dark' : 'light'
}

const ThemeContext = createContext()

export function ThemeProvider ({ children }) {
  const [dark, setDark] = useState(false)

  const router = useRouter()

  const initial = useRef(true)

  const setInitialTheme = () => {
    setDark(getTheme() === 'dark')

    // This doesn't account for theme being a middle parameter in the URL Search Param. Please use only as first or last param.
    const search = window.location.search.replace(/&?theme=[dark|light]+&?/g, '').trim()

    const newURL = window.location.pathname + (search.length <= 1 ? '' : search)

    window.history.pushState({}, undefined, newURL)
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

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    const linksWithThemes = document.querySelectorAll('a[data-include-theme]')

    linksWithThemes.forEach(link => {
      if (link.href.includes('?theme=')) {
        link.href = link.href.replace(/\?theme=[dark|light]+/g, '') + '?theme=' + theme
      } else {
        link.href = link.href + '?theme=' + theme
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
