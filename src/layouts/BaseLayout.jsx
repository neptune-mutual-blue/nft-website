import {
  useContext,
  useEffect
} from 'react'

import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { LocalStorageKeys } from '@/config/localstorage'
import { AppConstants } from '@/constants/AppConstants'
import { LoaderContext } from '@/contexts/LoaderContext'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'

import dynamic from 'next/dynamic'
const UserOnboarding = dynamic(() => { return import('@/components/UserOnboarding/UserOnboarding') }, { ssr: false })

const BaseLayout = ({ children, videos }) => {
  const router = useRouter()

  const { login, logout } = useAuth()
  const { pathname } = useRouter()

  useEffect(() => {
    const connectorName = localStorage.getItem(LocalStorageKeys.CONNECTOR_NAME)

    // Disable Eager Connect For Bridge Pages
    if (connectorName && pathname && !pathname.startsWith('/my-collection/bridge')) {
      return login(connectorName, AppConstants.NETWORK)
    }
  }, [login, logout, pathname])

  const { loading } = useContext(LoaderContext)

  return (
    <div className='base layout'>

      {loading && (
        <PageLoader />
      )}
      <Header headerStyle={router.pathname === '/marketplace' ? 'colored' : null} videos={videos} />
      <div className='header gap' />
      <UserOnboarding />
      {children}
      {router.pathname !== '/404' && <Footer />}
    </div>
  )
}

export { BaseLayout }
