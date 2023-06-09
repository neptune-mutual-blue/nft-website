import { ContractAddresses } from '@/config/contracts'

const { AppConstants } = require('@/constants/AppConstants')
const { chains } = require('@/lib/connect-wallet/utils/switch-network')

const getExplorerLinkForToken = (tokenId) => {
  const chain = chains[AppConstants.NETWORK]

  return `${chain.blockExplorerUrls[0]}/token/${ContractAddresses?.NEPTUNE_LEGENDS}?a=${tokenId}`
}

const EXPLORER_LINK_NFT_CONTRACT = `${chains[AppConstants.NETWORK].blockExplorerUrls[0]}/token/${ContractAddresses?.NEPTUNE_LEGENDS}#code`

export { EXPLORER_LINK_NFT_CONTRACT, getExplorerLinkForToken }
