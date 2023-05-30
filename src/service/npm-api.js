const { AppConstants } = require('@/constants/AppConstants')

const origin = AppConstants.npmApiBaseURL
// const origin = 'http://localhost:8888'

export const getActivePolicies = async (chainId, address) => {
  const response = await fetch(origin + '/policy/active/' + chainId + '/' + address.toLowerCase())

  const data = await response.json()

  return data
}

export const uploadMerkleDataIpfs = async (body) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', siteId: AppConstants.SITEID },
    body: JSON.stringify(body)
  }

  const response = await fetch(origin + '/ipfs/merkle-info', requestOptions)

  const data = await response.json()

  return data
}

const NpmApi = {
  getActivePolicies,
  uploadMerkleDataIpfs
}

export { NpmApi }
