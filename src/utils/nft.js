import { generateURL } from '@/utils/url-helpers'

const truncateAddress = (address) => {
  if (address.length !== 42) { return 'INVALID_ADDRESS' }

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
  )

  if (match === null) { return address }

  return `${match[1]}…${match[2]}`
}

const aggregateFiltersData = (data) => {
  let finalArray = []

  finalArray = data.reduce((acc, curr) => {
    const foundIndex = acc.findIndex(i => { return i.key === curr.key })
    if (foundIndex > -1) {
      const found = acc[foundIndex]
      if (Array.isArray(found.values)) { found.values.push(curr.value) } else { found.values = [curr.value] }
      acc[foundIndex] = found
      return acc
    }

    acc.push({ key: curr.key, values: [curr.value] })
    return acc
  }, finalArray)

  const sorted = finalArray.map(item => {
    const values = item.values
    const sortedValues = values.sort((a, b) => {
      if (!Number.isNaN(Number(a))) { return Number(a) - Number(b) }
      if (typeof a === 'string' && typeof b === 'string') { return a.localeCompare(b) }
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
    key: 'family',
    value: [name.replace(/(Diabolic|Epic|Legendary)\s/, '')]
  }]

  if (level && level < 7) {
    data.push({
      key: 'type',
      value: [level % 2 === 0 ? 'Evolution' : 'Selection']
    })
  }

  return getMarketplaceUrl(1, data) + '#view-nfts'
}

const getMarketplaceUrl = (_page, parameterArray) => {
  let urlPrefix = '/marketplace'

  if (_page !== 1) { urlPrefix += `/page/${_page}` }

  return generateURL(parameterArray, urlPrefix)
}

export {
  aggregateFiltersData,
  getMarketplaceFiltersHref,
  getMarketplaceUrl,
  truncateAddress
}
