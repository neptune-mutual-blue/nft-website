import filteredProperties from '@/constants/marketplace-filters'
import {
  capitalizeFirstLetter,
  decapitalizeFirstLetter
} from '@/utils/string'
import { parseUrl } from '@/utils/url-helpers'

const { searchMarketplace, getMarketplaceFilters } = require('@/services/marketplace-api')

const SUPPORTED_ROLES = ['Beast', 'Guardian', 'Neptune']
const BOOLEAN_STRINGS = ['true', 'false']
const NON_FILTER_KEYS = ['search', 'minted', 'soulbound', 'roles']

const schema = {
  search: {},
  minted: {
    validator: (value) => { return BOOLEAN_STRINGS.includes(value) },
    transformer: (value) => { return value === 'true' }
  },
  soulbound: {
    validator: (value) => { return BOOLEAN_STRINGS.includes(value) },
    transformer: (value) => { return value === 'true' }
  },
  roles: {
    multiple: true,
    validator: (value) => { return SUPPORTED_ROLES.includes(value) }
  },
  level: {
    validator: (value) => { return value >= 1 && value <= 7 }
  },
  family: {
    validator: () => { return true }
  },
  ...(
    filteredProperties.map((x) => { return x.layersOrder }).flat().map((layer) => {
      return {
        [decapitalizeFirstLetter(layer.name)]: {
          validator: (value) => { return layer.options.includes(value) }
        }
      }
    }).reduce((acc, val) => {
      return { ...acc, ...val }
    }, {})
  )
}

const validKeys = Object.keys(schema)

const validateAndGetValue = (result, key, fallback, val) => {
  const keySchema = schema[key]

  if (!keySchema) { return fallback }

  let value = val || result.find((item) => { return item.key === key })?.value

  const validator = keySchema.validator
  const transformer = keySchema.transformer

  if (validator) {
    value = value?.filter(validator)
  }

  if (transformer) {
    value = value?.map(transformer)
  }

  const hasMultiple = keySchema.multiple

  if (!hasMultiple) {
    value = value?.[0]
  }

  if (hasMultiple && value?.length === 0) {
    return fallback
  }

  return value ?? fallback
}

const getSSRData = async (context) => {
  const { params, resolvedUrl } = context

  const parsedResult = parseUrl(resolvedUrl, validKeys)

  let page = 1
  if (params) {
    page = params.page && parseInt(params.page)
  }

  const search = validateAndGetValue(parsedResult, 'search', '')

  const minted = validateAndGetValue(parsedResult, 'minted')
  const soulbound = validateAndGetValue(parsedResult, 'soulbound')
  const roles = validateAndGetValue(parsedResult, 'roles')

  const filters = []

  for (const { key, value } of parsedResult) {
    if (!NON_FILTER_KEYS.includes(key)) {
      const val = validateAndGetValue(parsedResult, key, undefined, value)
      if (!val) {
        continue
      }

      filters.push({ key: capitalizeFirstLetter(key), value: val })
    }
  }

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
    if (additionalFilters[property] === undefined || (typeof additionalFilters[property] === 'object' && additionalFilters.length === 0)) {
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
