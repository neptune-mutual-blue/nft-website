
const parseUrl = (url, validKeys) => {
  const searchParams = new URL(url, url.startsWith('http') ? undefined : 'http://localhost').searchParams

  const filters = []

  for (const [key, value] of searchParams.entries()) {
    // Validate Keys
    if (validKeys.includes(key)) {
      const values = value.split(',')

      // considering the first encounter of key as the desired one
      if (values.length > 0 && !filters.find(filter => { return filter.key === key })) {
        filters.push({ key: key, value: values })
      }
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

    const joinedValue = value.join(',')

    if (!joinedValue) {
      return
    }

    searchParams.append(key, value.join(','))
  })

  const qs = searchParams.toString()

  return urlPrefix + (qs ? ('?' + qs) : '')
}

export { generateURL, parseUrl }
