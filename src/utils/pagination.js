const EDGE_COUNT = 1
const MIDDLE_COUNT = 5

const getMiddlePages = (currentPage, count) => {
  const pages = [currentPage]

  for (let i = 1; i <= Math.floor(count / 2); i++) {
    pages.push(currentPage + i)
    pages.unshift(currentPage - i)
  }

  return pages
}

const getPreviousPage = (currentPage, totalPages) => {
  if (currentPage <= 1) return undefined

  if (currentPage > totalPages) return totalPages

  return currentPage - 1
}

const getNextPage = (currentPage, totalPages) => {
  if (currentPage >= totalPages) return undefined

  if (currentPage < 1) return 1

  return currentPage + 1
}

const getPagination = (totalPages, currentPage) => {
  if (totalPages === null || totalPages === undefined) {
    return {
      previous: undefined,
      pages: undefined,
      next: undefined
    }
  }

  if (currentPage === null || currentPage === undefined) {
    currentPage = 1
  }

  /**
   * @warning: although the types were said to be a number in the above line,
   * Typescript doesn't enforce this. Numbers passed as an Astro prop are
   * silently boxed as string.
   */
  totalPages = +totalPages
  currentPage = +currentPage
  /**
   * Don't change the above lines
   */

  const previous = getPreviousPage(currentPage, totalPages)
  const next = getNextPage(currentPage, totalPages)

  const allPagesArray = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1)

  if (allPagesArray.length <= (2 * EDGE_COUNT)) {
    return { previous, pages: allPagesArray, next }
  }

  const firstSlice = allPagesArray.slice(0, EDGE_COUNT)
  const lastSlice = allPagesArray.slice(-EDGE_COUNT)
  const middleSlice = getMiddlePages(currentPage, MIDDLE_COUNT)

  const set = new Set([...firstSlice, ...middleSlice, ...lastSlice])
  const uniquePagesArray = Array.from(set).sort((a, b) => a - b)

  const pages = uniquePagesArray.reduce(
    (acc, curr) => {
      if (allPagesArray.includes(curr)) {
        const prevItem = acc.at(-1)
        if (typeof prevItem === 'number' && curr - prevItem > 1) acc.push(null)
        acc.push(curr)
      }
      return acc
    },
    []
  )

  return { previous, pages, next }
}

export { getPagination }
