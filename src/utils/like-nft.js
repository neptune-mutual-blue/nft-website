import { AppConstants } from '@/constants/AppConstants'

const { signMessage } = require('@/utils/sign-message')

const getNftLikeDislikeUrl = (tokenId, account) => {
  return AppConstants.nftApiBaseURL + '/insights/' + AppConstants.NETWORK + '/log/like/:tokenId/:account'
    .replace(':tokenId', tokenId)
    .replace(':account', account)
}

const getIsNftLikedUrl = (tokenId, account) => {
  return AppConstants.nftApiBaseURL + '/insights/' + AppConstants.NETWORK + '/like/:tokenId/:account'
    .replace(':tokenId', tokenId)
    .replace(':account', account)
}

const likeOrDislikeNft = async ({
  account,
  tokenId,
  library,
  onSuccess = () => {},
  onError = e => { return e }
}) => {
  if (!account) return

  try {
    const signingMessage = 'Like/UnLike Neptune Mutual NFT'
    const signature = await signMessage(library, signingMessage)

    const url = getNftLikeDislikeUrl(tokenId, account)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        signature
      })
    })

    if (res.ok) {
      const data = await res.json()
      const updatedLikeCount = data?.data[0].logLike
      if (onSuccess) onSuccess(updatedLikeCount)
      return
    }

    if (onError) onError()
  } catch (e) {
    if (onError) onError(e)
  }
}

const isNftLiked = async ({ account, tokenId }) => {
  if (!tokenId) return false

  const url = getIsNftLikedUrl(tokenId, account)

  try {
    const res = await fetch(url)
    const json = await res.json()
    const liked = json?.data?.[0]?.liked

    return liked
  } catch (error) {
    console.error({ error })
  }

  return false
}

export { getIsNftLikedUrl, getNftLikeDislikeUrl, isNftLiked, likeOrDislikeNft }
