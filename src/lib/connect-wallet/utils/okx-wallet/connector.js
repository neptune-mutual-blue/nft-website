import { InjectedConnector } from './package'

export const getConnector = (chainId = AppConstants.NETWORK) => {
  return new InjectedConnector({supportedChainIds: [chainId]})
}
