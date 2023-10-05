import { AppConstants } from '@/constants/AppConstants'

export const rpcUrls = {
  84531: ['https://goerli.base.org'],
  80001: ['https://polygon-mumbai.gateway.tenderly.co'],
  56: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
  ],
  1: [
    'https://mainnet.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
  ]
}

export const chains = {
  84531: {
    chainId: `0x${(84531).toString(16)}`,
    chainName: 'Base Goerli',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    explorerIcon: "basescan",
    rpcUrls: rpcUrls[84531],
    explorerName: 'BaseScan Testnet',
    blockExplorerUrls: ['https://goerli.basescan.org']
  },
  80001: {
    chainId: `0x${(80001).toString(16)}`,
    chainName: 'Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    explorerIcon: "polygonscan",
    rpcUrls: rpcUrls[80001],
    explorerName: 'PolygonScan (Mumbai)',
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
  },
  56: {
    chainId: `0x${(56).toString(16)}`,
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    explorerIcon: "bscscan",
    rpcUrls: rpcUrls[56],
    explorerName: 'BscScan',
    blockExplorerUrls: ['https://bscscan.com']
  },
  1: {
    chainId: `0x${(1).toString(16)}`,
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    explorerIcon: "ethereum-round",
    rpcUrls: rpcUrls[1],
    explorerName: 'EtherScan',
    blockExplorerUrls: ['https://etherscan.io']
  }
}

export const addChain = async (provider) => {
  const networkId = AppConstants.NETWORK;

  if (!provider) {
    console.error("Can't setup network - injected provider not found")
    return false
  }

  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [chains[networkId]]
    })
    return true
  } catch (addError) {
    // handle "add" error
    console.error(addError)
  }
  return false
}

export const setupNetwork = async (provider) => {

  const networkId = AppConstants.NETWORK;

  if (!provider) {
    console.error("Can't setup network - injected provider not found")
    return false
  }

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${networkId.toString(16)}`}]
    })
    return true
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      return addChain(provider)
    }
    // handle other "switch" errors
    console.error(switchError)
  }

  return false
}