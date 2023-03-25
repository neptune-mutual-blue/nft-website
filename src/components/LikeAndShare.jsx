import { Icon } from '@/elements/Icon'

const LikeAndShare = () => {
  return (
    <div className='like and share'>
      <div className='like btn'>
        <Icon variant='heart' size='lg' />
        1,024
      </div>
      <div className='share btn'>
        <Icon variant='share-01' size='lg' />
        Share
      </div>
    </div>
  )
}

export { LikeAndShare }
