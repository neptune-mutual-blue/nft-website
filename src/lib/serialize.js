import { toXML } from './jstoxml.js'

const serialize = async (urls) => {
  const sitemap = {
    urlset: []
  }

  for (const url of urls) {
    sitemap.urlset.push({ url })
  }

  const xml = toXML(sitemap, {
    header: true
  })

  return xml.replace('urlset', 'urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
}

export { serialize }
