import { useContext } from 'react'

import { AppConstants } from '@/constants/AppConstants'
import { ThemeContext } from '@/contexts/ThemeContext'
import { Icon } from '@/elements/Icon'
import { normalizeUrl } from '@/utils/url'

const Navigation = ({ data }) => {
  const themeContext = useContext(ThemeContext)
  return (
    <nav>
      <ul>
        {
      data.map(({ title, href }) => {
        return href
          ? (
            <li key={title}>
              <a
                href={
                AppConstants.neptunemutualOrigin +
                normalizeUrl(href) + '?theme=' + (themeContext.dark ? 'dark' : 'light')
              }
                rel='noreferrer'
              >
                {title}
              </a>
            </li>
            )
          : (
            <li key={title}>
              <button className='display resources mega menu' data-open='false'>
                <span>{title}</span>
                <i data-state='closed'>
                  <Icon variant='chevron-down' size='lg' />
                </i>
                <i data-state='opened'>
                  <Icon variant='chevron-up' size='lg' />
                </i>
              </button>
            </li>
            )
      })
    }
      </ul>
    </nav>
  )
}

export default Navigation
