/*
Caution:
  Use type: "module" inside of package.json before executing this file.
  Remove the type after building the sitemap.

Sitemap can be build ahead of time for NFT portal.
*/

import fs from 'fs/promises'

import { serialize } from './src/lib/serialize.js'
import { NftApi } from './src/service/nft-api.js'

const domainName = process.env.NEXT_PUBLIC_DOMAIN_NAME ||
'https://nft.neptunemutual.com'

const urls = [
  {
    loc: domainName + '/'
  },
  {
    loc: domainName + '/marketplace/'
  },
  {
    loc: domainName + '/marketplace/minting-levels/'
  }
]

const main = async () => {
  const response = await NftApi.knowTheCharacters()

  for (const character of response.data) {
    for (let i = 0; i < character.siblings; i++) {
      urls.push({
        loc: domainName + `/marketplace/${(character.startIndex + i + 1)}/`
      }, {
        loc: domainName + `/marketplace/mint/${(character.startIndex + i + 1)}/`
      })
    }
  }

  const content = await serialize(urls)

  await fs.writeFile('public/sitemap.xml', content)
}

main()
