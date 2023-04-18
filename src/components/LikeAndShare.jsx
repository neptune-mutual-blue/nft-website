import { useEffect, useState } from 'react'

import { ShareNft } from '@/components/ShareNft/ShareNft'
import { Icon } from '@/elements/Icon'
import CountUp from '@/components/CountUp/CountUp'
import { isNftLiked, likeOrDislikeNft } from '@/utils/like-nft'
import { useWeb3React } from '@web3-react/core'

const LikeAndShare = ({ nft }) => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [likeCount, setLikeCount] = useState(nft.likes ? Number(nft.likes) : 0)
  const [isLike, setIsLike] = useState(false)

  const { library, account } = useWeb3React()

  useEffect(() => {
    if (!account) return

    (async function () {
      const liked = await isNftLiked({ account, tokenId: nft?.tokenId })
      setIsLike(liked)
    })()
  }, [nft, account])

  const onHandleLike = async () => {
    likeOrDislikeNft({
      account,
      library,
      tokenId: nft.tokenId,
      onSuccess: (updatedLikeCount) => {
        setLikeCount(Number(updatedLikeCount))
        setIsLike(prev => !prev)
      }
    })
  }

  return (
    <div className='like and share'>
      <button
        className={`like btn ${isLike ? 'liked' : ''}`}
        disabled={!account}
        onClick={onHandleLike}
      >
        <Icon variant='heart' size='lg' />
        <CountUp number={likeCount} localized />
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
