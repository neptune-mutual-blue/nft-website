import { useState } from 'react'

import { ShareNft } from '@/components/ShareNft/ShareNft'
import { Icon } from '@/elements/Icon'

const LikeAndShare = ({ nft }) => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [likeCount, setLikeCount] = useState(1024)
  const [isLike, setIsLike] = useState(false)

  const onHandleLike = () => {
    setLikeCount(isLike ? likeCount - 1 : likeCount + 1)
    setIsLike(!isLike)
  }

  return (
    <div className='like and share'>
      <button className={`like btn ${isLike ? 'liked' : ''}`} onClick={onHandleLike}>
        <Icon variant='heart' size='lg' />
        {likeCount.toLocaleString()}
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
