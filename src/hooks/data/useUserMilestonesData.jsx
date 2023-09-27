const { mintingLevelRequirements } = require('@/config/minting-levels')
const { AppConstants } = require('@/constants/AppConstants')
const { default: useUserInfo } = require('@/hooks/data/useUserInfo')
const { NftApi } = require('@/service/nft-api')
const { NpmApi } = require('@/service/npm-api')
const { useWeb3React } = require('@web3-react/core')
const { useEffect, useState } = require('react')

const useUserMilestonesData = () => {
  const [userProgress, setUserProgress] = useState({
    totalLiquidityAdded: 0,
    totalPolicyPurchased: 0
  })
  const [activePolicies, setActivePolicies] = useState([])

  const { account, chainId } = useWeb3React()
  const { userLevel } = useUserInfo(account)

  const actualPoints = userProgress.totalLiquidityAdded * AppConstants.LIQUIDITY_POINTS_PER_DOLLAR + userProgress.totalPolicyPurchased * AppConstants.POLICY_POINTS_PER_DOLLAR

  const points = !userLevel ? activePolicies.length > 0 ? actualPoints < 1 ? 1 : actualPoints : 0 : actualPoints

  const requirements = mintingLevelRequirements[!userLevel ? 0 : userLevel]

  const pointsRemaining = requirements.points - points

  useEffect(() => {
    (async function () {
      if (!account || !chainId) { return }

      try {
        const [
          data,
          activePolicies
        ] = await Promise.all([
          NftApi.mintingLevelsMilestone(account),
          NpmApi.getActivePolicies(chainId, account)
        ])
        setUserProgress({
          totalLiquidityAdded: parseFloat(data.data[0].totalLiquidityAdded),
          totalPolicyPurchased: parseFloat(data.data[0].totalPolicyPurchased)
        })
        setActivePolicies(activePolicies.data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [account, chainId])

  return {
    points,
    pointsRemaining,
    requiredPoints: requirements.points,
    totalPolicyPurchased: userProgress.totalPolicyPurchased,
    totalLiquidityAdded: userProgress.totalLiquidityAdded
  }
}

export { useUserMilestonesData }
