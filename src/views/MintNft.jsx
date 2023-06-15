import Link from 'next/link'

import AlertInfo from '@/components/Alert/AlertInfo'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { EvmErrorModal } from '@/components/EvmError/EvmErrorModal'
import { LikeAndShare } from '@/components/LikeAndShare'
import { LoaderPopup } from '@/components/LoaderPopup/LoaderPopup'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import NftOwner from '@/components/NftOwner'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Progress } from '@/components/Progress/Progress'
import Skeleton from '@/components/Skeleton'
import { Tags } from '@/components/Tags/Tags'
import { CustomTooltip } from '@/components/Tooltip/Tooltip'
import { mintingLevelRequirements } from '@/config/minting-levels'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import useMint from '@/hooks/actions/useMint'
import { formatDollar } from '@/utils/currencyHelpers.js'
import { formatNumber } from '@/utils/number-format'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { MintSuccessModal } from '@/views/mint-nft/MintSuccessModal'
import { Summary } from '@/views/mint-nft/Summary'
import { useWeb3React } from '@web3-react/core'

const MintNft = ({ nftDetails, premiumNfts, mintingLevels, currentProgress, activePolicies }) => {
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

  const { account } = useWeb3React()

  const actualPoints = currentProgress.totalLiquidityAdded * AppConstants.LIQUIDITY_POINTS_PER_DOLLAR + currentProgress.totalPolicyPurchased * AppConstants.POLICY_POINTS_PER_DOLLAR

  const points = !nftDetails.level ? activePolicies.length > 0 ? actualPoints < 1 ? 1 : actualPoints : 0 : actualPoints

  const requirements = mintingLevelRequirements[!nftDetails.level ? 0 : nftDetails.level]

  const pointsRemaining = requirements.points - points

  const {
    mint,
    disabledReason,
    setShowMintSuccessful,
    showMintSuccessful,
    owner,
    ownerLoading,
    error,
    setError,
    minting
  } = useMint({
    nftDetails,
    activePolicies,
    points,
    requiredPoints: requirements.points
  })

  return (
    <>
      <LoaderPopup
        title={`Minting ${nftDetails.name} NFT`}
        visible={minting}
      />
      <div className='mint nft page'>
        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        <div className='content inset' data-connect={account ? 'true' : 'false'}>
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

              </div>

              <div className='milestones'>

                {!owner && (
                  <>
                    <h3>Current Points: <span>{formatNumber(points)} pts</span></h3>

                    <Progress percent={(points / requirements.points) * 100} />

                    {pointsRemaining > 0 && (
                      <div className='next level requirements'>
                        <div>
                          {formatNumber(pointsRemaining)} more points needed to mint this NFT
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

                    <div className='label and value'>
                      <div className='label'>Policy Purchase:</div>
                      <div className='value'>{formatDollar(currentProgress.totalPolicyPurchased)}</div>
                    </div>
                    <div className='label and value'>
                      <div className='label'>Added Liquidity:</div>
                      <div className='value'>{formatDollar(currentProgress.totalLiquidityAdded)}</div>
                    </div>
                  </>
                )}

                <MintSuccessModal open={showMintSuccessful} setOpen={setShowMintSuccessful} nft={nftDetails}>
                  {ownerLoading && <Skeleton style={{ height: '64px', marginTop: '16px', marginBottom: '64px' }} />}
                  {!ownerLoading && !owner && (
                    <CustomTooltip text={disabledReason} disabled={disabledReason.length === 0}>
                      <div className='tooltip assist'>
                        <Button
                          type='button' disabled={disabledReason.length > 0} size='xl' onClick={() => mint()}
                        >Mint this NFT
                        </Button>
                      </div>
                    </CustomTooltip>
                  )}
                </MintSuccessModal>
                {!ownerLoading && !owner && (
                  <div className='supporting text' style={{ marginTop: '16px' }}>
                    {nftDetails.wantToMint} people want to mint this.
                  </div>
                )}

                {owner && (
                  <NftOwner owner={owner} tokenId={nftDetails.tokenId} />
                )}

                <LikeAndShare nft={nftDetails} />

              </div>
            </div>
          </section>

          <MintingLevels mintingLevels={mintingLevels} />
          <Summary />
          <div className='merkle proof link'>
            <Link href='/marketplace/minting-levels/merkle-proof'>
              Merkle Proof
            </Link>
          </div>
          <div className='explore minting collection'>
            <h3>Explore Our Collection</h3>
            <div className='nft characters'>
              {premiumNfts.slice(0, 6).map(nft => <NftCardWithBlurEffect key={nft.name} nft={nft} />)}
            </div>
          </div>
        </div>
      </div>

      <EvmErrorModal
        open={error !== ''} setOpen={() => {
          setError('')
        }}
        onOK={() => {
          mint(true)
        }}
        error={error}
      />

      {!account &&
        <div className='info box'>
          <AlertInfo />
        </div>}
    </>
  )
}

export { MintNft }
