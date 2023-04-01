import { useRouter } from 'next/router'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { useEffect } from 'react'
import { LocalStorageKeys } from '@/config/localstorage'

const BaseLayout = ({ children }) => {
  const router = useRouter()

  const { login } = useAuth()

  useEffect(() => {
    const connectorName = localStorage.getItem(LocalStorageKeys.CONNECTOR_NAME)

    if (connectorName) {
      login(connectorName)
    }
  }, [login])

  return (
    <div className='base layout'>
      <Header headerStyle={router.pathname === '/marketplace' ? 'colored' : null} />
      <div className='header gap' />
      {children}
      <Footer />
    </div>
  )
}

export { BaseLayout }
