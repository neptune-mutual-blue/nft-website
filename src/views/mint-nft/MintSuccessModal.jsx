import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import { ShareButtonGroup } from '@/components/ShareButtonGroup/ShareButtonGroup'

const MintSuccessModal = (props) => {
  const { open, setOpen, children, nft } = props

  return (
    <Modal
      visible={open} setVisible={setOpen}
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
        <img src={nft.image} alt={nft.nickname} />
        <ShareButtonGroup link={`${typeof window !== 'undefined' ? window.location.origin : ''}/marketplace/${nft.tokenId}/`} />
        <Button size='xl'>Explore other Collection</Button>
      </div>

    </Modal>
  )
}

export { MintSuccessModal }
