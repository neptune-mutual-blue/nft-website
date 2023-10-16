const { default: filteredProperties } = require('@/constants/marketplace-filters')

const getAllFamilies = (data) => {
  return Array.from(new Set(data.map(({ family }) => { return (family) }).filter(Boolean)))
}

const getAllLevels = (data) => {
  return Array.from(new Set(data.map(({ level }) => { return (level ? level.toString() : null) }).filter(Boolean)))
}

const getFiltersByLevelAndFamily = (level, family) => {
  if (!family && !level) { return { properties: [], levels: getAllLevels(filteredProperties), families: getAllFamilies(filteredProperties) } }

  const matchedItems = filteredProperties.filter(item => {
    if (family && level) { return family.toLowerCase() === item.family.toLowerCase() && (level && item.level ? level.toString() === item.level.toString() : level === item.level) }

    if (family) { return family.toLowerCase() === item.family.toLowerCase() }

    return level && item.level ? level.toString() === item.level.toString() : level === item.level
  })

  const levels = getAllLevels(matchedItems)
  const families = getAllFamilies(matchedItems)

  if (!family) { return { properties: [], levels, families } }

  const properties = []
  matchedItems.map(item => {
    item.layersOrder.map(({ name, options }) => {
      const keyIndex = properties.findIndex(p => { return p.key === name })
      if (keyIndex >= 0) {
        properties[keyIndex].values.push(...options)
      } else {
        properties.push({
          key: name,
          values: options
        })
      }
      return null
    })
    return null
  })

  return {
    levels,
    families,
    properties
  }
}

export { getFiltersByLevelAndFamily }
