import { getFullUrl } from '@/utils/get-full-url'

const AppConstants = {
  neptunemutualOrigin: 'https://neptunemutual.com',
  domainName: getFullUrl(process.env.NEXT_PUBLIC_DOMAIN_NAME ||
  'https://nft.neptunemutual.com', false),
  nftApiBaseURL: getFullUrl(process.env.NEXT_PUBLIC_NFT_API_ORIGIN || 'https://nft-api.neptunemutual.net', false),
  npmApiBaseURL: getFullUrl(process.env.NEXT_PUBLIC_NPM_API_ORIGIN || 'https://api2.neptunemutual.net', false),
  nftImageOrigin: getFullUrl(process.env.NEXT_PUBLIC_NFT_IMAGE_ORIGIN || 'https://nft.neptunemutual.net', false),
  FALLBACK_LIQUIDITY_TOKEN_DECIMALS: 6,
  ADDRESS_ZERO: '0x0000000000000000000000000000000000000000',
  NPM_TOKEN_DECIMALS: 18,
  SITEID: process.env.NEXT_PUBLIC_SITEID || '',
  NPM_TOKEN_SYMBOL: 'NPM',
  POD_TOKEN_SYMBOL: 'POD',
  FALLBACK_LIQUIDITY_TOKEN_SYMBOL: 'USD',
  PREFERRED_LOCALE: 'en-US',
  NETWORK: parseInt(process.env.NEXT_PUBLIC_FALLBACK_NETWORK || '80001'),
  LIQUIDITY_POINTS_PER_DOLLAR: 0.0375,
  POLICY_POINTS_PER_DOLLAR: 0.00625,
  DEFAULT_GAS_LIMIT: '6000000',
  LZ_DEFAULT_ADAPTER_PARAMS: '0x00010000000000000000000000000000000000000000000000000000000000030d40'
}

export { AppConstants }
