import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import {
  Router,
  useRouter
} from 'next/router'

import { NftCard } from '@/components/NftCard/NftCard'
import { LoaderContext } from '@/contexts/LoaderContext'
import { Icon } from '@/elements/Icon'
import { useDebounce } from '@/hooks/useDebounce'
import { useMobileFilter } from '@/hooks/useMobileFilter'
import { imageOrigin } from '@/services/marketplace-api'
import { getMarketplaceUrl } from '@/utils/nft'
import { NftPlaceholder } from '@/views/marketplace/NftPlaceholder'

import { Filter } from './Filter'
import { Pagination } from './Pagination'

const MarketPlaceSection = ({ data = [], filters = [], pageData }) => {
  const [searchValue, setSearchValue] = useState(pageData?.search || '')
  const [properties, setProperties] = useState(pageData?.filters ?? [])
  const initial = useRef(true)
  const inputRef = useRef(null)

  const router = useRouter()

  const debouncedSearchValue = useDebounce(searchValue, 500)
  const { showFilter, onFilterOpen, onFilterClose } = useMobileFilter()

  const updateUrlPath = useCallback((_page, _search, _filters) => {
    if (initial.current) { return }

    const urlObject = getMarketplaceUrl(_page, _search, _filters)

    router.push(urlObject, undefined, { scroll: false })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateUrlPath(1, debouncedSearchValue, properties)
  }, [debouncedSearchValue, properties, updateUrlPath])

  useEffect(() => {
    /* initial delay of 500ms */
    setTimeout(() => {
      initial.current = false
    }, 500)
  }, [])

  const [curentPage, totalPages] = useMemo(() => {
    if (!data.length) { return [1, 1] }

    return [
      data[0].pageNumber,
      data[0].totalPages
    ]
  }, [data])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const { loading } = useContext(LoaderContext)

  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    if (loading && !initial.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [loading])

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      const urlParts = url.split('/')

      const lastPart = urlParts[urlParts.length - 1]

      if (url === '/' || (urlParts.length === 3 && (!isNaN(lastPart) || lastPart === 'minting-levels'))) {
        setIsNavigating(true)
      } else {
        setIsNavigating(false)
      }
    }

    Router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [])

  return (
    <div className='marketplace search container'>
      <div className='inner container'>
        <div className='filter overlay' data-open={showFilter ? 'true' : 'false'} />
        <Filter
          setProperties={setProperties}
          properties={properties}
          filters={filters}
          showFilter={showFilter}
          onFilterClose={onFilterClose}
        />

        <div className='right'>
          <div>
            <div className='filter marketplace'>
              <label htmlFor='marketplace' className='label-hidden'>Search Marketplace</label>
              <input
                id='marketplace'
                placeholder='Search Marketplace'
                className='search input'
                value={searchValue}
                onChange={handleInputChange}
                ref={inputRef}
                aria-label='Search Marketplace'
              />
              <button className='button' onClick={() => { return onFilterOpen() }}>
                <span>Properties</span>
                <i data-icon='filter-lines'>
                  <Icon variant='filter-lines' />
                </i>
              </button>
            </div>
            <div className='nft grid'>
              {loading && !isNavigating &&
                Array.from({ length: 9 }).map((_x, i) => {
                  return (
                    <NftPlaceholder key={i} />
                  )
                })}
              {(!loading || isNavigating) &&
                 data.map((nft) => {
                   return (
                     <NftCard
                       key={nft.tokenId}
                       name={nft.nickname}
                       nftId={nft.tokenId}
                       views={nft.views}
                       count={nft.siblings}
                       image={`${imageOrigin}/thumbnails/${nft.tokenId}.webp`}
                     />
                   )
                 })}
            </div>

            {!loading && !isNavigating && data.length === 0 &&
              <div className='noresult found'>
                <div className='content'>
                  <h2>No Results Found</h2>
                  <p>Adjust your filters and try again.</p>
                </div>
              </div>}
          </div>

          <Pagination
            currentPage={curentPage}
            totalPages={totalPages}
            getHref={page => { return page ? getMarketplaceUrl(page, searchValue, properties) : '#' }}
          />
        </div>
      </div>
    </div>
  )
}

export { MarketPlaceSection }
