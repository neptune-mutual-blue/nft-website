import { Icon } from '@/elements/Icon'

const AlertInfo = () => {
  return (
    <div className='alert default'>
      <Icon variant='info-circle' size='lg' />
      <span>Please connect your wallet to view milestones and minting levels.</span>
    </div>
  )
}

export default AlertInfo
