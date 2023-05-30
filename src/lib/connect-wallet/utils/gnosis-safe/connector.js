import { SUPPORTED_CHAINS } from '@/lib/connect-wallet/config/supported-chains'

import { SafeAppConnector } from './package'

export const getConnector = () => {
  return new SafeAppConnector({supportedChainIds: SUPPORTED_CHAINS})
}
