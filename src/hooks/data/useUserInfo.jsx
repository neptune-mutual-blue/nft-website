import {
  useCallback,
  useEffect,
  useState
} from 'react'

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
        boundToken: Number(userInfo.tokenId || '0'),
        userLevel
      })
    }
    setLoading(false)
  }, [account])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  const { boundToken, mintedLevel, userLevel, unlockedLevel, nickname } = userData

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
