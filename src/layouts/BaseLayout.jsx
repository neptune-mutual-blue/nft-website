import {
  useContext,
  useEffect
} from 'react'

import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { LocalStorageKeys } from '@/config/localstorage'
import { LoaderContext } from '@/contexts/LoaderContext'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'

const BaseLayout = ({ children, videos }) => {
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
      <Header headerStyle={router.pathname === '/marketplace' ? 'colored' : null} videos={videos} />
      <div className='header gap' />
      {children}
      {router.pathname !== '/404' && <Footer />}
    </div>
  )
}

export { BaseLayout }
