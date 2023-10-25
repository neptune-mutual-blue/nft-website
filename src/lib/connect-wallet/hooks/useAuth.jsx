import {
  useCallback,
  useContext,
  useEffect
} from 'react'

import { ToastContext } from '@/components/Toast/Toast'
import { LocalStorageKeys } from '@/config/localstorage'
import { getProviderByName } from '@/lib/connect-wallet/utils/providers'
import {
  chains,
  setupNetwork
} from '@/lib/connect-wallet/utils/switch-network'
import {
  UnsupportedChainIdError,
  useWeb3React
} from '@web3-react/core'

import { getConnectorByName } from '../utils/connectors'

const activateConnector = async (
  connectorName,
  chainId,
  activate,
  notify,
  errorCallback 
) => {
  const connector = await getConnectorByName(connectorName, chainId)

  if (!connector) {
    console.info('Invalid Connector Name', connectorName)
    return
  }

  try {
    activate(connector, async (error) => {
      notify(error)

      if (error instanceof UnsupportedChainIdError) {
        errorCallback(error)
      }
      
      localStorage.removeItem(LocalStorageKeys.CONNECTOR_NAME)
    })
  } catch(err){
  throw error
  }

}

const useAuth = (notify = console.log) => {
  const { activate, deactivate, connector, library } = useWeb3React()

  useEffect(() => {
    if (!connector) {
      return
    }

    connector?.addListener('Web3ReactDeactivate', connector => console.log({ connector }))
    return () => {
      connector?.removeListener('Web3ReactDeactivate', connector => console.log({ connector }))
    }
  }, [connector])

  const {showToast} = useContext(ToastContext);

  const login = useCallback(
    (connectorName, chainId, errorCallback = () => {}) => {
      activateConnector(connectorName, chainId, activate, notify, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          logout();
          try {
             const accepted = await setupNetwork(getProviderByName(connectorName), chainId)

             if (accepted) {
              login(connectorName, chainId)
             } else {
              showToast({
                title: "Unsupported Network", 
                 description: `Please switch to ${chains[chainId].chainName} in your wallet.`
              });
             }
          } catch(err){
            console.err("SWITCH NETWORK NOT SUPPORTED")
            console.error(err)
          }
        }
        errorCallback(error);
      })
      localStorage.setItem(LocalStorageKeys.CONNECTOR_NAME, connectorName)
    },
    [activate, notify]
  )

  const logout = useCallback(() => {
    deactivate()
    localStorage.removeItem(LocalStorageKeys.CONNECTOR_NAME)
  }, [deactivate])

  return { logout, login }
}

export default useAuth
