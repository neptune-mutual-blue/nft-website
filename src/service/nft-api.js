import { AppConstants } from '@/constants/AppConstants'

const origin = AppConstants.nftApiBaseURL

const knowTheCharacters = async () => {
  const response = await fetch(origin + '/home/' + AppConstants.NETWORK + '/know-the-characters')

  const data = await response.json()

  return data
}

const mostViewedNfts = async () => {
  const response = await fetch(origin + '/home/' + AppConstants.NETWORK + '/most-viewed-nfts')

  const data = await response.json()

  return data
}

const premiumNfts = async () => {
  const response = await fetch(origin + '/home/' + AppConstants.NETWORK + '/premium-nfts')

  const data = await response.json()

  return data
}

const regularNfts = async () => {
  const response = await fetch(origin + '/home/' + AppConstants.NETWORK + '/regular-nfts')

  const data = await response.json()

  return data
}

const getNftDetails = async (tokenId) => {
  const response = await fetch(origin + '/marketplace/' + AppConstants.NETWORK + '/' + tokenId)

  const data = await response.json()

  return data
}

const logView = async (tokenId) => {
  const response = await fetch(origin + '/insights/' + AppConstants.NETWORK + '/log/view/' + tokenId, {
    method: 'POST'
  })

  const data = await response.json()

  return data
}

const logWantToMint = async (tokenId) => {
  const response = await fetch(origin + '/insights/' + AppConstants.NETWORK + '/log/want-to-mint/' + tokenId, {
    method: 'POST'
  })

  const data = await response.json()

  return data
}

const mintingLevels = async () => {
  const response = await fetch(origin + '/minting-levels/' + AppConstants.NETWORK + '/characters')

  const data = await response.json()

  return data
}

const mintingLevelsMilestone = async (address) => {
  const response = await fetch(origin + '/minting-levels/' + AppConstants.NETWORK + '/milestones/' + address.toLowerCase())

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
  mintingLevels,
  mintingLevelsMilestone
}

export { NftApi }
