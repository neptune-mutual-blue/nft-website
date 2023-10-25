import { AppConstants } from '@/constants/AppConstants'

import { BscConnector } from './package'

export const getConnector = (chainId = AppConstants.NETWORK) => {
  return new BscConnector({ supportedChainIds: [chainId] })
}
