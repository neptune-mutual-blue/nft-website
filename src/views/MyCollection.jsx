import Link from 'next/link'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { bridgeConfig } from '@/config/bridge'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import useUserInfo from '@/hooks/data/useUserInfo'
import { useUserMilestonesData } from '@/hooks/data/useUserMilestonesData'
import { useUserNfts } from '@/hooks/data/useUserNfts'
import { formatDollar } from '@/utils/currencyHelpers'
import { formatNumber } from '@/utils/number-format'
import { useWeb3React } from '@web3-react/core'

const MyCollection = ({ premiumNfts }) => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '#',
      name: 'My Collection'
    }
  ]

  const { account } = useWeb3React()
  const { userLevel, nickname = 'Purple Orchid Isomorphic Nebula' } = useUserInfo(account)

  const { points, pointsRemaining, requiredPoints, totalLiquidityAdded, totalPolicyPurchased } = useUserMilestonesData()

  const { userNFTs } = useUserNfts(account)

  return (
    <div className='my collection page'>
      <section className='hero'>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        <div className='content container'>
          <h1>My NFT Collection</h1>

          {
            userLevel !== 0 && (
              <>
                <Tags
                  tags={[
                    {
                      id: '1',
                      slug: '1',
                      text: 'Level ' + userLevel,
                      color: 'level' + userLevel
                    }
                  ]}
                />

                <NftNickname nft={{ level: userLevel, nickname }} />
              </>
            )
          }

          <div className='milestones'>
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

          {AppConstants.NETWORK in bridgeConfig && AppConstants.NETWORK !== 56 && (
            <div className='bridge banner'>
              <p>
                Move your NFTs across different blockchain networks.
              </p>
              <Link href='/my-collection/bridge'>
                Bridge My NFTs
              </Link>
            </div>
          )}

          <div className='minted nfts'>
            <h3>NFTs You've Minted</h3>

            {
              userNFTs.length === 0
                ? (
                  <div className='empty'>
                    <img src='/assets/images/hero/hero-light.webp' alt='B/W Hero Image' />

                    <p>You do not own any NFTs yet</p>

                    <Link href='/marketplace'>
                      Explore Our Collection
                    </Link>
                  </div>
                  )
                : (
                  <div className='nfts grid'>
                    {
                  userNFTs.map((nft, i) => {
                    return (
                      <div key={i} className='nft'>
                        <NftImageWithExpand nft={nft} isCover={false} />

                        <div className='details with chain'>
                          <Tags
                            tags={[
                              {
                                id: '1',
                                slug: '1',
                                text: nft.soulbound ? 'Soulbound' : 'Level ' + nft.level,
                                color: nft.soulbound ? 'nft-soulbound' : 'level' + nft.level
                              }
                            ]}
                          />

                          <img src={`/assets/images/chains/${nft.tokenOwner?.[0].chainId}.png`} alt={nft.tokenOwner?.[0].chainId} />

                        </div>

                        <Link href={`/marketplace/${nft.tokenId}`} target='_blank'>
                          <p className='category'>{nft.family}</p>
                          <p className='tokenId'>#{nft.tokenId}</p>
                        </Link>
                      </div>
                    )
                  })
                }
                  </div>
                  )
            }
          </div>
        </div>

        {
          userNFTs.length > 0 && (
            <div className='explore minting collection'>
              <h3>Explore Our Collection</h3>
              <div className='nft characters'>
                {premiumNfts.slice(0, 6).map(nft => { return <NftCardWithBlurEffect key={nft.name} nft={nft} /> })}
              </div>
            </div>
          )
        }
      </section>

    </div>

  )
}

export { MyCollection }
