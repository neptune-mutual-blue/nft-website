
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { LikeAndShare } from '@/components/LikeAndShare'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { Icon } from '@/elements/Icon'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { Summary } from '@/views/mint-nft/Summary'

const MintNft = ({ nftDetails, mintingLevels }) => {
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

      <div className='content inset'>
        <section className='hero'>
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

        </section>

        <MintingLevels mintingLevels={mintingLevels} />
        <Summary />
      </div>

    </div>

  )
}

export { MintNft }
