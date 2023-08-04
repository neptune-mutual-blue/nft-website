import { getFiltersFromQueryString } from '@/utils/nft'

const { searchMarketplace, getMarketplaceFilters } = require('@/services/marketplace-api')

const SUPPORTED_ROLES = ['Beast', 'Guardian', 'Neptune']

const getSSRData = async (context) => {
  const { params, query, resolvedUrl } = context

  let page = 1
  if (params) {
    page = params.page && parseInt(params.page)
  }
  const search = query.search ?? ''
  const minted = ['true', 'false'].includes(query.minted) ? query.minted === 'true' : undefined
  const soulbound = ['true', 'false'].includes(query.soulbound) ? query.soulbound === 'true' : undefined
  const roles = query.roles ? query.roles.split(',').filter(role => { return SUPPORTED_ROLES.includes(role) }) : undefined

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

  const additionalFilters = {
    minted,
    soulbound,
    roles
  }

  for (const property in additionalFilters) {
    if (!additionalFilters[property] || (typeof additionalFilters[property] === 'object' && additionalFilters.length === 0)) {
      delete additionalFilters[property]
    }
  }

  const data = (await searchMarketplace(search, filters, page, additionalFilters)).data
  const marketplaceFilters = (await getMarketplaceFilters()).data

  if (additionalFilters.roles) {
    additionalFilters.roles = (additionalFilters.roles ?? []).join(',')
  }

  return {
    data,
    marketplaceFilters,
    pageData: {
      page,
      search,
      filters,
      additionalFilters
    }
  }
}

export { getSSRData }
