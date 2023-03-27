const { searchMarketplace, getMarketplaceFilters } = require('@/services/marketplace-api')

const getSSRData = async (context) => {
  const { params, query } = context

  let page = 1
  if (params) {
    page = params.page && parseInt(params.page)
  }
  const search = query.search ?? ''
  const filters = query.filters ? JSON.parse(query.filters) : []

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
