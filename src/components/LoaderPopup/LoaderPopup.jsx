import RippleLoader from '@/components/Loader/RippleLoader'
import { Modal } from '@/components/Modal/Modal'

export const LoaderPopup = ({
  visible,
  title,
  subTitle = "Please don't close or reload this screen while your transaction is processing."
}) => {
  return (
    <Modal visible={visible} setVisible={() => {}}>
      <div className='minting loader'>
        <div className='loading icon'>
          <RippleLoader />
        </div>
        <div className='nft name'>{title}</div>
        <div className='description'>
          {subTitle}
        </div>
      </div>
    </Modal>
  )
}
