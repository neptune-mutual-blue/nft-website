import Web3 from 'web3'
import { POLLING_INTERVAL } from './config/connectors'

// Used if wallet is connected
export const getLibrary = (provider) => {
  const library = new Web3(provider)

  library.pollingInterval = POLLING_INTERVAL
  return library
}
