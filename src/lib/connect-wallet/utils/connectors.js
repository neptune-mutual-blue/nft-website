import { AppConstants } from '@/constants/AppConstants'

import { ConnectorNames } from '../config/connectors'

/**
 * Asynchronously load the selected connector only
 *
 * @param {string} name
 */
export const getConnectorByName = async (name, chainId = AppConstants.NETWORK) => {
  switch (name) {
    case ConnectorNames.Injected: {
      const c = await import('./injected/connector')

      return c.getConnector(chainId)
    }

    case ConnectorNames.OKXWallet: {
      const c = await import('./okx-wallet/connector')

      return c.getConnector(chainId)
    }

    // case ConnectorNames.BSC: {
    //   const c = await import('./binance-wallet/connector')

    //   return c.getConnector()
    // }

    case ConnectorNames.Gnosis: {
      const c = await import('./gnosis-safe/connector')

      return c.getConnector(chainId)
    }

    case ConnectorNames.CoinbaseWallet: {
      const c = await import('./coinbase-wallet/connector')

      return c.getConnector(chainId)
    }

    case ConnectorNames.BinanceWallet: {
      const c = await import('./binance-wallet/connector')

      return c.getConnector(chainId)
    }

    default:
      return null
  }
}
