import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { LikeAndShare } from '@/components/LikeAndShare'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'

const MintNft = ({ nftDetails, premiumNfts }) => {
  const crumbs = [
    {
      link: '/',
      name: 'NFT Home'
    },
    {
      link: '/marketplace/',
      name: 'NFT Marketplace'
    },
    {
      link: '/marketplace/' + nftDetails.tokenId + '/',
      name: nftDetails.family
    },
    {
      link: '#',
      name: 'Minting Levels'
    }
  ]

  const buildProgress = ({ title, percent, remaining }) => (
    <div className='progress info'>
      <div className='title'>{title}</div>
      <Progress percent={percent} />
      <div>
        <div className='remaining'>
          <div>${remaining} remaining
            <Icon variant='help-cirlce' size='sm' />
          </div>
          <div>{percent}%</div>
        </div>
      </div>
    </div>
  )

  return (

    <div className='mint nft page'>
      <div className='breadcrumb and connect wallet'>
        <Breadcrumb items={crumbs} />
        <ConnectWallet />
      </div>

      <section className='hero'>
        <div className='minting level connected'>
          {nftDetails.level && (
            <Tags
              tags={[
                {
                  id: '1',
                  slug: '1',
                  text: `Level ${nftDetails.level}`,
                  color: 'level' + nftDetails.level
                }
              ]}
            />
          )}
          <NftNickname nft={nftDetails} />

          <div className='character name'>Mint {nftDetails.name} for Free</div>

          <NftSiblingsAndStage nft={nftDetails} />

          <div className='image and milestones'>
            <div>
              <NftImageWithExpand nft={nftDetails} />

              <Button
                type='button' size='xl' disabled onClick={() => {
                }}
              >Mint this NFT
              </Button>
              <div className='supporting text'>
                {nftDetails.wantToMint} people want to mint this.
              </div>
            </div>

            <div className='milestones'>
              <h3>Your Milestones</h3>
              {buildProgress({
                title: 'Policy Purchase',
                percent: '80',
                remaining: '1549'
              })}
              {buildProgress({
                title: 'Added Liquidity',
                percent: '92',
                remaining: '200'
              })}
              <LikeAndShare nft={nftDetails} />
            </div>
          </div>
        </div>
      </section>
      <div className='explore minting collection'>
        <h3>Explore Our Collection</h3>
        <div className='nft characters'>
          {premiumNfts.slice(0, 6).map(nft => <NftCardWithBlurEffect key={nft.name} nft={nft} />)}
        </div>
      </div>
    </div>

  )
}

export { MintNft }
