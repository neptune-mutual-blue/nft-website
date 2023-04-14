const getFullUrl = (url, trailingSlash) => {
  const hasTrailingSlash = url.endsWith('/')

  if (trailingSlash && !hasTrailingSlash) {
    return `${url}/`
  }

  if (!trailingSlash && hasTrailingSlash) {
    return url.slice(0, -1)
  }

  return url
}

export { getFullUrl }
