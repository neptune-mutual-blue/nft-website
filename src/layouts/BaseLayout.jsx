import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { getLibrary } from '@/lib/connect-wallet/web3'
import { Web3ReactProvider } from '@web3-react/core'

const BaseLayout = ({ children }) => {
  return (
    <div className='base layout'>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header headerStyle='colored' />
        <div className='header gap' />
        {children}
        <Footer />
      </Web3ReactProvider>
    </div>
  )
}

export { BaseLayout }
