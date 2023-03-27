import { Icon } from '@/elements/Icon'
import Link from 'next/link'

const Breadcrumb = (props) => {
  const { className, items } = props
  return (
    <ol
      itemscope
      itemtype='https://schema.org/BreadcrumbList'
      className={`breadcrumb trail ${className || ''}`.trim()}
    >
      {
    items &&
      items.map((item, i) => {
        return (
          <li
            key={i}
            itemProp='itemListElement'
            itemscope
            itemtype='https://schema.org/ListItem'
          >
            <Link
              itemProp='item'
              className={'crumb' + (['#', ''].includes(item.link)
                ? ' pointer events none'
                : '')}
              href={
                ['#', ''].includes(item.link)
                  ? '#'
                  : item.link
              }
              data-is-last={items.length === i}
            >
              <span itemProp='name'>{item.name}</span>
            </Link>
            {i < items.length - 1 && (
              <Icon size='md' variant='chevron-right' />
            )}

            <meta itemProp='position' content={`${i + 1}`} />
          </li>
        )
      })
  }
    </ol>

  )
}

export { Breadcrumb }
