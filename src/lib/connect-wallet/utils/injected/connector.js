import { AppConstants } from '@/constants/AppConstants'
import { InjectedConnector } from '@web3-react/injected-connector'

export const getConnector = (chainId = AppConstants.NETWORK) => {
  return new InjectedConnector({supportedChainIds: [chainId]})
}
