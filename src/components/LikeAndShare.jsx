import { ShareNft } from '@/components/ShareNft/ShareNft'
import { Icon } from '@/elements/Icon'
import { useState } from 'react'

const LikeAndShare = ({ nft }) => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  return (
    <div className='like and share'>
      <div className='like btn' role='button' tabIndex={0}>
        <Icon variant='heart' size='lg' />
        1,024
      </div>
      <ShareNft open={showSharePopup} setOpen={setShowSharePopup} nft={nft}>
        <div
          className='share btn' role='button' tabIndex={0} onClick={() => {
            setShowSharePopup(true)
          }}
        >
          <Icon variant='share-01' size='lg' />
          Share
        </div>
      </ShareNft>
    </div>
  )
}

export { LikeAndShare }
