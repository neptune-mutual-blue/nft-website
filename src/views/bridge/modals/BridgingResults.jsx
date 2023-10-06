import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { Modal } from '@/components/Modal/Modal'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import { getDateInFormat } from '@/utils/date'
import Link from 'next/link'

const mock = {
  receiptNo: '001',
  timestamp: 1696407710592,
  nftTitle: 'Diabolic Merman Serpent #141001',
  tokenId: '141001',
  depChain: 'ETH',
  destChain: 'BSC',
  depAddress: '0x8JDAE5a084EC18558J78e98J38d1A67c79F6C8J6',
  destAddress: '0x8R4AEga0A4EC1AgkAJ7Ae9AJ3Ad1A67c79F6CAJ6',
  depHash: '0x0Edbd64c91409ad3Bb413Ab3DF7fcd786',
  destHash: '0x63ef5603e38996de2d810aaf1193ef19168ca2807a4f8557568653772740235b',
  txHash: '0x8dbc9d96f7ade6e5afb1d912056245f08c24d8995dc313a2da570416f27afd06',
  nfts: [
    'Diabolic Merman Serpent #141001',
    'Sabersquatch #153771',
    'Epic Aquavallo #145216'
  ],
  fees: '0.0015 ETH'
}

const KeyVal = ({ keyText, value, isAddress = false }) => {
  return (
    <div className='key value'>
      <p className='key'>{keyText}</p>
      <div className='value'>
        {isAddress
          ? (
            <div className='address'>
              <span>{mock.depAddress}</span>
              <button><Icon variant='copy-01' /></button>
              <button><Icon variant='link-external-01' /></button>
            </div>
            )
          : value}
      </div>
    </div>
  )
}

const icons = {
  ETH: 'ethereum-round-blue',
  BSC: 'binance-wallet'
}

const BridgingResults = ({ open, close }) => {
  return (
    <Modal
      className='bridging results modal'
      visible={open}
      setVisible={close}
    >
      <button className='close'>
        <Icon variant='x-close' size='xl' />
      </button>

      <h3>
        Bridging Results
      </h3>

      <div className='details container'>
        <div className='details'>
          <KeyVal keyText='Date' value={getDateInFormat(mock.timestamp)} />

          <KeyVal
            keyText='Departure Chain' value={(
              <div className='chain'>
                <Icon variant={icons[mock.depChain]} />
                <span>{mock.depChain}</span>
              </div>
          )}
          />

          <KeyVal
            keyText='Departure Address' value={mock.depAddress} isAddress
          />

          <KeyVal
            keyText='Destination Chain' value={(
              <div className='chain'>
                <Icon variant={icons[mock.destChain]} />
                <span>{mock.destChain}</span>
              </div>
          )}
          />

          <KeyVal
            keyText='Destination Address' value={mock.destAddress} isAddress
          />
        </div>

        <div className='nft'>
          <p className='card title'>Send NFT</p>
          <hr />

          <div className='info'>
            <img src={`${AppConstants.nftImageOrigin}/thumbnails/${mock.tokenId}.webp`} alt={mock.nftTitle + ' thumbnail image'} />
            <div>
              <p>Name</p>
              <p className='name'>{mock.nftTitle}</p>
            </div>
          </div>

          <div className='details'>
            <KeyVal keyText='Departure Hash' value={mock.depHash} isAddress />
            <KeyVal keyText='Destination Hash' value={mock.destHash} isAddress />
          </div>
        </div>

        <Link href='#'>
          <PrimaryButton>
            View Receipt
          </PrimaryButton>
        </Link>
      </div>

    </Modal>
  )
}

export { BridgingResults }
