import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import Link from 'next/link'

import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { Progress } from '@/components/Progress/Progress'
import Skeleton from '@/components/Skeleton'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { LocalStorageKeys } from '@/config/localstorage'
import { Personas } from '@/config/persona'
import { Icon } from '@/elements/Icon'
import useMintedLevelStatus from '@/hooks/data/useHasMintedLevel'
import useUserInfo from '@/hooks/data/useUserInfo'
import { useUserMilestonesData } from '@/hooks/data/useUserMilestonesData'
import { wallets } from '@/lib/connect-wallet/config/wallets'
import useAuth from '@/lib/connect-wallet/hooks/useAuth'
import { NftApi } from '@/service/nft-api'
import { imageOrigin } from '@/services/marketplace-api'
import { formatDollar } from '@/utils/currencyHelpers'
import { truncateAddress } from '@/utils/nft'
import { formatNumber } from '@/utils/number-format'
import LockAndLevels from '@/views/my-persona/LockAndLevels'
import { useWeb3React } from '@web3-react/core'

const HomePersona = ({ characters }) => {
  const { points, pointsRemaining, requiredPoints, totalLiquidityAdded, totalPolicyPurchased } = useUserMilestonesData()
  const { active, account } = useWeb3React()
  const { userLevel, boundToken } = useUserInfo(account)

  const { logout } = useAuth()

  const [connector, setConnector] = useState()

  const updateConnector = useCallback(() => {
    if (active) {
      const connectorName = localStorage.getItem(LocalStorageKeys.CONNECTOR_NAME)
      const connector = wallets.find(wallet => { return wallet.connectorName === connectorName })

      if (!connector) {
        setConnector(undefined)
        return
      }
      setConnector(connector)
    } else {
      setConnector(undefined)
    }
  }, [active])

  useEffect(() => {
    updateConnector()
  }, [updateConnector])

  const [userPersona, setUserPersona] = useState([])
  const [personaLoading, setPersonaLoading] = useState(false)

  const { status: mintedLevel7 } = useMintedLevelStatus(account, 7)

  const getPersona = useCallback(async () => {
    setPersonaLoading(true)

    setUserPersona([])

    try {
      const response = await NftApi.getPersona(account)

      if (response && response.length === 6) {
        const persona = []

        response.forEach(personaLevel => {
          if (personaLevel.level % 2 === 1) {
            persona.push(personaLevel.persona === 1 ? Personas.GUARDIAN : Personas.BEAST)
          }
        })

        setUserPersona(persona)
      }
    } catch (err) {

    }

    setPersonaLoading(false)
  }, [account])

  useEffect(() => {
    if (account && active) {
      getPersona()
    } else {
      setUserPersona([])
    }
  }, [account, active, getPersona])

  const nextCharacter = useMemo(() => {
    const nextLevel = (userLevel || (boundToken ? 1 : 0))

    if (nextLevel === 0) {
      return {
        image: `${imageOrigin}/thumbnails/180001.webp`,
        url: '/marketplace?soulbound=true',
        soulbound: true
      }
    }

    if (userPersona.length === 0) { return undefined }

    const nft = characters.find((character) => { return character.level === nextLevel && (character.level === 7 || character.role === userPersona[Math.floor(nextLevel / 2)]) })

    return ({
      image: nft.thumbnail,
      url: `/marketplace?roles=${userPersona[0]}&level=${nextLevel}`,
      soulbound: false
    })
  }, [characters, userLevel, userPersona, boundToken])

  const nextNft = (mobile) => {
    return (
      <div className={`next nft${mobile ? ' mobile' : ''}`}>
        <div className='title'>
          <div>Available NFTs Based on Your Current Progress</div>
          <div><Link href='/my-collection'>View My Collection</Link></div>
        </div>
        <div className={`description${mintedLevel7 ? ' minted' : ''}`}>
          {!active && (
            <div className='text'>
              Please connect your wallet to view your progress.
            </div>
          )}

          {mintedLevel7 && (
            <div className='text'>
              You have minted and completed the entire collection!
            </div>
          )}

          {nextCharacter && active && !mintedLevel7 && (
            <Link href={nextCharacter.url}>
              <div className='thumbnail'>
                <img className='next character' alt='Next NFT' src={nextCharacter.image} />
                <div className='badges'>
                  {nextCharacter.soulbound && (
                    <CustomTooltip text='Soulbound NFT'>
                      <div className='badge'>
                        <Icon variant='star-04' size='sm' />
                      </div>
                    </CustomTooltip>
                  )}
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className='mobile link'>
          <Link href='/my-collection'>View My Collection</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='home persona'>
      <div className='progress and persona'>
        <div className='progress details'>
          <div>
            {connector && account && (
              <div className='connector'>
                <div className='icon'>
                  <span className='light only'><Icon variant={connector.iconVariant} size='sm' /></span>
                  <span className='dark only'><Icon variant={connector.iconVariantDark} size='sm' /></span>
                </div>
                <div className='account'>
                  {truncateAddress(account)}
                </div>
              </div>
            )}
            <div className='title'>
              Welcome to Neptune Mutual NFT Collections!
            </div>

            <div className='progress description'>
              {!active && (
                'Please connect your wallet to view your progress.'
              )}
              {active && (
                <div className='milestones'>
                  <div className='level'>
                    <Tags
                      tags={[
                        {
                          id: '1',
                          slug: '1',
                          text: 'Level ' + (userLevel ?? 0),
                          color: 'level' + (userLevel ?? 0)
                        }
                      ]}
                    />
                    <CustomTooltip
                      text={
                        <div
                          style={
                            {
                              maxWidth: '320px',
                              lineHeight: '1.5',
                              fontSize: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px'
                            }
                          }
                        >
                          <div style={{ fontWeight: 600 }}>Your Current Level: Level 0</div>
                          <div style={{ fontWeight: 500 }}>Level up by earning points through policy purchase, adding liquidity or do both simultaneously.</div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <a href='https://neptunemutual.com/docs/neptune-mutual-nfts/' target='_blank'>
                              <Button size='sm' style={{ padding: '4px 10px' }}>Know more</Button>
                            </a>
                          </div>
                        </div>
                      }
                    >
                      <div>
                        <Icon variant='help-cirlce' size='sm' />
                      </div>
                    </CustomTooltip>
                  </div>

                  <h3>Current Points: <span>{formatNumber(points)} pts</span></h3>

                  <Progress percent={(points / requiredPoints) * 100} />

                  {pointsRemaining > 0 && (
                    <div className='next level requirements'>
                      <div>
                        {formatNumber(pointsRemaining)} points until next level.
                      </div>

                      <CustomTooltip text={`Points Required: ${formatNumber(requiredPoints)}`}>
                        <button
                          role='button'
                        >
                          <Icon variant='help-cirlce' size='sm' />
                        </button>
                      </CustomTooltip>
                    </div>
                  )}

                  <div className='info'>
                    <div className='label and value'>
                      <div className='label'>Policy Purchase:</div>
                      <div className='value'>{formatDollar(totalPolicyPurchased)}</div>
                    </div>
                    <div className='label and value'>
                      <div className='label'>Added Liquidity:</div>
                      <div className='value'>{formatDollar(totalLiquidityAdded)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {nextNft(true)}

          {!active && (
            <ConnectWallet />
          )}

          {active && (
            <Button
              iconTrailing='log-out-01'
              variant='secondary-gray'
              size='md'
              onClick={() => {
                logout()
              }}
            >
              Disconnect Wallet
            </Button>
          )}
        </div>
        <div className='persona details'>
          <div className='section'>
            <div>
              <div className='title'>
                {userPersona.length > 0 ? 'My Personas' : 'Select Your Persona'}
              </div>
              <div className='description'>
                {userPersona.length === 0 && !personaLoading && (
                  'Guardian or Beast? Your decision shapes your journey. Will you stand as a protector or unleash your formidable spirit? Your persona, your adventure.'
                )}
                {personaLoading && (
                  <div className='user persona'>
                    <Skeleton className='dark' style={{ height: '48px' }} />
                    <Skeleton className='dark' style={{ height: '48px' }} />
                    <Skeleton className='dark' style={{ height: '48px' }} />
                  </div>
                )}
                {userPersona.length > 0 && (
                  <div className='user persona'>
                    <div>
                      <LockAndLevels locked levels={[1, 2]} short />
                      <div className='selection'>{userPersona[0]}</div>
                    </div>
                    <div>
                      <LockAndLevels locked levels={[3, 4]} short />
                      <div className='selection'>{userPersona[1]}</div>

                    </div>
                    <div>
                      <LockAndLevels locked levels={[5, 6]} short />
                      <div className='selection'>{userPersona[2]}</div>

                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link href='/my-persona'>
              <Button variant='secondary-gray' size='md' iconTrailing='arrow-narrow-right'>{userPersona.length > 0 ? 'View My Personas' : 'Select My Persona'}</Button>
            </Link>
          </div>
        </div>
      </div>
      {nextNft()}
    </div>
  )
}

export default HomePersona
