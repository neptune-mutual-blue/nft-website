import { aggregateFiltersData } from '@/utils/nft'

const imageOrigin = process.env.NEXT_PUBLIC_NFT_IMAGE_ORIGIN
const apiOrigin = process.env.NEXT_PUBLIC_NFT_API_ORIGIN

const DEFAULT_PAGE_SIZE = 25

const searchMarketplace = async (
  searchQuery = '',
  properties = [],
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const origin = apiOrigin
  const url = origin + '/marketplace/search'
  const body = JSON.stringify({
    search: searchQuery,
    properties,
    pageNumber,
    pageSize
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
  const url = apiOrigin + '/marketplace/properties'

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

export {
  searchMarketplace,
  getMarketplaceFilters,
  apiOrigin,
  imageOrigin
}
