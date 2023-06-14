import Link from 'next/link'

import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import {
  ShareButtonGroup
} from '@/components/ShareButtonGroup/ShareButtonGroup'

const MintSuccessModal = (props) => {
  const { open, setOpen, children, nft } = props

  const shareContent = `I have successfully minted ${nft.family} (${nft.nickname}) #${nft.tokenId}) NFT from Neptune Mutual.`

  return (
    <Modal
      visible={open} setVisible={setOpen}
      disableChildrenAsChild
      trigger={
        children
      }
      className='mint success modal'
    >
      <div className='details'>
        <div className='congratulations'>
          Congratulations on minting an NFT!
        </div>

        <div className='title'>
          {nft.name}<br />is officially yours!
        </div>
      </div>

      <div className='content'>
        <img src={nft.thumbnail} alt={nft.nickname} />
        <ShareButtonGroup content={shareContent} link={`${typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/${nft.tokenId}/`} />
        <Link href='/marketplace'><Button size='xl'>Explore other Collection</Button></Link>
      </div>

    </Modal>
  )
}

export { MintSuccessModal }
