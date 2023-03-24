import { InjectedConnector } from '@web3-react/injected-connector'

export const getConnector = () => {
  return new InjectedConnector()
}
