import { useState } from 'react'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import CountUp from '@/components/CountUp/CountUp'
import { LikeAndShare } from '@/components/LikeAndShare'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { mintingLevelRequirements } from '@/config/minting-levels'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import { weiToToken } from '@/utils/currencyHelpers'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { Summary } from '@/views/mint-nft/Summary'

const userProgress = {
  totalPolicyPurchased: 80000000,
  totalLiquidityAdded: 2500000000
}

const MintNft = ({ nftDetails, premiumNfts, mintingLevels }) => {
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
      name: nftDetails.name
    },
    {
      link: '#',
      name: 'Minting Levels'
    }
  ]

  const [currentProgress] = useState({
    totalLiquidityAdded: weiToToken(userProgress.totalLiquidityAdded, AppConstants.FALLBACK_LIQUIDITY_TOKEN_DECIMALS),
    totalPolicyPurchased: weiToToken(userProgress.totalPolicyPurchased, AppConstants.FALLBACK_LIQUIDITY_TOKEN_DECIMALS)
  })

  const requirements = mintingLevelRequirements[nftDetails.level]

  const liquidityRemaining = nftDetails.level ? (requirements.liquidity - currentProgress.totalLiquidityAdded).toFixed(2) : 0
  const policyPurchaseRemaining = nftDetails.level ? (requirements.policyPurchase - currentProgress.totalPolicyPurchased).toFixed(2) : 0

  const liquidityPercent = nftDetails.level ? currentProgress.totalLiquidityAdded > requirements.liquidity ? '100' : ((currentProgress.totalLiquidityAdded / requirements.liquidity) * 100).toFixed(2) : 0
  const policyPurchasePercent = nftDetails.level ? currentProgress.totalPolicyPurchased > requirements.policyPurchase ? '100' : ((currentProgress.totalPolicyPurchased / requirements.policyPurchase) * 100).toFixed(2) : 0

  const buildProgress = ({ title, percent, remaining }) => (
    <div className='progress info'>
      <div className='title'>{title}</div>
      <Progress percent={percent} />
      <div>
        <div className='remaining'>
          <div className='info'><CountUp number={remaining} symbol='$' localized prefix /> remaining
            <CustomTooltip text={
              <div className='progress tooltip'>
                <div className='label'>Required:</div>
                <div className='value'>$5000</div>
                <br />
                <div className='label'>Your Policy Purchase:</div>
                <div className='value'>$3451</div>
                <br />
                <div className='label'>Required:</div>
                <div className='value'>$1549</div>
              </div>
            }
            >
              <div role='button' tabIndex={0}>
                <Icon variant='help-cirlce' size='sm' />
              </div>
            </CustomTooltip>

          </div>
          <div className='percent'><CountUp number={percent} />%</div>
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
            <div className='image expand wrapper'>
              <NftImageWithExpand nft={nftDetails} />

              {/* <MintSuccessModal nft={nftDetails}>
                <Button
                  type='button' size='xl' onClick={() => {
                  }}
                >Mint this NFT
                </Button>
              </MintSuccessModal> */}

              {/* Remove the style below when enabling the above button */}
              <div className='supporting text' style={{ marginTop: '16px' }}>
                <CountUp number={nftDetails.wantToMint} /> people want to mint this.
              </div>
            </div>

            <div className='milestones'>
              <h3>Your Milestones</h3>
              {buildProgress({
                title: 'Policy Purchase',
                percent: policyPurchasePercent,
                remaining: policyPurchaseRemaining
              })}
              {buildProgress({
                title: 'Added Liquidity',
                percent: liquidityPercent,
                remaining: liquidityRemaining
              })}
              <LikeAndShare nft={nftDetails} />
            </div>
          </div>
        </section>

        <MintingLevels mintingLevels={mintingLevels} />
        <Summary />
      </div>
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
