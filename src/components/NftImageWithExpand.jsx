import { Icon } from '@/elements/Icon'

const NftImageWithExpand = ({ nft }) => {
  return (
    <div className='nft image with expand'>
      <img src={nft.image} alt={nft.name} />

      <div className='fullscreen icon'>
        <Icon variant='expand-01' size='lg' />
      </div>
    </div>
  )
}

export default NftImageWithExpand
