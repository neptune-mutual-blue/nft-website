import { getFiltersFromQueryString } from '@/utils/nft'

const { searchMarketplace, getMarketplaceFilters } = require('@/services/marketplace-api')

const getSSRData = async (context) => {
  const { params, query, resolvedUrl } = context

  let page = 1
  if (params) {
    page = params.page && parseInt(params.page)
  }
  const search = query.search ?? ''

  const queryString = resolvedUrl.includes('?') ? resolvedUrl.split('?')[1] : ''

  const filters = queryString ? getFiltersFromQueryString(queryString) : []

  // { "value": 500, "traitType": "Siblings" },
  // { "value": 6, "maxValue": 10, "traitType": "Rarity" },
  // { "value": 2, "maxValue": 7, "traitType": "Level" }

  const numericInputs = ['Siblings', 'Rarity', 'Level']

  filters.forEach((filter, i) => {
    if (numericInputs.includes(filter.key)) {
      filters[i].value = Number(filters[i].value)
    }
  })

  const data = await (await searchMarketplace(search, filters, page)).data
  const marketplaceFilters = await (await getMarketplaceFilters()).data

  return {
    data,
    marketplaceFilters,
    pageData: {
      page, search, filters
    }
  }
}

export { getSSRData }
