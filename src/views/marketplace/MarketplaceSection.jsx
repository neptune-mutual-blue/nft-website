import { NftCard } from '@/components/NftCard/NftCard'
import { useDebounce } from '@/hooks/useDebounce'
import { imageOrigin } from '@/services/marketplace-api'
import { getMarketplaceUrl } from '@/utils/nft'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Filter } from './Filter'
import { Pagination } from './Pagination'

const MarketPlaceSection = ({ data = [], filters = [], pageData }) => {
  const [searchValue, setSearchValue] = useState(pageData?.search || '')
  const [properties, setProperties] = useState(pageData?.filters ?? [])
  const initial = useRef(true)
  const inputRef = useRef(null)

  const router = useRouter()

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const updateUrlPath = useCallback((_page, _search, _filters) => {
    if (initial.current) return

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
    if (!data.length) return [1, 1]

    return [
      data[0].pageNumber,
      data[0].totalPages
    ]
  }, [data])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className='marketplace search container'>
      <div className='inner container'>
        <Filter
          setProperties={setProperties}
          properties={properties}
          filters={filters}
        />

        <div className='right'>
          <div>
            <input
              placeholder='Search'
              className='search input'
              value={searchValue}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <div className='nft grid'>
              {
                data.map((nft) => (
                  <NftCard
                    key={nft.tokenId}
                    name={nft.nickname}
                    nftId={nft.tokenId}
                    views={nft.views}
                    count={nft.siblings}
                    image={`${imageOrigin}/thumbnails/${nft.tokenId}.webp`}
                  />
                ))
              }
            </div>
          </div>

          <Pagination
            currentPage={curentPage}
            totalPages={totalPages}
            getHref={page => page ? getMarketplaceUrl(page, searchValue, properties) : '#'}
          />
        </div>
      </div>
    </div>
  )
}

export { MarketPlaceSection }
