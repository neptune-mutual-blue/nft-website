import { SUPPORTED_CHAINS } from '@/lib/connect-wallet/config/supported-chains'
import { InjectedConnector } from '@web3-react/injected-connector'

export const getConnector = () => {
  return new InjectedConnector({supportedChainIds: SUPPORTED_CHAINS})
}
