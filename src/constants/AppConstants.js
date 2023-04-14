import { getFullUrl } from '@/utils/get-full-url'

const AppConstants = {
  neptunemutualOrigin: 'https://neptunemutual.com',
  domainName: getFullUrl(process.env.NEXT_PUBLIC_DOMAIN_NAME ||
  'https://nft.neptunemutual.com', false),
  nftApiBaseURL: getFullUrl(process.env.NEXT_PUBLIC_NFT_API_ORIGIN || 'https://nft-api.neptunemutual.net', false),
  nftImageOrigin: getFullUrl(process.env.NEXT_PUBLIC_NFT_IMAGE_ORIGIN || 'https://nft.neptunemutual.net', false),
  FALLBACK_LIQUIDITY_TOKEN_DECIMALS: 6,
  NPM_TOKEN_DECIMALS: 18,
  NPM_TOKEN_SYMBOL: 'NPM',
  POD_TOKEN_SYMBOL: 'POD',
  FALLBACK_LIQUIDITY_TOKEN_SYMBOL: 'USD',
  PREFERRED_LOCALE: 'en-US'
}

export { AppConstants }
