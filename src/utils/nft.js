const truncateAddress = (address) => {
  if (address.length !== 42) return 'INVALID_ADDRESS'

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
  )

  if (match === null) return address

  return `${match[1]}…${match[2]}`
}

const aggregateFiltersData = (data) => {
  let finalArray = []

  finalArray = data.reduce((acc, curr) => {
    const foundIndex = acc.findIndex(i => { return i.key === curr.key })
    if (foundIndex > -1) {
      const found = acc[foundIndex]
      if (Array.isArray(found.values)) found.values.push(curr.value)
      else found.values = [curr.value]
      acc[foundIndex] = found
      return acc
    }

    acc.push({ key: curr.key, values: [curr.value] })
    return acc
  }, finalArray)

  const sorted = finalArray.map(item => {
    const values = item.values
    const sortedValues = values.sort((a, b) => {
      if (!Number.isNaN(Number(a))) return Number(a) - Number(b)
      if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b)
      return 0
    })
    return {
      key: item.key,
      values: sortedValues
    }
  })

  return sorted
}

const getMarketplaceFiltersHref = (nft) => {
  const { name, level } = nft

  const data = [{
    key: 'Family',
    value: name.replace(/(Diabolic|Epic|Legendary)\s/, '')
  }]

  if (level && level < 7) {
    data.push({
      key: 'Type',
      value: level % 2 === 0 ? 'Evolution' : 'Selection'
    })
  }

  return getMarketplaceUrl(1, '', data) + '#view-nfts'
}

// Capitalize first letter of a string
function capitalizeFirstLetter (str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Decapitalize first letter of a string
function decapitalizeFirstLetter (str) {
  if (!str) return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const getFiltersFromQueryString = (query) => {
  const searchParams = new URLSearchParams(query)

  const filters = []

  for (const [key, value] of searchParams.entries()) {
    if (key !== 'search') {
      filters.push({ key: capitalizeFirstLetter(key), value })
    }
  }

  return filters
}

const getMarketplaceUrl = (_page, _search, _filters) => {
  let url = '/marketplace'

  if (_page !== 1) url += `/page/${_page}`

  const searchParams = new URLSearchParams()

  if (_search) {
    searchParams.append('search', _search)
  }

  for (const filter of _filters) {
    searchParams.append(decapitalizeFirstLetter(filter.key), filter.value)
  }

  return url + (Array.from(searchParams.keys()).length > 0 ? '?' + searchParams : '')
}

export {
  truncateAddress,
  aggregateFiltersData,
  getMarketplaceFiltersHref,
  getMarketplaceUrl,
  getFiltersFromQueryString
}
