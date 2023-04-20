import Link from 'next/link'

import { Icon } from '@/elements/Icon'
import { normalizeUrl } from '@/utils/url'

const Section = ({ section }) => {
  const { title, links } = section

  return (
    <div className='nav section container'>
      <h4 className='title'>{title}</h4>
      <div className='content'>
        {
          links && links.map((link) => link.isExternal
            ? (
              <a
                key={link.title}
                className='item container'
                href={normalizeUrl(link.href)}
                target='_blank'
                rel='noreferrer'
                data-include-theme={link.includeTheme ? true : undefined}
              >
                {link.icon && <Icon size='md' variant={link.icon} />}
                <div>
                  <h3 className='title'>
                    {link.title}
                    {link?.badge && <div className='badge'>{link.badge}</div>}
                    {/* {link.isExternal && (
                        <Icon size='sm' variant='link-external-01' />
                      )}{' '} */}
                  </h3>
                  <p className='description'>{link.text}</p>
                </div>
              </a>)
            : (
              <Link
                key={link.title}
                className='item container'
                href={normalizeUrl(link.href)}
              >
                {link.icon && <Icon size='md' variant={link.icon} />}
                <div>
                  <h3 className='title'>
                    {link.title}
                    {link?.badge && <div className='badge'>{link.badge}</div>}
                    {/* {link.isExternal && (
                      <Icon size='sm' variant='link-external-01' />
                    )}{' '} */}
                  </h3>
                  <p className='description'>{link.text}</p>
                </div>
              </Link>)
          )
        }
      </div>
    </div>
  )
}

export default Section
