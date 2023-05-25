const { AppConstants } = require('@/constants/AppConstants')

const origin = AppConstants.npmApiBaseURL

export const getActivePolicies = async (chainId, address) => {
  const response = await fetch(origin + '/policy/active/' + chainId + '/' + address.toLowerCase())

  const data = await response.json()

  return data
}

const NpmApi = {
  getActivePolicies

}

export { NpmApi }
