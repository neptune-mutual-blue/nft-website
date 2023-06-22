import { AppConstants } from '@/constants/AppConstants'

export const rpcUrls = {
  84531: ['https://goerli.base.org'],
  56: [
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
  ],
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