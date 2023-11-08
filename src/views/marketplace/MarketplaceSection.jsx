import {
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

import { Button } from '@/components/Button/Button'
import { NftCard } from '@/components/NftCard/NftCard'
import { LoaderContext } from '@/contexts/LoaderContext'
import { Icon } from '@/elements/Icon'
import { useDebounce } from '@/hooks/useDebounce'
import { useMobileFilter } from '@/hooks/useMobileFilter'
import { useOnClickOutside } from '@/hooks/useOnOutsideClick'
import { imageOrigin } from '@/services/marketplace-api'
import { getMarketplaceUrl } from '@/utils/nft'
import { decapitalizeFirstLetter } from '@/utils/string'
import DropdownFilterItem from '@/views/marketplace/DropdownFilterItem'
import { Filter } from '@/views/marketplace/Filter'
import { NftPlaceholder } from '@/views/marketplace/NftPlaceholder'
import { Pagination } from '@/views/marketplace/Pagination'

const ROLE_OPTIONS = ['Beast', 'Guardian', 'Neptune']

const MarketPlaceSection = ({ data = [], filters = [], pageData }) => {
  const [searchValue, setSearchValue] = useState(pageData?.search || '')
  const [properties, setProperties] = useState(pageData?.filters ?? [])
  const [additionalFilters, setAdditionalFilters] = useState(pageData?.additionalFilters ?? [])
  const initial = useRef(true)
  const inputRef = useRef(null)

  const router = useRouter()

  const debouncedSearchValue = useDebounce(searchValue, 500)
  const { showFilter, onFilterOpen, onFilterClose } = useMobileFilter()

  const urlParametersArray = useMemo(() => {
    const parameterArray = [
      {
        key: 'search',
        value: [searchValue]
      },
      ...Object.entries(additionalFilters).map(([key, value]) => {
        return {
          key,
          value: value.toString().split(',')
        }
      }),
      ...properties.map(({ key, value }) => {
        return {
          key: decapitalizeFirstLetter(key),
          value: [value]
        }
      })
    ]

    return parameterArray
  }, [additionalFilters, properties, searchValue])

  useEffect(() => {
    if (initial.current) { return }

    const url = getMarketplaceUrl(1, urlParametersArray)

    router.push(url, undefined, { scroll: false })

    // eslint-disable-next-line
  }, [debouncedSearchValue, properties, additionalFilters, urlParametersArray])

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
  const [showFilters, setShowFilters] = useState(false)

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

  const toggleAdditionalFilters = (key, value) => {
    if (value === undefined) {
      const clonedFilters = { ...additionalFilters }

      delete clonedFilters[key]
      return setAdditionalFilters(clonedFilters)
    }

    if (key !== 'roles') {
      return setAdditionalFilters({
        ...additionalFilters,
        [key]: value
      })
    }

    const hasRole = additionalFilters.roles?.includes(value)

    let newRoles = ''

    if (hasRole) {
      newRoles = (additionalFilters.roles ?? '').split(',').filter(x => { return x !== value && x }).join(',')
    } else {
      newRoles = additionalFilters.roles ? additionalFilters.roles + ',' + value : value
    }

    if (newRoles) {
      setAdditionalFilters({
        ...additionalFilters,
        [key]: newRoles
      })
    } else {
      const clonedFilters = { ...additionalFilters }

      delete clonedFilters[key]
      return setAdditionalFilters(clonedFilters)
    }
  }

  const ref = useRef()
  const triggerRef = useRef()

  useOnClickOutside(ref, (e) => {
    if (triggerRef.current.contains(e.target)) {
      return
    }
    return setShowFilters(false)
  })

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

              <div className='filter buttons'>
                <Button
                  variant='secondary-gray'
                  size='md'
                  iconTrailing='filter-lines'
                  classname='filter button'
                  onClick={() => { return onFilterOpen() }}
                >
                  Properties
                </Button>
                <div className='filter dialog wrapper'>
                  <Button
                    variant='secondary-gray'
                    size='md'
                    iconTrailing='filter-funnel-02'
                    ref={triggerRef}
                    onClick={() => {
                      return setShowFilters(!showFilters)
                    }}
                  >
                    Filter
                  </Button>

                  <div className={`filter dialog${showFilters ? ' open' : ''}`} ref={ref}>
                    <div className='filter title mobile'>
                      <div>Filter</div>
                      <button onClick={() => {
                        setShowFilters(false)
                      }}
                      ><Icon variant='x-close' size='lg' />
                      </button>
                    </div>
                    <div className='label'>Role</div>
                    {ROLE_OPTIONS.map((role) => {
                      return <DropdownFilterItem key={role} filterKey='roles' label={role} selected={(additionalFilters.roles ?? '').includes(role)} toggle={toggleAdditionalFilters} value={role} showCheckbox />
                    })}
                    <div className='label'>Transferability</div>
                    <DropdownFilterItem filterKey='soulbound' label='All' selected={additionalFilters.soulbound === undefined} toggle={toggleAdditionalFilters} value={undefined} />
                    <DropdownFilterItem filterKey='soulbound' label='Soulbound' selected={additionalFilters.soulbound === true} toggle={toggleAdditionalFilters} value />
                    <DropdownFilterItem filterKey='soulbound' label='Tradable' selected={additionalFilters.soulbound === false} toggle={toggleAdditionalFilters} value={false} />
                    <div className='label'>Ownership</div>
                    <DropdownFilterItem filterKey='minted' label='All' selected={additionalFilters.minted === undefined} toggle={toggleAdditionalFilters} value={undefined} />
                    <DropdownFilterItem filterKey='minted' label='Minted' selected={additionalFilters.minted === true} toggle={toggleAdditionalFilters} value />
                    <DropdownFilterItem filterKey='minted' label='Non-minted' selected={additionalFilters.minted === false} toggle={toggleAdditionalFilters} value={false} />
                  </div>
                </div>
              </div>
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
                       soulbound={nft.soulbound}
                       minted={!!nft.tokenOwner}
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
            getHref={page => { return page ? getMarketplaceUrl(page, urlParametersArray) : '#' }}
          />
        </div>
      </div>
    </div>
  )
}

export { MarketPlaceSection }
