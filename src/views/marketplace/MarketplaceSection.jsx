import { NftCard } from '@/components/NftCard/NftCard'
import { useDebounce } from '@/hooks/useDebounce'
import { apiOrigin, imageOrigin, searchMarketplace } from '@/services/marketplace-api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Filter } from './Filter'
import { Pagination } from './Pagination'

const MarketPlaceSection = ({ initialData = [], filters = [] }) => {
  const [searchValue, setSearchValue] = useState('')
  const [properties, setProperties] = useState([])
  const [data, setData] = useState(initialData)
  const initial = useRef(true)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const makeApiCall = useCallback((_page, _searchValue, _properties) => {
    if (initial.current) return

    (async function async () {
      try {
        const { data: _data } = await searchMarketplace(_searchValue, _properties, _page, undefined, apiOrigin)
        if (_data && Array.isArray(_data)) {
          setData(_data)
        }
      } catch {}
    })()
  }, [])

  useEffect(() => {
    makeApiCall(1, debouncedSearchValue, properties)
    initial.current = false
  }, [debouncedSearchValue, properties, makeApiCall])

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

  const handlePageChange = (page) => {
    makeApiCall(page, searchValue)
  }

  return (
    <div className='marketplace search container'>
      <div className='inner container'>
        <Filter
          setProperties={setProperties}
          filters={filters}
        />

        <div className='right'>
          <div>
            <input
              placeholder='Search'
              className='search input'
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className='nft grid'>
              {
                data.map((nft, i) => (
                  <NftCard
                    key={i}
                    name={nft.nickname}
                    nftId={nft.tokenId}
                    views={nft.views}
                    count={nft.siblings}
                    image={nft.image || `${imageOrigin}/images/${nft.tokenId}.png`}
                  />
                ))
              }
            </div>
          </div>

          <Pagination
            currentPage={curentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export { MarketPlaceSection }
