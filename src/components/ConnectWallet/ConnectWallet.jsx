import {
  useContext,
  useEffect,
  useState
} from 'react'

import { ConnectedDropdown } from '@/components/ConnectWallet/ConnectedDropdown'
import { Modal } from '@/components/Modal/Modal'
import { ThemeContext } from '@/contexts/ThemeContext'
import { Icon } from '@/elements/Icon'
import { wallets } from '@/lib/connect-wallet/config/wallets'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import {
  UnsupportedChainIdError,
  useWeb3React
} from '@web3-react/core'

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

  const { dark } = useContext(ThemeContext)

  const [connectorName, setConnectorName] = useState('')

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    setConnectorName(wallet.name)

    try {
      login(connectorName, (error) => {
        if (error instanceof UnsupportedChainIdError) {
          setPopupOpen(false)
        }
      })
    } catch (err) {
      setPopupOpen(false)
    }
  }

  return active
    ? <ConnectedDropdown />
    : (
      <Modal
        title={isConnecting
          ? undefined
          : (
            <>
              <div className='wallet icon'>
                <Icon variant='wallet-04' size='xl' />
              </div>
              Connect Wallet
            </>
            )}
        visible={popupOpen} setVisible={setPopupOpen}
        trigger={
          <Button onClick={handleWalletButtonClick} iconLeading='wallet-04' size='md'>Connect Wallet</Button>
    }
        description={isConnecting
          ? undefined
          : <>By connecting a wallet, you agree to Neptune Mutual <a target='_blank' href={'https://neptunemutual.com/policies/standard-terms-and-conditions/?theme=' + (dark ? 'dark' : 'light')}>Terms & Conditions</a> and acknowledge that you have read and understand the Neptune Mutual <a target='_blank' href={'https://neptunemutual.com/docs/usage/disclaimer/?theme=' + (dark ? 'dark' : 'light')}>Protocol Disclaimer</a>.</>}
        className='connect wallet modal'
        cross
      >
        {isConnecting && (
          <div className='connecting wallet'>
            <div className='connecting icon'>
              <svg width='52' height='52' viewBox='0 0 52 52' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='18' y='18' width='16' height='16' rx='8' stroke='#A4BCFD' strokeWidth='4' />
                <rect x='2' y='2' width='48' height='48' rx='24' stroke='#EEF4FF' strokeWidth='4' />
              </svg>
            </div>
            <div className='connector name'>Connecting Your {connectorName} Wallet</div>
            <div className='connecting description'>Please don’t close or reload this screen while your wallet is connecting.</div>
          </div>
        )}
        {!isConnecting && (
          <>
            {wallets.map(wallet => wallet.isAvailable() || !wallet.downloadURL
              ? (
                <Button key={wallet.id} variant='secondary-gray' size='lg' onClick={() => onConnect(wallet.id)} disabled={isConnecting}>
                  <span className='light only'><Icon variant={wallet.iconVariant} size='sm' /></span>
                  <span className='dark only'><Icon variant={wallet.iconVariantDark} size='sm' /></span>
                  {wallet.name}
                </Button>
                )
              : (
                <a
                  key={wallet.id} href={wallet.downloadURL()}
                  target='_blank'
                  rel='noreferrer noopener nofollow'
                >
                  <Button key={wallet.id} variant='secondary-gray' size='lg' disabled={isConnecting}>
                    <span className='light only'><Icon variant={wallet.iconVariant} size='sm' /></span>
                    <span className='dark only'><Icon variant={wallet.iconVariantDark} size='sm' /></span>
                    Install {wallet.name}
                  </Button>
                </a>
                ))}
          </>
        )}
      </Modal>

      )
}

export { ConnectWallet }
