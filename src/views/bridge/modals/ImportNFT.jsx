import { PrimaryButton } from '@/components/Button/PrimaryButton'
import { Modal } from '@/components/Modal/Modal'
import { Icon } from '@/elements/Icon'

const ImportNFT = ({ open, close }) => {
  return (
    <Modal
      className='import nft modal'
      visible={open}
      setVisible={close}
    >
      <button className='close' onClick={close}>
        <Icon variant='x-close' size='xl' />
      </button>

      <h3>
        Import NFT
      </h3>

      <input placeholder='Enter Token ID' />

      <PrimaryButton>
        Import
      </PrimaryButton>
    </Modal>
  )
}

export { ImportNFT }
