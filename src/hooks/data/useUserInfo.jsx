import {
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  AvailableEvents,
  useEvent
} from '@/hooks/useEvent'
import { NftApi } from '@/service/nft-api'

const useUserInfo = (account) => {
  const [userData, setUserData] = useState({
    unlockedLevel: '0',
    mintedLevel: '0',
    boundToken: '',
    nickname: '',
    userLevel: 0
  })
  const [loading, setLoading] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    if (!account) return

    setLoading(true)
    const userInfo = await NftApi.getUserInfoFromApi(account)
    if (userInfo) {
      const mintedLevel = Number(userInfo.mintedLevel || '0')
      const userLevel = mintedLevel < 7 ? mintedLevel + 1 : mintedLevel
      setUserData({
        ...userInfo,
        boundToken: userInfo.tokenId ? Number(userInfo.tokenId) : '',
        userLevel
      })
    }
    setLoading(false)
  }, [account])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  const { boundToken, mintedLevel, userLevel, unlockedLevel, nickname } = userData

  // HANDLE EVENTS

  const handleMintEvent = useCallback((nft) => {
    const updatedUserInfo = { userLevel: nft.level ? nft.level + 1 > 7 ? 7 : nft.level + 1 : 1 }

    if (!nft.level) {
      updatedUserInfo.boundToken = Number(nft.tokenId)
      updatedUserInfo.nickname = nft.nickname
    }

    setUserData({ ...userData, ...updatedUserInfo })
  }, [userData])

  useEvent(AvailableEvents.NEW_NFT_MINTED, handleMintEvent)

  return {
    boundToken,
    mintedLevel,
    userLevel,
    unlockedLevel,
    nickname,
    loading,
    fetchUserInfo
  }
}

export default useUserInfo
