import { AppConstants } from '@/constants/AppConstants'
import { aggregateFiltersData } from '@/utils/nft'

const imageOrigin = AppConstants.nftImageOrigin
const apiOrigin = AppConstants.nftApiBaseURL

const DEFAULT_PAGE_SIZE = 25

const searchMarketplace = async (
  searchQuery = '',
  properties = [],
  pageNumber = 1,
  others = {},
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const origin = apiOrigin
  const url = origin + '/marketplace/' + AppConstants.NETWORK + '/search'
  const body = JSON.stringify({
    search: searchQuery,
    properties,
    pageNumber,
    pageSize,
    ...others
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    const data = await response.json()

    return data
  } catch (e) {
    console.error(e)
    return {
      message: '',
      code: '0',
      data: []
    }
  }
}

const getMarketplaceFilters = async () => {
  const url = apiOrigin + '/marketplace/' + AppConstants.NETWORK + '/properties'

  try {
    const res = await fetch(url)
    const { message, code, data } = await res.json()

    const aggregatedData = aggregateFiltersData(data)

    return {
      message,
      data: aggregatedData,
      code
    }
  } catch (e) {
    console.error(e)
    return {
      message: '',
      code: '0',
      data: []
    }
  }
}

export { apiOrigin, getMarketplaceFilters, imageOrigin, searchMarketplace }
