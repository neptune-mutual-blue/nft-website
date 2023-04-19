import { useContext } from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { ThemeContext } from '@/contexts/ThemeContext'
import { Icon } from '@/elements/Icon'
import { normalizeUrl } from '@/utils/url'

const Section = ({ section }) => {
  const { title, links } = section
  const themeContext = useContext(ThemeContext)

  return (
    <div className='nav section container'>
      <h4 className='title'>{title}</h4>
      <div className='content'>
        {
          links && links.map((link) => (
            <a
              key={
              link.title
            }
              className='item container'
              href={
                !link.isNPM
                  ? normalizeUrl(link.href)
                  : AppConstants.neptunemutualOrigin +
                normalizeUrl(link.href) + '?theme=' + (themeContext.dark ? 'dark' : 'light')
              }
              target={link.isExternal ? '_blank' : null}
            >
              {link.icon && <Icon size='md' variant={link.icon} />}
              <div>
                <h3 className='title'>
                  {link.title}
                  {link?.badge && <div className='badge'>{link.badge}</div>}
                  {link.isExternal && (
                    <Icon size='sm' variant='link-external-01' />
                  )}{' '}
                </h3>
                <p className='description'>{link.text}</p>
              </div>
            </a>
          ))
        }
      </div>
    </div>
  )
}

export default Section
