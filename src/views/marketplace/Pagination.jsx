import { Icon } from '@/elements/Icon'
import { getPagination } from '@/utils/pagination'
import Link from 'next/link'

const t = (x) => x

const Pagination = ({ currentPage, totalPages, getHref }) => {
  const { previous, pages, next } = getPagination(totalPages, currentPage)

  return (
    <div className='ui pagination'>
      <div className='container'>
        <Link
          className={`previous page ${!previous && 'disabled pointer events none'}`}
          href={getHref(previous)}
          scroll={false}
          tabIndex={!previous && '-1'}
        >
          <Icon variant='arrow-left' size='lg' />
          <span>{t('Previous')}</span>
        </Link>

        <div className='page numbers'>
          {
            pages &&
              pages.map((page, index) => {
                return page
                  ? (
                    <Link
                      key={index}
                      className={`button page ${
                      currentPage === page ? 'active' : ''
                    }`}
                      href={getHref(page)}
                      scroll={false}
                    >
                      {page}
                    </Link>
                    )
                  : (
                    <span key={index} className='continues'> ... </span>
                    )
              })
          }
        </div>

        <Link
          className={`next page ${!next && 'disabled pointer events none'}`}
          href={getHref(next)}
          scroll={false}
          tabIndex={!next && '-1'}
        >
          <span>{t('Next')}</span>
          <Icon variant='arrow-right' size='lg' />
        </Link>
      </div>
    </div>
  )
}

export { Pagination }
