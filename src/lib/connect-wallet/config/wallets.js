import { ConnectorNames } from './connectors'

export const wallets = [
  {
    id: '1',
    name: 'MetaMask',
    connectorName: ConnectorNames.Injected,
    iconVariant: 'metamask',
    iconVariantDark: 'metamask'
  },
  {
    id: '2',
    name: 'Coinbase Wallet',
    connectorName: ConnectorNames.CoinbaseWallet,
    iconVariant: 'coinbase',
    iconVariantDark: 'coinbase'
  },
  {
    id: '3',
    name: 'OKX Wallet',
    connectorName: ConnectorNames.OKXWallet,
    iconVariant: 'okx-wallet',
    iconVariantDark: 'okx-wallet-dark'
  },
  {
    id: '4',
    name: 'Gnosis Safe Wallet',
    connectorName: ConnectorNames.Gnosis,
    iconVariant: 'gnosis-wallet',
    iconVariantDark: 'gnosis-wallet-dark'
  }

]
