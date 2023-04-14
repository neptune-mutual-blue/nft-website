import { AppConstants } from '@/constants/AppConstants'

const origin = AppConstants.nftApiBaseURL

const knowTheCharacters = async () => {
  const response = await fetch(origin + '/home/know-the-characters')

  const data = await response.json()

  return data
}

const mostViewedNfts = async () => {
  const response = await fetch(origin + '/home/most-viewed-nfts')

  const data = await response.json()

  return data
}

const premiumNfts = async () => {
  const response = await fetch(origin + '/home/premium-nfts')

  const data = await response.json()

  return data
}

const regularNfts = async () => {
  const response = await fetch(origin + '/home/regular-nfts')

  const data = await response.json()

  return data
}

const getNftDetails = async (tokenId) => {
  const response = await fetch(origin + '/marketplace/' + tokenId)

  const data = await response.json()

  return data
}

const logView = async (tokenId) => {
  const response = await fetch(origin + '/insights/log/view/' + tokenId, {
    method: 'POST'
  })

  const data = await response.json()

  return data
}

const logWantToMint = async (tokenId) => {
  const response = await fetch(origin + '/insights/log/want-to-mint/' + tokenId, {
    method: 'POST'
  })

  const data = await response.json()

  return data
}

const mintingLevels = async () => {
  const response = await fetch(origin + '/minting-levels/characters')

  const data = await response.json()

  return data
}

const NftApi = {
  knowTheCharacters,
  mostViewedNfts,
  premiumNfts,
  regularNfts,
  getNftDetails,
  logView,
  logWantToMint,
  mintingLevels
}

export { NftApi }
