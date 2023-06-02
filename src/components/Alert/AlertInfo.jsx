import { Icon } from '@/elements/Icon'

const AlertInfo = ({ text = 'Please connect your wallet to view milestones and minting levels.' }) => {
  return (
    <div className='alert default'>
      <Icon variant='info-circle' size='lg' />
      <span>{text}</span>
    </div>
  )
}

export default AlertInfo
