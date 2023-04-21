import Link from 'next/link'

import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'

import NpmDarkLogo from '../../elements/npm/npm-logo-dark-mode.svg?raw'
import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg?raw'
import { normalizeUrl } from '../../utils/url'
import { getFooterData } from './data'

const { lists, socials } = getFooterData()

const Footer = () => {
  return (
    <footer>
      <div className='inner container'>
        <div className='nav container'>
          <a className='logo' href={AppConstants.neptunemutualOrigin}>
            <span className='sr-only'>Neptune Mutual</span>
            <span className='light only'><NpmLightLogo /></span>
            <span className='dark only'><NpmDarkLogo /></span>
          </a>

          <nav>
            {lists.map((list) => {
              return (
                <div key={list.title} className='list'>
                  <h2>{list.title}</h2>
                  <ul>
                    {list.links.map((link) => {
                      return (
                        <li key={link.href}>
                          {link.isExternal
                            ? (
                              <a
                                href={
                                normalizeUrl(link.href)
                              }
                                target='_blank'
                                rel='noreferrer'
                              >
                                {link.text}
                              </a>
                              )
                            : (
                              <Link
                                href={
                                normalizeUrl(link.href)
                              }
                              >
                                {link.text}
                              </Link>
                              )}

                          {link.badge && (
                            <div
                              data-color={link?.badgeColor || 'info'}
                              className='badge'
                            >
                              {link.badge}
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>

        <div className='risk warning'>
          <div className='inner container'>
            <h3>Risk Warning</h3>
            <p>
              Trading crypto assets involves significant risk and can result in
              the loss of your capital. You should not invest more than you can
              afford to lose and you should ensure that you fully understand the
              risks involved. Before trading, please take into consideration
              your level of experience, investment objectives, and seek
              independent financial advice if necessary. It is your
              responsibility to ascertain whether you are permitted to use the
              services of Neptune Mutual based on the legal requirements in your
              country of residence.
            </p>
          </div>
        </div>

        <div className='copyright'>
          <p className='text'>Neptune Mutual &copy; 2022</p>

          <div className='social'>
            {socials.map((link) => {
              return (
                <a
                  key={link.href}
                  href={normalizeUrl(link.href)}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='sr-only'>{link.text}</span>
                  <Icon size='xl' variant={link.icon} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
