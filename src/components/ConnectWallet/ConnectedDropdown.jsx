import {
  createRef,
  useCallback,
  useEffect,
  useState
} from 'react'

import { IconButton } from '@/components/IconButton/IconButton'
import { Tags } from '@/components/Tags/Tags'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import useUserInfo from '@/hooks/data/useUserInfo'
import useOnEscape from '@/hooks/useOnEscape'
import { useOnClickOutside } from '@/hooks/useOnOutsideClick'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { NftApi } from '@/service/nft-api'
import { imageOrigin } from '@/services/marketplace-api'
import { abbreviateAccount } from '@/utils/abbreviate-account'
import { copyToClipboard } from '@/utils/copy-to-clipboard'
import { formatDollar } from '@/utils/currencyHelpers'
import { formatNumber } from '@/utils/number-format'
import { useWeb3React } from '@web3-react/core'

const ConnectedDropdown = () => {
  const [open, setOpen] = useState(false)

  const { account } = useWeb3React()

  const { logout } = useAuth()

  const ref = createRef()

  useOnClickOutside(ref, () => { return setOpen(false) })

  const { boundToken, nickname, userLevel } = useUserInfo(account)

  useOnEscape(() => {
    setOpen(false)
  })

  const [milestones, setMilestones] = useState({ totalPolicyPurchased: '0', totalLiquidityAdded: '0' })

  const points = milestones.totalLiquidityAdded * AppConstants.LIQUIDITY_POINTS_PER_DOLLAR + milestones.totalPolicyPurchased * AppConstants.POLICY_POINTS_PER_DOLLAR

  const getMilestones = useCallback(async () => {
    if (!account) { return }

    try {
      const response = await NftApi.mintingLevelsMilestone(account)
      if ((response.data ?? []).length > 0) {
        setMilestones(response.data[0])
      }
    } catch (err) {
      console.error(err)
    }
  }, [account])

  useEffect(() => {
    getMilestones()
  }, [getMilestones])

  return (
    <div className='wallet connected dropdown' ref={ref}>
      <button
        className='trigger' onClick={() => {
          setOpen(!open)
        }}
      >
        <div className='account'>{abbreviateAccount(account)}</div>
        <Icon variant='chevron-down' className={(open ? 'inverted' : '')} size='lg' />
      </button>

      <div className={'dropdown content' + (open ? ' visible' : '')}>
        {nickname && boundToken && (
          <div className='avatar and nickname'>
            <div className='avatar'>
              <img src={boundToken ? `${imageOrigin}/thumbnails/${boundToken}.webp` : '/assets/images/avatar/default.png'} alt='User avatar' />
            </div>
            <div className='nickname'>
              {nickname || 'Purple Orchid Isomorphic Nebula'}
            </div>
          </div>
        )}
        <div className='level and account'>
          <div className={`level${userLevel === 0 ? ' hidden' : ''}`}>
            {userLevel !== 0 && (
              <div>
                <Tags
                  tags={[
                    {
                      id: '1',
                      slug: '1',
                      text: 'L' + userLevel,
                      color: 'level' + userLevel
                    }
                  ]}
                />
              </div>
            )}
            <div>
              {abbreviateAccount(account)}
            </div>
            <div>
              <IconButton
                variant='copy-01' size='sm' showFeedback noWrapper onClick={() => {
                  copyToClipboard(account)
                }}
              />
            </div>
          </div>
        </div>

        <div className='info'>
          <div className='key'>Current Points</div>
          <div>{formatNumber(points)} pts</div>
        </div>

        <div className='info'>
          <div className='key'>Purchase Policy</div>
          <div>{formatDollar(milestones.totalPolicyPurchased)}</div>
        </div>

        <div className='info'>
          <div className='key'>Added Liquidity</div>
          <div>{formatDollar(milestones.totalLiquidityAdded)}</div>
        </div>

        <button
          className='logout' onClick={() => {
            logout()
            setOpen(false)
          }}
        >
          <div className='text'>
            <Icon variant='log-out-01' size='md' />
            <span className='text'>
              Logout
            </span>
          </div>

        </button>
      </div>
    </div>

  )
}

export { ConnectedDropdown }
