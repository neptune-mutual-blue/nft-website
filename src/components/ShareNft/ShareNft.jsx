import { IconButton } from '@/components/IconButton/IconButton'
import { Modal } from '@/components/Modal/Modal'
import { NftNickname } from '@/components/NftNickname'
import { Icon } from '@/elements/Icon'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { useRouter } from 'next/router'

const ShareNft = (props) => {
  const { open, setOpen, children, nft } = props
  const router = useRouter()
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
        <div className='share platform' role='button' tabIndex={0}>
          <div className='platform icon'>
            <Icon variant='twitter' size='24' />
          </div>
          <div>Twitter</div>
        </div>
        <div className='share platform' role='button' tabIndex={0}>
          <div className='platform icon'>
            <Icon variant='facebook' size='24' />
          </div>
          <div>Facebook</div>
        </div>
        <div className='share platform' role='button' tabIndex={0}>
          <div className='platform icon'>
            <Icon variant='telegram' size='24' />
          </div>
          <div>Telegram</div>
        </div>
        <div className='share platform' role='button' tabIndex={0}>
          <div className='platform icon'>
            <Icon variant='email' size='24' />
          </div>
          <div>E-mail</div>
        </div>
      </div>

      <div className='share link'>
        <div className='link text'>
          {typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/{nft.tokenId}/
        </div>

        <IconButton
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
