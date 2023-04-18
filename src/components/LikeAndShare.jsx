import { useEffect, useState } from 'react'

import { ShareNft } from '@/components/ShareNft/ShareNft'
import { Icon } from '@/elements/Icon'
import CountUp from '@/components/CountUp/CountUp'
import { isNftLiked, likeOrDislikeNft } from '@/utils/like-nft'
import { useWeb3React } from '@web3-react/core'

const LikeAndShare = ({ nft }) => {
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [likeCount, setLikeCount] = useState(1024)
  const [isLike, setIsLike] = useState(false)

  const { library, account } = useWeb3React()

  useEffect(() => {
    (async function () {
      const liked = await isNftLiked({ account, tokenId: nft?.tokenId })
      setIsLike(liked)
    })()
  }, [nft, account])

  const onHandleLike = async () => {
    setLikeCount(isLike ? likeCount - 1 : likeCount + 1)

    const message = 'Like/UnLike Neptune Mutual NFT'
    likeOrDislikeNft({
      account,
      library,
      tokenId: nft.tokenId,
      signingMessage: message,
      onSuccess: () => {
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
