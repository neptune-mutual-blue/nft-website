import { bridgeConfig } from '@/config/bridge'
import { ContractAddresses } from '@/config/contracts'

const { AppConstants } = require('@/constants/AppConstants')
const { chains } = require('@/lib/connect-wallet/utils/switch-network')

const getExplorerLinkForToken = (tokenId, chainId) => {
  if (!chainId) { return '' }

  const chain = chains[chainId]

  let neptuneLegendsAddress = ContractAddresses?.NEPTUNE_LEGENDS

  if (chainId in bridgeConfig) {
    neptuneLegendsAddress = bridgeConfig[chainId].neptuneLegends || bridgeConfig[chainId].lzONft721
  }

  return `${chain.blockExplorerUrls[0]}/token/${neptuneLegendsAddress}?a=${tokenId}`
}

const EXPLORER_LINK_NFT_CONTRACT = `${chains[AppConstants.NETWORK].blockExplorerUrls[0]}/token/${ContractAddresses?.NEPTUNE_LEGENDS}#code`

export { EXPLORER_LINK_NFT_CONTRACT, getExplorerLinkForToken }
