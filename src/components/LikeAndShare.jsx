import { ShareNft } from '@/components/ShareNft/ShareNft'
import { Icon } from '@/elements/Icon'
import { useState } from 'react'

const LikeAndShare = ({ nft }) => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  return (
    <div className='like and share'>
      <button className='like btn'>
        <Icon variant='heart' size='lg' />
        1,024
      </button>
      <ShareNft open={showSharePopup} setOpen={setShowSharePopup} nft={nft}>
        <button
          className='share btn' onClick={() => {
            setShowSharePopup(true)
          }}
        >
          <Icon variant='share-01' size='lg' />
          Share
        </button>
      </ShareNft>
    </div>
  )
}

export { LikeAndShare }
