import { Modal } from '@/components/Modal/Modal'
import { NftNickname } from '@/components/NftNickname'
import {
  ShareButtonGroup
} from '@/components/ShareButtonGroup/ShareButtonGroup'

const ShareNft = (props) => {
  const { open, setOpen, children, nft } = props

  const shareContent = `Check out ${nft.family} (${nft.nickname}) #${nft.tokenId}) NFT from Neptune Mutual.`

  return (
    <Modal
      visible={open} setVisible={setOpen}
      trigger={
        children
    }
      className='share nft modal'
    >
      <div className='details'>
        <img src={nft.thumbnail} alt={nft.nickname} />
        <div className='nickname and family'>
          <NftNickname nft={nft} />
          <div className='family'>{nft.family}</div>
        </div>
      </div>

      <ShareButtonGroup content={shareContent} link={`${typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/${nft.tokenId}/`} />
    </Modal>
  )
}

export { ShareNft }
