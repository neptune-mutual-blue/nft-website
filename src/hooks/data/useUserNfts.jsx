import {
  useCallback,
  useEffect,
  useState
} from 'react'

import { NftApi } from '@/service/nft-api'
import { imageOrigin } from '@/services/marketplace-api'

const useUserNfts = (account, network) => {
  const [userNFTs, setUserNFTs] = useState([])

  const updateUserNfts = useCallback(async () => {
    if (!account) { return }
    const nfts = await NftApi.getUserMintedNFTs(account, network)

    const nftsWithDetails = (nfts ?? []).map(nft => {
      const level = nft.attributes.find(a => { return a.traitType === 'Level' }).value || 0
      const thumbnail = `${imageOrigin}/thumbnails/${nft.tokenId}.webp`
      const cover = `${imageOrigin}/covers/${nft.tokenId}.webp`

      return {
        ...nft,
        level,
        thumbnail,
        cover
      }
    })
    setUserNFTs(nftsWithDetails)
  }, [account, network])

  useEffect(() => {
    if (updateUserNfts) { updateUserNfts() }
  }, [updateUserNfts])

  return { userNFTs, updateUserNfts }
}

export { useUserNfts }
