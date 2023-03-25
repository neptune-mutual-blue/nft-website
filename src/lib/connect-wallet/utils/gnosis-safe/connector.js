import { SafeAppConnector } from './package'

export const getConnector = () => {
  return new SafeAppConnector()
}
