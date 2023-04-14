/*
Caution:
  Use type: "module" inside of package.json before executing this file.
  Remove the type after building the sitemap.

Sitemap can be build ahead of time for NFT portal.
*/

import fs from 'fs/promises'

import { AppConstants } from '@/constants/AppConstants.js'
import { getFullUrl } from '@/utils/get-full-url.js'

import { serialize } from './src/lib/serialize.js'
import { NftApi } from './src/service/nft-api.js'

const domainName = AppConstants.domainName

const urls = [
  {
    loc: getFullUrl(domainName, false)
  },
  {
    loc: getFullUrl(domainName + '/marketplace', false)
  },
  {
    loc: getFullUrl(domainName + '/marketplace/minting-levels', false)
  }
]

const main = async () => {
  const response = await NftApi.knowTheCharacters()

  for (const character of response.data) {
    for (let i = 0; i < character.siblings; i++) {
      urls.push({
        loc: getFullUrl(domainName + `/marketplace/${(character.startIndex + i + 1)}`, false)
      }, {
        loc: getFullUrl(domainName + `/marketplace/mint/${(character.startIndex + i + 1)}`, false)
      })
    }
  }

  const content = await serialize(urls)

  await fs.writeFile('public/sitemap.xml', content)
}

main()
