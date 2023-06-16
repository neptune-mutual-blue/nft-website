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

const getMerkleTree = async (live = false) => {
  const response = await fetch(origin + '/merkle/' + AppConstants.NETWORK + '/tree' + (live ? '/live' : ''))

  const data = await response.json()

  return data
}

const getMerkleLeaf = async (account, live = false) => {
  const response = await fetch(origin + '/merkle/' + AppConstants.NETWORK + '/tree/' + (live ? 'live/' : '') + account)

  const data = await response.json()

  return data
}

const setMerkleProof = async (body) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  const response = await fetch(origin + '/merkle/' + AppConstants.NETWORK + '/proof', requestOptions)

  if (!response.ok) {
    throw new Error('Bad Response')
  }

  const data = await response.json()

  return data
}

const getUserInfoFromApi = async (account) => {
  const { nftApiBaseURL, NETWORK } = AppConstants
  const url = `${nftApiBaseURL}/marketplace/${NETWORK}/account/info/${account}`
  try {
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    if (data.data) { return data.data[0] }
  } catch (error) {
    console.error(`Error in getting user info for ${account}:`, error)
  }
}

const getPersona = async (account) => {
  const { nftApiBaseURL, NETWORK } = AppConstants
  const url = `${nftApiBaseURL}/marketplace/${NETWORK}/account/persona/${account}`
  try {
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    if (data.data) { return data.data }
  } catch (error) {
    console.error(`Error in getting user persona for ${account}:`, error)
  }
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
  mintingLevelsMilestone,
  getMerkleTree,
  setMerkleProof,
  getMerkleLeaf,
  getUserInfoFromApi,
  getPersona
}

export { NftApi }
