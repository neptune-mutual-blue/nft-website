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
    userLevel: 0,
    personaSet: false,
    persona: undefined
  })
  const [loading, setLoading] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    if (!account) { return }

    setLoading(true)
    const [userInfo, persona] = await Promise.all([NftApi.getUserInfoFromApi(account), NftApi.getPersona(account)])

    const mintedLevel = Number(userInfo?.mintedLevel || '0')
    const boundToken = persona.length > 0 ? persona[0].boundTokenId || '' : ''
    const userLevel = mintedLevel < 7 && boundToken ? mintedLevel + 1 : mintedLevel

    const personaSet = !!(persona.length > 0 && persona[0].persona)

    setUserData({
      ...userInfo,
      userLevel: userLevel === 0 && boundToken ? 1 : userLevel,
      boundToken,
      personaSet,
      persona: personaSet
        ? persona.reduce((acc, curr) => {
          acc[curr.level] = curr.persona

          return acc
        }, {})
        : {}
    })

    setLoading(false)
  }, [account])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  const { boundToken, mintedLevel, userLevel, unlockedLevel, nickname, personaSet, persona } = userData

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
    personaSet,
    fetchUserInfo,
    persona
  }
}

export default useUserInfo
