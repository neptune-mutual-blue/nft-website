import { SafeAppConnector } from './package'

export const getConnector = (chainId = AppConstants.NETWORK) => {
  return new SafeAppConnector({supportedChainIds: [chainId]})
}
