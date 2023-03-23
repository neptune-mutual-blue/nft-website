import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

const BaseLayout = ({ children }) => {
  return (
    <div className='base layout'>
      <Header headerStyle='colored' />
      <div className='header gap' />
      {children}
      <Footer />
    </div>
  )
}

export { BaseLayout }
