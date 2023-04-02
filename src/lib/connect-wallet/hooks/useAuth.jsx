import { LocalStorageKeys } from '@/config/localstorage'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'
import { getConnectorByName } from '../utils/connectors'

const activateConnector = async (
  connectorName,
  activate,
  notify
) => {
  const connector = await getConnectorByName(connectorName)

  if (!connector) {
    console.info('Invalid Connector Name', connectorName)
    return
  }

  activate(connector, async (error) => {
    notify(error)
  })
}

const useAuth = (notify = console.log) => {
  const { activate, deactivate, connector } = useWeb3React()

  useEffect(() => {
    if (!connector) {
      return
    }

    connector?.addListener('Web3ReactDeactivate', connector => console.log({ connector }))
    return () => {
      connector?.removeListener('Web3ReactDeactivate', connector => console.log({ connector }))
    }
  }, [connector])

  const login = useCallback(
    (connectorName) => {
      activateConnector(connectorName, activate, notify)
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
