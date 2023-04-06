import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { useContext, useEffect } from 'react'
import { LocalStorageKeys } from '@/config/localstorage'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { LoaderContext } from '@/contexts/LoaderContext'

const BaseLayout = ({ children }) => {
  const router = useRouter()

  const { login } = useAuth()

  useEffect(() => {
    const connectorName = localStorage.getItem(LocalStorageKeys.CONNECTOR_NAME)

    if (connectorName) {
      login(connectorName)
    }
  }, [login])

  const { loading } = useContext(LoaderContext)

  return (
    <div className='base layout'>
      {loading && (
        <PageLoader />
      )}
      <Header headerStyle={router.pathname === '/marketplace' ? 'colored' : null} />
      <div className='header gap' />
      {children}
      <Footer />
    </div>
  )
}

export { BaseLayout }
