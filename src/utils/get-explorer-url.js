const { AppConstants } = require('@/constants/AppConstants')
const { chains } = require('@/lib/connect-wallet/utils/switch-network')

const getExplorerAddressURL = (address) => {
  return `${chains[AppConstants.NETWORK].blockExplorerUrls[0]}/address/${address}`
}

export { getExplorerAddressURL }
