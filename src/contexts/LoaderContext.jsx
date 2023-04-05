import { Router } from 'next/router'
import { createContext, useEffect, useState } from 'react'

const LoaderContext = createContext()

export function LoaderProvider ({ children }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const show = () => setLoading(true)
    const hide = () => setLoading(false)

    Router.events.on('routeChangeStart', show)
    Router.events.on('routeChangeComplete', hide)
    Router.events.on('routeChangeError', hide)

    return () => {
      Router.events.off('routeChangeStart', show)
      Router.events.off('routeChangeComplete', hide)
      Router.events.off('routeChangeError', hide)
    }
  }, [])

  return (
    <LoaderContext.Provider
      value={{
        loading
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

export { LoaderContext }
