import { AppConstants } from '@/constants/AppConstants'

const { signMessage } = require('@/utils/sign-message')

const getNftLikeDislikeUrl = (tokenId, account) => {
  return AppConstants.nftApiBaseURL + '/log/like/:tokenId/:account'
    .replace(':tokenId', tokenId)
    .replace(':account', account)
}

const getIsNftLikedUrl = (tokenId, account) => {
  return AppConstants.nftApiBaseURL + '/insights/like/:tokenId/:account'
    .replace(':tokenId', tokenId)
    .replace(':account', account)
}

const likeOrDislikeNft = async ({
  account,
  tokenId,
  library,
  signingMessage,
  onSuccess = () => {},
  onError = e => e
}) => {
  if (!account) return

  try {
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
      if (onSuccess) onSuccess()
      return
    }

    if (onError) onError()
  } catch (e) {
    if (onError) onError(e)
  }
}

const isNftLiked = async ({ account, tokenId }) => {
  if (!tokenId || !account) return false

  const url = getIsNftLikedUrl(tokenId, account)

  try {
    const res = await fetch(url)
    const json = await res.json()
    const liked = json?.data?.[0]?.liked

    return liked
  } catch (error) {
    console.log({ error })
  }

  return false
}

export { likeOrDislikeNft, getNftLikeDislikeUrl, isNftLiked, getIsNftLikedUrl }
