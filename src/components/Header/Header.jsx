import ThemeSelector from '@/components/Header/ThemeSelector'
import Link from 'next/link'
import NpmDarkLogo from '../../elements/npm/npm-logo-dark-mode.svg'
import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg'

const Header = ({ headerStyle }) => {
  return (
    <>
      <header data-style={headerStyle}>
        <div className='inner container'>
          <Link className='logo' href='/'>
            <span className='sr-only'>Neptune Mutual</span>
            <span className='light only'><NpmLightLogo /></span>
            <span className='dark only'><NpmDarkLogo /></span>
          </Link>

          <div className='language and theme only'>
            <ThemeSelector />
          </div>
        </div>
      </header>
      <hr />
    </>
  )
}

export { Header }
