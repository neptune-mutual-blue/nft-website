import { ConnectedDropdown } from '@/components/ConnectWallet/ConnectedDropdown'
import { Modal } from '@/components/Modal/Modal'
import { Icon } from '@/elements/Icon'
import { wallets } from '@/lib/connect-wallet/config/wallets'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

const { Button } = require('@/components/Button/Button')

const ConnectWallet = () => {
  const [popupOpen, setPopupOpen] = useState(false)

  const { login, logout } = useAuth()

  const [isConnecting, setIsConnecting] = useState(false)

  const { active } = useWeb3React()

  const handleWalletButtonClick = () => {
    logout()
  }

  useEffect(() => {
    if (!popupOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      setPopupOpen(false)
    }
  }, [popupOpen, active, setPopupOpen])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName)
  }

  return active
    ? <ConnectedDropdown />
    : (
      <Modal
        title={
          <>
            <div className='wallet icon'>
              <Icon variant='wallet-04' size='xl' />
            </div>
            Connect Wallet
          </>
        }
        visible={popupOpen} setVisible={setPopupOpen}
        trigger={
          <Button onClick={handleWalletButtonClick}>Connect Wallet</Button>
    }
        description={
          <>By connecting a wallet, you agree to Neptune Mutual <a href=''>Terms & Conditions</a> and acknowledge that you have read and understand the Neptune Mutual Protocol Disclaimer.</>
    }
        className='connect wallet modal'
        cross
      >
        {wallets.map(wallet => (
          <Button key={wallet.id} variant='secondary-gray' size='lg' onClick={() => onConnect(wallet.id)} disabled={isConnecting}>
            <span className='light only'><Icon variant={wallet.iconVariant} size='sm' /></span>
            <span className='dark only'><Icon variant={wallet.iconVariantDark} size='sm' /></span>
            Open {wallet.name}
          </Button>
        ))}
      </Modal>

      )
}

export { ConnectWallet }
