import Link from 'next/link'

import { Icon } from '@/elements/Icon'
import { normalizeUrl } from '@/utils/url'

const Navigation = ({ data }) => {
  return (
    <nav>
      <ul>
        {
      data.map(({ title, href }) => {
        return href
          ? (
            <li key={title}>
              <Link
                href={
                  normalizeUrl(href)
                }
              >
                {title}
              </Link>
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
