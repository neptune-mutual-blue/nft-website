import { load } from 'cheerio'

const truncate = (text, limit) => {
  if (text.length <= limit) {
    return text
  }

  const end = text.lastIndexOf(' ', limit)
  const truncated = text.substring(0, end === -1 ? limit : end)

  return `${truncated} ...`
}

const toText = (html, limit) => {
  if (typeof window === 'undefined') return ''
  const $ = load(html, null, false)
  const text = $.text()

  return truncate(text, limit)
}

export { toText }
