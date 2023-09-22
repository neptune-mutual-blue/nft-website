
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import NftCardWithBlurEffect from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { Icon } from '@/elements/Icon'
import useUserInfo from '@/hooks/data/useUserInfo'
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

  // TEMP
  const points = 11
  const pointsRemaining = 67
  const requirements = { points: 120 }
  const currentProgress = { totalPolicyPurchased: 1000, totalLiquidityAdded: 1200 }

  const mock = {
    level: 4,
    tokenId: '141157',
    name: 'Diabolic Gargantuworm #141157',
    category: 'Diabolic Gargantuworm',
    thumbnail: 'https://nft.neptunemutual.net/thumbnails/141157.webp',
    cover: 'https://nft.neptunemutual.net/covers/141157.webp'
  }

  const empty = true

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

            <Progress percent={(points / requirements.points) * 100} />

            {pointsRemaining > 0 && (
              <div className='next level requirements'>
                <div>
                  {formatNumber(pointsRemaining)} points until next level.
                </div>

                <CustomTooltip text={`Points Required: ${formatNumber(requirements.points)}`}>
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
                <div className='value'>{formatDollar(currentProgress.totalPolicyPurchased)}</div>
              </div>
              <div className='label and value'>
                <div className='label'>Added Liquidity:</div>
                <div className='value'>{formatDollar(currentProgress.totalLiquidityAdded)}</div>
              </div>
            </div>
          </div>

          <div className='bridge banner'>
            <p>
              Move your NFTs across different blockchain networks.
            </p>
            <Button>
              Bridge My NFTs
            </Button>
          </div>

          <div className='minted nfts'>
            <h3>NFTs You've Minted</h3>

            {
              empty
                ? (
                  <div className='empty'>
                    <img src='/assets/images/hero/hero-light.webp' alt='B/W Hero Image' />

                    <p>You do not own any NFTs yet</p>

                    <a href='#'>
                      <Button>
                        Explore Our Collection
                      </Button>
                    </a>
                  </div>
                  )
                : (
                  <div className='nfts grid'>
                    {
                  Array(5).fill(0).map((_, i) => {
                    return (
                      <div key={i} className='nft'>
                        <NftImageWithExpand nft={mock} isCover={false} />

                        <Tags
                          tags={[
                            {
                              id: '1',
                              slug: '1',
                              text: 'Level ' + mock.level,
                              color: 'level' + mock.level
                            }
                          ]}
                        />

                        <p className='category'>{mock.category}</p>

                        <p className='tokenId'>#{mock.tokenId}</p>
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
          !empty && (
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
