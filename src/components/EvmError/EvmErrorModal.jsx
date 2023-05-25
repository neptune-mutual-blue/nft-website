import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'

const EvmErrorModal = (props) => {
  const { open, setOpen, error, onOK } = props

  return (
    <Modal
      visible={open} setVisible={setOpen}
      disableChildrenAsChild
      className='evm error modal'
    >
      <div className='details'>
        <div className='title'>
          EVM Error Occurred While Processing Your Request
        </div>
      </div>

      <div className='content'>
        <p>We attempted to submit your transaction but ran into an unexpected error. The smart contract sent the following error message:</p>

        <div className='error'>{error}</div>

        <div className='actions'>
          <div className='warning'>
            While we do not suggest it, you may force this transaction to be sent nonetheless.
          </div>
          <div className='buttons'>
            <Button
              variant='secondary-gray' size='lg' onClick={() => {
                setOpen(false)
              }}
            >Cancel
            </Button>
            <Button size='lg' onClick={onOK}>Send Transaction Ignoring This Error</Button>
          </div>
        </div>

      </div>

    </Modal>
  )
}

export { EvmErrorModal }
