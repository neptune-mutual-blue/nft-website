import { IconButton } from '@/components/IconButton/IconButton'
import { Modal } from '@/components/Modal/Modal'
import { NftNickname } from '@/components/NftNickname'
import { Icon } from '@/elements/Icon'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

const ShareNft = (props) => {
  const { open, setOpen, children, nft } = props

  return (
    <Modal
      visible={open} setVisible={setOpen}
      trigger={
        children
    }
      className='share nft modal'
    >
      <div className='details'>
        <img src={nft.image} alt={nft.nickname} />
        <div className='nickname and family'>
          <NftNickname nft={nft} />
          <div className='family'>{nft.family}</div>
        </div>
      </div>

      <div className='share options'>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='twitter' />
          </div>
          <div>Twitter</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='facebook' />
          </div>
          <div>Facebook</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='telegram' />
          </div>
          <div>Telegram</div>
        </button>
        <button className='share platform'>
          <div className='platform icon'>
            <Icon variant='email' />
          </div>
          <div>E-mail</div>
        </button>
      </div>

      <div className='share link'>
        <div className='link text'>
          {typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/{nft.tokenId}/
        </div>

        <IconButton
          noWrapper
          showFeedback
          size='lg' variant='copy-01' onClick={() => {
            copyToClipboard(`${typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/${nft.tokenId}/`)
          }}
        />

      </div>
    </Modal>
  )
}

export { ShareNft }
