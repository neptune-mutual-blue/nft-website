
const parseUrl = (url, validKeys) => {
  const searchParams = new URL(url, url.startsWith('http') ? undefined : 'http://localhost').searchParams

  const filters = []

  for (const [key, value] of searchParams.entries()) {
    // Validate Keys
    if (validKeys.includes(key)) {
      const filter = filters.find(filter => { return filter.key === key })

      if (filter) {
        filter.value.push(value)
        continue
      }

      filters.push({ key: key, value: [value] })
    }
  }

  return filters
}

const generateURL = (arr, urlPrefix) => {
  const searchParams = new URLSearchParams()

  arr.forEach(({ key, value }) => {
    if (!value) {
      return
    }

    value.forEach(val => {
      searchParams.append(key, val)
    })
  })

  const qs = searchParams.toString()

  return urlPrefix + (qs ? ('?' + qs) : '')
}

export { generateURL, parseUrl }
