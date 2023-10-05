const { AppConstants } = require('@/constants/AppConstants')
const { chains } = require('@/lib/connect-wallet/utils/switch-network')

const getExplorerAddressURL = (address, chainId = AppConstants.NETWORK) => {
  return `${chains[chainId].blockExplorerUrls[0]}/address/${address}`
}

export { getExplorerAddressURL }
