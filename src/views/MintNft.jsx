import {
  useContext,
  useState
} from 'react'

import AlertInfo from '@/components/Alert/AlertInfo'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { EvmErrorModal } from '@/components/EvmError/EvmErrorModal'
import { LikeAndShare } from '@/components/LikeAndShare'
import NftCardWithBlurEffect
  from '@/components/NftCardWithBlurEffect/NftCardWithBlurEffect'
import NftImageWithExpand from '@/components/NftImageWithExpand'
import { NftNickname } from '@/components/NftNickname'
import { NftSiblingsAndStage } from '@/components/NftSiblingsAndStage'
import { Progress } from '@/components/Progress/Progress'
import { Tags } from '@/components/Tags/Tags'
import { ToastContext } from '@/components/Toast/Toast'
import { mintingLevelRequirements } from '@/config/minting-levels'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import {
  ContractAbis,
  ContractAddresses,
  useContractCall
} from '@/hooks/useContractCall'
import { formatDollar } from '@/utils/currencyHelpers.js'
import { MintingLevels } from '@/views/mint-nft/MintingLevels'
import { MintSuccessModal } from '@/views/mint-nft/MintSuccessModal'
import { Summary } from '@/views/mint-nft/Summary'
import { formatBytes32String } from '@ethersproject/strings'
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

  const points = currentProgress.totalLiquidityAdded * AppConstants.LIQUIDITY_POINTS_PER_DOLLAR + currentProgress.totalPolicyPurchased * AppConstants.POLICY_POINTS_PER_DOLLAR
  const requirements = mintingLevelRequirements[!nftDetails.level ? 0 : nftDetails.level]

  const pointsRemaining = requirements.points - points

  const [showMintSuccessful, setShowMintSuccessful] = useState(false)
  const [error, setError] = useState('')

  const { callMethod: callPolicyProof, isReady: policyProofReady } = useContractCall({ abi: ContractAbis.POLICY_PROOF_MINTER, address: ContractAddresses.POLICY_PROOF_MINTER })
  const { callMethod: callMerkleProof, isReady: merkleProofReady } = useContractCall({ abi: ContractAbis.MERKLE_PROOF_MINTER, address: ContractAddresses.MERKLE_PROOF_MINTER })

  const [minting, setMinting] = useState(false)
  const { showToast, setOpen: setToastOpen } = useContext(ToastContext)

  const mint = async (unsafe = false) => {
    setError('')
    setMinting(true)
    showToast({
      title: 'Minting...',
      description: 'Minting Your NFT...'
    })

    if (policyProofReady && nftDetails.stage === 'Soulbound') {
      // Proof of Policy

      const response = await callPolicyProof('mint', [activePolicies[0].cxToken, nftDetails.tokenId], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Error',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        setShowMintSuccessful(true)
      }
    } else if (merkleProofReady && nftDetails.level) {
      // Merkle Proof
      const response = await callMerkleProof('mint', ['0x0000000000000000000000000000000000000000000000000000000000000000', nftDetails.level, formatBytes32String(nftDetails.name), 1, nftDetails.tokenId], unsafe)

      if (response && response.errorType === 'gasEstimation') {
        setError(response?.error ?? 'Unknown Error')
      } else if (!response || response.error) {
        showToast({
          title: 'Error',
          description: response?.error ?? 'Unknown Error'
        })
      } else if (response) {
        setShowMintSuccessful(true)
      }
    }

    setToastOpen(false)
    setMinting(false)
  }

  return (
    <>
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

                <h3>Current Points: <span>{points} pts</span></h3>

                <Progress percent={(points / requirements.points) * 100} />

                {pointsRemaining > 0 && (
                  <div className='next level requirements'>
                    <div>
                      {pointsRemaining} pts until next level
                    </div>

                    <button role='button'>
                      <Icon variant='help-cirlce' size='sm' />
                    </button>
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
                <MintSuccessModal open={showMintSuccessful} setOpen={setShowMintSuccessful} nft={nftDetails}>
                  <Button
                    type='button' disabled={minting || (activePolicies.length <= 0) || points <= requirements.points || !account} size='xl' onClick={() => mint()}
                  >Mint this NFT
                  </Button>
                </MintSuccessModal>

                {/* Remove the style below when enabling the above button */}
                <div className='supporting text' style={{ marginTop: '16px' }}>
                  {nftDetails.wantToMint} people want to mint this.
                </div>
                <LikeAndShare nft={nftDetails} />

              </div>
            </div>
          </section>

          <MintingLevels mintingLevels={mintingLevels} />
          <Summary />
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
