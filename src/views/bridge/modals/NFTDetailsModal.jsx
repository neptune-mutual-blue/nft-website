import { IconButton } from '@/components/IconButton/IconButton'
import { Modal } from '@/components/Modal/Modal'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { Icon } from '@/elements/Icon'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

const NFTDetailsModal = ({ open, close, nft }) => {
  return (
    <Modal
      className='nft details modal'
      visible={open}
      setVisible={close}
    >
      <button className='close' onClick={close}>
        <Icon variant='x-close' size='xl' />
      </button>

      <h3>
        NFT Details
      </h3>

      <div className='image and details'>
        <NftImageWithExpand nft={nft} />

        <div className='details'>
          <div className='detail card'>
            <p className='title'>Name</p>
            <div className='value'>
              {nft?.name}
            </div>
          </div>

          <div className='detail card'>
            <p className='title'>Token ID</p>
            <div className='value address'>
              <p>{nft?.tokenId}</p>
              <IconButton
                noWrapper
                showFeedback
                size='sm' variant='copy-01' onClick={() => {
                  copyToClipboard(nft.tokenId)
                }}
              />
            </div>
          </div>

          <div className='detail card'>
            <p className='title'>Chain</p>
            <div className='value chain'>
              <Icon variant='ethereum-round-blue' size='xl' />
              <p>{nft?.tokenId}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export { NFTDetailsModal }
